(() => {
  // Year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile menu toggle
  const burger = document.querySelector(".burger");
  const mobile = document.getElementById("mobileMenu");
  if (burger && mobile) {
    burger.addEventListener("click", () => {
      const open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      mobile.hidden = open;
    });

    mobile.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        burger.setAttribute("aria-expanded", "false");
        mobile.hidden = true;
      });
    });
  }

  // Split selector: hover desktop, tap expand mobile
  const split = document.querySelector(".split");
  if (!split) return;

  const panes = split.querySelectorAll(".pane");
  const KEY = "v4l_mode";

  const isTouch = () => window.matchMedia("(hover: none)").matches;

  const setActive = (pane) => {
    split.classList.add("is-active");
    panes.forEach(p => p.classList.remove("is-active"));
    pane.classList.add("is-active");
    localStorage.setItem(KEY, pane.dataset.pane);
  };

  panes.forEach(pane => {
    const primaryLink = pane.querySelector(".btn--primary") || pane.querySelector("a");

    pane.addEventListener("click", (e) => {
      // If user clicked a link/button inside, allow normal behavior
      const clickedLink = e.target.closest("a");
      if (clickedLink) return;

      // Desktop: do nothing (hover handles; user uses buttons)
      if (!isTouch()) return;

      // Touch: first tap expands, second tap enters
      if (!pane.classList.contains("is-active")) {
        e.preventDefault();
        setActive(pane);
        return;
      }

      if (primaryLink && primaryLink.href) {
        window.location.href = primaryLink.href;
      }
    });

    pane.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (isTouch()) {
          if (!pane.classList.contains("is-active")) setActive(pane);
          else if (primaryLink && primaryLink.href) window.location.href = primaryLink.href;
        } else {
          if (primaryLink && primaryLink.href) window.location.href = primaryLink.href;
        }
      }
    });
  });

  // Reset choice
  const reset = document.getElementById("resetChoice");
  if (reset) {
    reset.addEventListener("click", () => {
      localStorage.removeItem(KEY);
      split.classList.remove("is-active");
      panes.forEach(p => p.classList.remove("is-active"));
      alert("Listo. Ya puedes elegir de nuevo.");
    });
  }

  // Auto expand last selection on mobile
  const saved = localStorage.getItem(KEY);
  if (saved && isTouch()) {
    const pane = split.querySelector(`.pane[data-pane="${saved}"]`);
    if (pane) setActive(pane);
  }
})();
