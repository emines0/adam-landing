// ── Mobile nav ────────────────────────────────────────────────────────────────

const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

function setNav(open) {
  navMenu.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
}

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.contains("is-open");
  setNav(!isOpen);
});

navMenu?.addEventListener("click", e => {
  const target = e.target;
  if (target && target.tagName === "A") setNav(false);
});

document.addEventListener("click", e => {
  if (!navMenu || !navToggle) return;
  const within = navMenu.contains(e.target) || navToggle.contains(e.target);
  if (!within) setNav(false);
});
