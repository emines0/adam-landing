// --- Mobile nav ---
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

// --- Year ---
document.getElementById("year").textContent = String(new Date().getFullYear());

// --- Gallery modal ---
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalClose = document.getElementById("modalClose");
const gallery = document.getElementById("gallery");

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

gallery?.addEventListener("click", e => {
  const btn = e.target.closest("button[data-full]");
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

// --- Testimonial rotator ---
const quotes = [
  {
    text: "“Finally a plan I can stick to without my whole day revolving around it.”",
    meta: "— Client, 12-week block",
  },
  {
    text: "“My strength went up and my back stopped feeling wrecked every morning.”",
    meta: "— Client, hybrid home/gym",
  },
  {
    text: "“No more ‘all-or-nothing’. Weekends are included and I still progress.”",
    meta: "— Client, busy parent",
  },
];

let qIndex = 0;
const quoteText = document.getElementById("quoteText");
const quoteMeta = document.getElementById("quoteMeta");
const quotePrev = document.getElementById("quotePrev");
const quoteNext = document.getElementById("quoteNext");

function renderQuote() {
  const q = quotes[qIndex];
  quoteText.textContent = q.text;
  quoteMeta.textContent = q.meta;
}

quotePrev?.addEventListener("click", () => {
  qIndex = (qIndex - 1 + quotes.length) % quotes.length;
  renderQuote();
});
quoteNext?.addEventListener("click", () => {
  qIndex = (qIndex + 1) % quotes.length;
  renderQuote();
});

// --- Contact form validation (client-side demo) ---
const leadForm = document.getElementById("leadForm");
const formNote = document.getElementById("formNote");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

leadForm?.addEventListener("submit", e => {
  e.preventDefault();
  formNote.textContent = "";

  const data = new FormData(leadForm);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const goal = String(data.get("goal") || "").trim();
  const message = String(data.get("message") || "").trim();

  const errors = [];
  if (name.length < 2) errors.push("Please enter your name.");
  if (!isValidEmail(email)) errors.push("Please enter a valid email.");
  if (!goal) errors.push("Please choose a goal.");
  if (message.length < 10) errors.push("Please add a short message (10+ characters).");

  if (errors.length) {
    formNote.textContent = errors[0];
    return;
  }

  // Demo: replace with real backend (Netlify Forms, Formspree, custom API, etc.)
  formNote.textContent =
    "Thanks! Your message is ready to send (connect this form to your backend).";
  leadForm.reset();
});

// Scroll top

document.querySelectorAll(".scroll-top-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    // Clean the URL back to just the origin (removes any path/hash)
    window.history.replaceState(null, "", window.location.origin);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Quiz Panel

const answers = {};
const TOTAL = 6;
const progBar = document.getElementById("quizProgress");
const allSteps = document.querySelectorAll(".quiz-step");

function getStep3() {
  if (answers.goal === "athlete") return "3b";
  if (answers.goal === "injury") return "3c";
  return "3";
}

function showStep(id) {
  allSteps.forEach(s => s.classList.remove("is-active"));
  const t = document.querySelector(`.quiz-step[data-step="${id}"]`);
  if (!t) return;
  t.classList.add("is-active");
  const n = parseInt(id);
  if (!isNaN(n)) progBar.style.width = (n / (TOTAL + 1)) * 100 + "%";
  else if (id === "contact" || id === "thanks") progBar.style.width = "100%";
}

document.getElementById("quizSteps").addEventListener("click", function (e) {
  const opt = e.target.closest(".quiz-opt");
  const nextBtn = e.target.closest("[data-next]");
  const backBtn = e.target.closest("[data-back]");

  if (opt) {
    const g = opt.dataset.group;
    document
      .querySelectorAll(`.quiz-opt[data-group="${g}"]`)
      .forEach(b => b.classList.remove("is-selected"));
    opt.classList.add("is-selected");
    answers[g] = opt.dataset.val;
    const step = opt.closest(".quiz-step");
    const nb = step?.querySelector("[data-next]");
    if (nb) nb.disabled = false;
  }

  if (nextBtn && !nextBtn.disabled) {
    let target = nextBtn.dataset.next;

    // Route to the correct Step 3 variant based on goal
    if (target === "3") target = getStep3();

    if (target === "contact") populateHidden();
    showStep(target);
  }

  if (backBtn) {
    let target = backBtn.dataset.back;

    // When going back to Step 3, restore the correct variant
    if (target === "3") target = getStep3();

    showStep(target);
  }
});

function populateHidden() {
  document.getElementById("fGoal").value = answers.goal || "";
  document.getElementById("fFreq").value = answers.freq || "";
  document.getElementById("fChallenge").value = answers.challenge || "";
  document.getElementById("fReady").value = answers.ready || "";
  document.getElementById("fMissing").value = answers.missing || "";
  document.getElementById("fCommit").value = answers.commit || "";
}

const quizForm = document.getElementById("quizForm");
const quizStatus = document.getElementById("quizStatus");
const quizSubmit = document.getElementById("quizSubmit");

quizForm?.addEventListener("submit", async function (e) {
  e.preventDefault();
  populateHidden();

  const name = document.getElementById("qName").value.trim();
  const email = document.getElementById("qEmail").value.trim();
  if (name.length < 2) {
    setStatus("Vennligst skriv inn ditt navn.", true);
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setStatus("Vennligst skriv inn en gyldig e-post.", true);
    return;
  }

  quizSubmit.disabled = true;
  quizSubmit.textContent = "Sender…";
  setStatus("");

  try {
    const res = await fetch(quizForm.action, {
      method: "POST",
      body: new FormData(quizForm),
      headers: { Accept: "application/json" },
    });
    if (res.ok || res.status === 302) {
      showStep("thanks");
    } else throw new Error(res.status);
  } catch {
    quizSubmit.disabled = false;
    quizSubmit.textContent = "Kontakt meg →";
    setStatus("Noe gikk galt. Prøv igjen eller kontakt oss direkte.", true);
  }
});

function setStatus(msg, err = false) {
  quizStatus.textContent = msg;
  quizStatus.className = "quiz-status" + (err ? " is-error" : "");
}
