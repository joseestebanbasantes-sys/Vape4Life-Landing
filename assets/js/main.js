(() => {
  // Year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile menu
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

  // Split selector: hover on desktop, tap-to-expand on touch
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

  // Tap behavior
  panes.forEach(pane => {
    const primary = pane.querySelector(".btn--primary");

    // Click on pane (not on buttons) in touch: first tap expands, second tap enters
    pane.addEventListener("click", (e) => {
      if (!isTouch()) return;

      // If user clicked a link/button inside, allow normal behavior
      const clickedLink = e.target.closest("a");
      if (clickedLink) return;

      // First tap: expand
      if (!pane.classList.contains("is-active")) {
        e.preventDefault();
        setActive(pane);
        return;
      }

      // Second tap: go to primary link
      if (primary && primary.href) {
        localStorage.setItem(KEY, pane.dataset.pane);
        window.location.href = primary.href;
      }
    });

    // Keyboard accessibility
    pane.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (isTouch()) {
          if (!pane.classList.contains("is-active")) setActive(pane);
          else if (primary && primary.href) window.location.href = primary.href;
        } else {
          if (primary && primary.href) window.location.href = primary.href;
        }
      }
    });
  });

  // Reset choice button
  const reset = document.getElementById("resetChoice");
  if (reset) {
    reset.addEventListener("click", () => {
      localStorage.removeItem(KEY);
      split.classList.remove("is-active");
      panes.forEach(p => p.classList.remove("is-active"));
      alert("Listo. Ya puedes elegir de nuevo.");
    });
  }

  // Optional: auto-select last mode in mobile (expand)
  const saved = localStorage.getItem(KEY);
  if (saved && isTouch()) {
    const pane = split.querySelector(`.pane[data-pane="${saved}"]`);
    if (pane) setActive(pane);
  }
})();
