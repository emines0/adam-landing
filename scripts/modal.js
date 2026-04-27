// ── Gallery modal ─────────────────────────────────────────────────────────────

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalClose = document.getElementById("modalClose");

function openModal(src) {
  modalImg.src = src;
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  modalImg.src = "";
  document.body.style.overflow = "";
}

// Document-level delegation so any number of `.gallery` blocks on the page work.
document.addEventListener("click", e => {
  const btn = e.target.closest(".gallery button[data-full]");
  if (!btn) return;
  openModal(btn.getAttribute("data-full"));
});

modal?.addEventListener("click", e => {
  const close = e.target?.dataset?.close === "true";
  if (close) closeModal();
});

modalClose?.addEventListener("click", closeModal);

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal?.getAttribute("aria-hidden") === "false") closeModal();
});
