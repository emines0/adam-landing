// ── Utils ─────────────────────────────────────────────────────────────────────

// Year
document.getElementById("year").textContent = String(new Date().getFullYear());

// Scroll to top
document.querySelectorAll(".scroll-top-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    window.history.replaceState(null, "", window.location.origin);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
