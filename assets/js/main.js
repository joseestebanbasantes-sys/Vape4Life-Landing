const ROUTES = {
  mayorista: "pages/mayorista.html",   // o directo a tu Shopify mayorista
  minorista: "pages/minorista.html"    // o directo a tu Shopify retail
};

const KEY = "v4l_mode";

// Si ya eligió antes, redirige automático (sin molestarlo)
const saved = localStorage.getItem(KEY);
if (saved && ROUTES[saved]) {
  window.location.replace(ROUTES[saved]);
}

document.querySelectorAll("[data-target]").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");
    localStorage.setItem(KEY, target);
    window.location.href = ROUTES[target];
  });
});

document.getElementById("reset").addEventListener("click", () => {
  localStorage.removeItem(KEY);
  alert("Listo. Ya puedes elegir de nuevo.");
});

