const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-menu-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (window.lucide) {
  window.lucide.createIcons({
    attrs: {
      "stroke-width": 1.6,
    },
  });
}

function setMenu(open) {
  if (!toggle || !mobileNav) return;
  toggle.setAttribute("aria-expanded", String(open));
  mobileNav.hidden = !open;
}

toggle?.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  setMenu(open);
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

let lastY = 0;
window.addEventListener(
  "scroll",
  () => {
    const y = window.scrollY;
    if (!header) return;
    header.style.borderBottomColor =
      y > 8 ? "rgba(233, 214, 176, 0.22)" : "rgba(233, 214, 176, 0.14)";
    lastY = y;
  },
  { passive: true }
);
