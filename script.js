// ============================================================
// AUTO-GENERATED FILE — DO NOT EDIT DIRECTLY
// Changes made here will be overwritten on the next build.
// Edit the modules in /scripts and run: node build.js/node build.js --watch
// ============================================================
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


// ── Gallery modal ─────────────────────────────────────────────────────────────

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


// ── Coach section ─────────────────────────────────────────────────────────────

// Generic paragraph toggles (About, Experiences)
document.querySelectorAll(".btn-expand[data-target]").forEach(function (btn) {
  var targetId = btn.getAttribute("data-target");
  var target = document.getElementById(targetId);
  if (!target) return;
  btn.addEventListener("click", function () {
    var opening = !target.classList.contains("is-open");
    target.classList.toggle("is-open", opening);
    btn.classList.toggle("is-open", opening);
    btn.querySelector(".btn-expand__text").textContent = opening ? "Less" : "More";
  });
});

// Certificates toggle with layout switch
(function () {
  var certToggle = document.getElementById("certToggle");
  if (!certToggle) return;

  var certExtras = document.querySelectorAll(".cert-extra");
  var coachLayout = document.getElementById("coachLayout");
  var coachSection = document.getElementById("coach");
  var certBullet = document.getElementById("certBullet");
  var certOpen = false;

  var isDesktop = function () {
    return window.innerWidth >= 981;
  };

  function smoothScrollTo(el, offset) {
    var top = el.getBoundingClientRect().top + window.pageYOffset + (offset || 0);
    window.scrollTo({ top: top, behavior: "smooth" });
  }

  function openCerts() {
    certOpen = true;
    certToggle.classList.add("is-open");
    certToggle.querySelector(".btn-expand__text").textContent = "Less";

    certExtras.forEach(function (li, i) {
      li.classList.add("is-visible");
      requestAnimationFrame(function () {
        setTimeout(function () {
          li.classList.add("is-animated");
        }, 20 + i * 20);
      });
    });

    if (isDesktop()) {
      coachLayout.classList.add("is-stacked");
      setTimeout(function () {
        smoothScrollTo(certBullet, -24);
      }, 460);
    } else {
      setTimeout(function () {
        smoothScrollTo(certBullet, -16);
      }, 200);
    }
  }

  function closeCerts() {
    certOpen = false;
    certToggle.classList.remove("is-open");
    certToggle.querySelector(".btn-expand__text").textContent = "More";

    certExtras.forEach(function (li) {
      li.classList.remove("is-animated");
      setTimeout(function () {
        li.classList.remove("is-visible");
      }, 280);
    });

    if (isDesktop()) {
      coachLayout.classList.remove("is-stacked");
      setTimeout(function () {
        smoothScrollTo(coachSection, -20);
      }, 460);
    } else {
      setTimeout(function () {
        smoothScrollTo(coachSection, -16);
      }, 200);
    }
  }

  certToggle.addEventListener("click", function () {
    if (certOpen) {
      closeCerts();
    } else {
      openCerts();
    }
  });
})();


// ── Quiz panel ────────────────────────────────────────────────────────────────

const answers = {};
const TOTAL = 5;
const progBar = document.getElementById("quizProgress");
const allSteps = document.querySelectorAll(".quiz-step");

function getStep3() {
  if (answers.goal === "athlete") return "3b";
  if (answers.goal === "injury") return "3c";
  return "3";
}

function showStep(id, isBack = false) {
  allSteps.forEach(s => {
    s.classList.remove("is-active");
    s.style.animationName = "";
  });
  const t = document.querySelector(`.quiz-step[data-step="${id}"]`);
  if (!t) return;

  t.style.animationName = isBack ? "qFadeBack" : "qFade";
  t.classList.add("is-active");

  const n = parseInt(id);
  if (!isNaN(n)) progBar.style.width = (n / (TOTAL + 1)) * 100 + "%";
  else if (id === "contact" || id === "thanks") progBar.style.width = "100%";

  const heroGrid = document.querySelector(".hero__grid");
  if (heroGrid) {
    heroGrid.classList.toggle("hero__grid--stacked", id === "contact" || id === "thanks");
  }
}

document.getElementById("quizSteps")?.addEventListener("click", function (e) {
  // Answers toggle
  if (e.target.closest("#answersToggle")) {
    const body = document.getElementById("answersBody");
    if (body) {
      body.removeAttribute("hidden");
      const isOpen = body.classList.toggle("is-open");
      e.target.closest("#answersToggle").textContent = isOpen
        ? "Hide my answers"
        : "Show my answers";
    }
    return;
  }

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
    if (target === "3") target = getStep3();
    if (target === "contact") populateHidden();
    showStep(target, "forward");
  }

  if (backBtn) {
    let target = backBtn.dataset.back;
    if (target === "3") target = getStep3();
    showStep(target, "back");
  }
});

// ── Human-readable labels ─────────────────────────────────────────────────────

const ANSWER_LABELS = {
  goal: {
    athlete: "Athlete improvement",
    muscle: "Build muscles",
    energy: "Get more energy and structure",
    fat: "Fat reduction",
    injury: "Recover from injury / Prevent injury",
    glutes: "Build glutes",
  },
  freq: {
    2: "2 times per week",
    3: "3 times per week",
    "4+": "4+ times per week",
    unsure: "Not sure yet",
  },
  challenge: {
    diet: "Hard to stick to a diet",
    structure: "Lack of structure in training",
    motivation: "Struggle with motivation",
    time: "Not enough time",
    tried: "Tried a lot without results",
    coaching: "Need coaching",
    speed: "Speed & explosiveness",
    strength: "Strength & power",
    endurance: "Recovery",
    injury: "Staying injury-free",
    "body-comp": "Body composition",
    consistency: "Training consistency",
    rehab: "Recovering from a recent injury",
    chronic: "Managing a chronic / recurring issue",
    prevention: "No injury now, want to stay that way",
    "post-surgery": "Post-surgery rehabilitation",
    pain: "Pain during training",
    return: "Returning to sport after time off",
  },
  ready: {
    now: "Ready to start now",
    soon: "Want to start within the next few weeks",
  },
  missing: {
    "diet-structure": "Nutrition structure",
    "training-structure": "Training structure",
    accountability: "Accountability and check-ins",
    all: "All of the above",
  },
  commit: {
    yes: "Yes, ready to do what it takes",
    support: "Yes, but needs support and guidance",
    unsure: "A little unsure",
  },
};

const QUESTION_LABELS = {
  goal: "How can I help you reach your goal?",
  freq: "How many times per week do you want to train?",
  challenge: "What is your biggest challenge?",
  ready: "How ready are you to start making real progress?",
  missing: "What do you feel you're missing most right now?",
  commit: "Are you willing to follow a plan if it suits you?",
};

function buildSummary() {
  return Object.entries(QUESTION_LABELS)
    .filter(([key]) => answers[key])
    .map(([key, question]) => {
      const raw = answers[key];
      const label = (ANSWER_LABELS[key] && ANSWER_LABELS[key][raw]) || raw;
      return `${question}\n✅ ${label}`;
    })
    .join("\n");
}

function populateHidden() {
  document.getElementById("fGoal").value = answers.goal || "";
  document.getElementById("fFreq").value = answers.freq || "";
  document.getElementById("fChallenge").value = answers.challenge || "";
  document.getElementById("fReady").value = answers.ready || "";
  document.getElementById("fMissing").value = answers.missing || "";
  document.getElementById("fCommit").value = answers.commit || "";

  const summary = buildSummary();
  const summaryEl = document.getElementById("qSummary");
  if (summaryEl) summaryEl.value = summary;

  const displayEl = document.getElementById("qSummaryDisplay");
  if (displayEl) {
    const entries = Object.entries(QUESTION_LABELS)
      .filter(([key]) => answers[key])
      .map(([key, question]) => {
        const raw = answers[key];
        const label = (ANSWER_LABELS[key] && ANSWER_LABELS[key][raw]) || raw;
        return `<div class="quiz-summary-pair"><p class="quiz-summary-question"><strong>${question}</strong></p><p class="quiz-summary-answer"><span class="quiz-summary-check" aria-hidden="true"></span>${label}</p></div>`;
      });
    displayEl.innerHTML = entries.join("");
  }

  updateFullMessage();
}

function updateFullMessage() {
  const summary = document.getElementById("qSummary")?.value || "";
  const message = document.getElementById("qMessage")?.value.trim() || "";
  const combined = message ? summary + "\n\n---\n\nAdditional message:\n" + message : summary;
  const el = document.getElementById("fFullMessage");
  if (el) el.value = combined;
}

// Live update when user types in free-text area
document.getElementById("qMessage")?.addEventListener("input", updateFullMessage);


// ── Contact form ──────────────────────────────────────────────────────────────

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
  formNote.textContent = "Thanks! Your message is ready to send (connect this form to your backend).";
  leadForm.reset();
});

// ── Country dial-code picker ──────────────────────────────────────────────────

const COUNTRIES = [
  { f: "🇦🇫", n: "Afghanistan", c: "+93" },
  { f: "🇦🇱", n: "Albania", c: "+355" },
  { f: "🇩🇿", n: "Algeria", c: "+213" },
  { f: "🇦🇩", n: "Andorra", c: "+376" },
  { f: "🇦🇴", n: "Angola", c: "+244" },
  { f: "🇦🇬", n: "Antigua & Barbuda", c: "+1-268" },
  { f: "🇦🇷", n: "Argentina", c: "+54" },
  { f: "🇦🇲", n: "Armenia", c: "+374" },
  { f: "🇦🇺", n: "Australia", c: "+61" },
  { f: "🇦🇹", n: "Austria", c: "+43" },
  { f: "🇦🇿", n: "Azerbaijan", c: "+994" },
  { f: "🇧🇸", n: "Bahamas", c: "+1-242" },
  { f: "🇧🇭", n: "Bahrain", c: "+973" },
  { f: "🇧🇩", n: "Bangladesh", c: "+880" },
  { f: "🇧🇧", n: "Barbados", c: "+1-246" },
  { f: "🇧🇾", n: "Belarus", c: "+375" },
  { f: "🇧🇪", n: "Belgium", c: "+32" },
  { f: "🇧🇿", n: "Belize", c: "+501" },
  { f: "🇧🇯", n: "Benin", c: "+229" },
  { f: "🇧🇹", n: "Bhutan", c: "+975" },
  { f: "🇧🇴", n: "Bolivia", c: "+591" },
  { f: "🇧🇦", n: "Bosnia & Herzegovina", c: "+387" },
  { f: "🇧🇼", n: "Botswana", c: "+267" },
  { f: "🇧🇷", n: "Brazil", c: "+55" },
  { f: "🇧🇳", n: "Brunei", c: "+673" },
  { f: "🇧🇬", n: "Bulgaria", c: "+359" },
  { f: "🇧🇫", n: "Burkina Faso", c: "+226" },
  { f: "🇧🇮", n: "Burundi", c: "+257" },
  { f: "🇰🇭", n: "Cambodia", c: "+855" },
  { f: "🇨🇲", n: "Cameroon", c: "+237" },
  { f: "🇨🇦", n: "Canada", c: "+1" },
  { f: "🇨🇻", n: "Cape Verde", c: "+238" },
  { f: "🇨🇫", n: "Central African Rep.", c: "+236" },
  { f: "🇹🇩", n: "Chad", c: "+235" },
  { f: "🇨🇱", n: "Chile", c: "+56" },
  { f: "🇨🇳", n: "China", c: "+86" },
  { f: "🇨🇴", n: "Colombia", c: "+57" },
  { f: "🇰🇲", n: "Comoros", c: "+269" },
  { f: "🇨🇬", n: "Congo", c: "+242" },
  { f: "🇨🇩", n: "Congo (DRC)", c: "+243" },
  { f: "🇨🇷", n: "Costa Rica", c: "+506" },
  { f: "🇭🇷", n: "Croatia", c: "+385" },
  { f: "🇨🇺", n: "Cuba", c: "+53" },
  { f: "🇨🇾", n: "Cyprus", c: "+357" },
  { f: "🇨🇿", n: "Czech Republic", c: "+420" },
  { f: "🇩🇰", n: "Denmark", c: "+45" },
  { f: "🇩🇯", n: "Djibouti", c: "+253" },
  { f: "🇩🇲", n: "Dominica", c: "+1-767" },
  { f: "🇩🇴", n: "Dominican Republic", c: "+1-809" },
  { f: "🇪🇨", n: "Ecuador", c: "+593" },
  { f: "🇪🇬", n: "Egypt", c: "+20" },
  { f: "🇸🇻", n: "El Salvador", c: "+503" },
  { f: "🇬🇶", n: "Equatorial Guinea", c: "+240" },
  { f: "🇪🇷", n: "Eritrea", c: "+291" },
  { f: "🇪🇪", n: "Estonia", c: "+372" },
  { f: "🇸🇿", n: "Eswatini", c: "+268" },
  { f: "🇪🇹", n: "Ethiopia", c: "+251" },
  { f: "🇫🇯", n: "Fiji", c: "+679" },
  { f: "🇫🇮", n: "Finland", c: "+358" },
  { f: "🇫🇷", n: "France", c: "+33" },
  { f: "🇬🇦", n: "Gabon", c: "+241" },
  { f: "🇬🇲", n: "Gambia", c: "+220" },
  { f: "🇬🇪", n: "Georgia", c: "+995" },
  { f: "🇩🇪", n: "Germany", c: "+49" },
  { f: "🇬🇭", n: "Ghana", c: "+233" },
  { f: "🇬🇷", n: "Greece", c: "+30" },
  { f: "🇬🇩", n: "Grenada", c: "+1-473" },
  { f: "🇬🇹", n: "Guatemala", c: "+502" },
  { f: "🇬🇳", n: "Guinea", c: "+224" },
  { f: "🇬🇼", n: "Guinea-Bissau", c: "+245" },
  { f: "🇬🇾", n: "Guyana", c: "+592" },
  { f: "🇭🇹", n: "Haiti", c: "+509" },
  { f: "🇭🇳", n: "Honduras", c: "+504" },
  { f: "🇭🇺", n: "Hungary", c: "+36" },
  { f: "🇮🇸", n: "Iceland", c: "+354" },
  { f: "🇮🇳", n: "India", c: "+91" },
  { f: "🇮🇩", n: "Indonesia", c: "+62" },
  { f: "🇮🇷", n: "Iran", c: "+98" },
  { f: "🇮🇶", n: "Iraq", c: "+964" },
  { f: "🇮🇪", n: "Ireland", c: "+353" },
  { f: "🇮🇱", n: "Israel", c: "+972" },
  { f: "🇮🇹", n: "Italy", c: "+39" },
  { f: "🇯🇲", n: "Jamaica", c: "+1-876" },
  { f: "🇯🇵", n: "Japan", c: "+81" },
  { f: "🇯🇴", n: "Jordan", c: "+962" },
  { f: "🇰🇿", n: "Kazakhstan", c: "+7" },
  { f: "🇰🇪", n: "Kenya", c: "+254" },
  { f: "🇰🇮", n: "Kiribati", c: "+686" },
  { f: "🇽🇰", n: "Kosovo", c: "+383" },
  { f: "🇰🇼", n: "Kuwait", c: "+965" },
  { f: "🇰🇬", n: "Kyrgyzstan", c: "+996" },
  { f: "🇱🇦", n: "Laos", c: "+856" },
  { f: "🇱🇻", n: "Latvia", c: "+371" },
  { f: "🇱🇧", n: "Lebanon", c: "+961" },
  { f: "🇱🇸", n: "Lesotho", c: "+266" },
  { f: "🇱🇷", n: "Liberia", c: "+231" },
  { f: "🇱🇾", n: "Libya", c: "+218" },
  { f: "🇱🇮", n: "Liechtenstein", c: "+423" },
  { f: "🇱🇹", n: "Lithuania", c: "+370" },
  { f: "🇱🇺", n: "Luxembourg", c: "+352" },
  { f: "🇲🇬", n: "Madagascar", c: "+261" },
  { f: "🇲🇼", n: "Malawi", c: "+265" },
  { f: "🇲🇾", n: "Malaysia", c: "+60" },
  { f: "🇲🇻", n: "Maldives", c: "+960" },
  { f: "🇲🇱", n: "Mali", c: "+223" },
  { f: "🇲🇹", n: "Malta", c: "+356" },
  { f: "🇲🇭", n: "Marshall Islands", c: "+692" },
  { f: "🇲🇷", n: "Mauritania", c: "+222" },
  { f: "🇲🇺", n: "Mauritius", c: "+230" },
  { f: "🇲🇽", n: "Mexico", c: "+52" },
  { f: "🇫🇲", n: "Micronesia", c: "+691" },
  { f: "🇲🇩", n: "Moldova", c: "+373" },
  { f: "🇲🇨", n: "Monaco", c: "+377" },
  { f: "🇲🇳", n: "Mongolia", c: "+976" },
  { f: "🇲🇪", n: "Montenegro", c: "+382" },
  { f: "🇲🇦", n: "Morocco", c: "+212" },
  { f: "🇲🇿", n: "Mozambique", c: "+258" },
  { f: "🇲🇲", n: "Myanmar", c: "+95" },
  { f: "🇳🇦", n: "Namibia", c: "+264" },
  { f: "🇳🇷", n: "Nauru", c: "+674" },
  { f: "🇳🇵", n: "Nepal", c: "+977" },
  { f: "🇳🇱", n: "Netherlands", c: "+31" },
  { f: "🇳🇿", n: "New Zealand", c: "+64" },
  { f: "🇳🇮", n: "Nicaragua", c: "+505" },
  { f: "🇳🇪", n: "Niger", c: "+227" },
  { f: "🇳🇬", n: "Nigeria", c: "+234" },
  { f: "🇲🇰", n: "North Macedonia", c: "+389" },
  { f: "🇳🇴", n: "Norway", c: "+47" },
  { f: "🇴🇲", n: "Oman", c: "+968" },
  { f: "🇵🇰", n: "Pakistan", c: "+92" },
  { f: "🇵🇼", n: "Palau", c: "+680" },
  { f: "🇵🇦", n: "Panama", c: "+507" },
  { f: "🇵🇬", n: "Papua New Guinea", c: "+675" },
  { f: "🇵🇾", n: "Paraguay", c: "+595" },
  { f: "🇵🇪", n: "Peru", c: "+51" },
  { f: "🇵🇭", n: "Philippines", c: "+63" },
  { f: "🇵🇱", n: "Poland", c: "+48" },
  { f: "🇵🇹", n: "Portugal", c: "+351" },
  { f: "🇶🇦", n: "Qatar", c: "+974" },
  { f: "🇷🇴", n: "Romania", c: "+40" },
  { f: "🇷🇺", n: "Russia", c: "+7" },
  { f: "🇷🇼", n: "Rwanda", c: "+250" },
  { f: "🇰🇳", n: "Saint Kitts & Nevis", c: "+1-869" },
  { f: "🇱🇨", n: "Saint Lucia", c: "+1-758" },
  { f: "🇻🇨", n: "Saint Vincent", c: "+1-784" },
  { f: "🇼🇸", n: "Samoa", c: "+685" },
  { f: "🇸🇲", n: "San Marino", c: "+378" },
  { f: "🇸🇹", n: "São Tomé & Príncipe", c: "+239" },
  { f: "🇸🇦", n: "Saudi Arabia", c: "+966" },
  { f: "🇸🇳", n: "Senegal", c: "+221" },
  { f: "🇷🇸", n: "Serbia", c: "+381" },
  { f: "🇸🇨", n: "Seychelles", c: "+248" },
  { f: "🇸🇱", n: "Sierra Leone", c: "+232" },
  { f: "🇸🇬", n: "Singapore", c: "+65" },
  { f: "🇸🇰", n: "Slovakia", c: "+421" },
  { f: "🇸🇮", n: "Slovenia", c: "+386" },
  { f: "🇸🇧", n: "Solomon Islands", c: "+677" },
  { f: "🇸🇴", n: "Somalia", c: "+252" },
  { f: "🇿🇦", n: "South Africa", c: "+27" },
  { f: "🇸🇸", n: "South Sudan", c: "+211" },
  { f: "🇪🇸", n: "Spain", c: "+34" },
  { f: "🇱🇰", n: "Sri Lanka", c: "+94" },
  { f: "🇸🇩", n: "Sudan", c: "+249" },
  { f: "🇸🇷", n: "Suriname", c: "+597" },
  { f: "🇸🇪", n: "Sweden", c: "+46" },
  { f: "🇨🇭", n: "Switzerland", c: "+41" },
  { f: "🇸🇾", n: "Syria", c: "+963" },
  { f: "🇹🇼", n: "Taiwan", c: "+886" },
  { f: "🇹🇯", n: "Tajikistan", c: "+992" },
  { f: "🇹🇿", n: "Tanzania", c: "+255" },
  { f: "🇹🇭", n: "Thailand", c: "+66" },
  { f: "🇹🇱", n: "Timor-Leste", c: "+670" },
  { f: "🇹🇬", n: "Togo", c: "+228" },
  { f: "🇹🇴", n: "Tonga", c: "+676" },
  { f: "🇹🇹", n: "Trinidad & Tobago", c: "+1-868" },
  { f: "🇹🇳", n: "Tunisia", c: "+216" },
  { f: "🇹🇷", n: "Turkey", c: "+90" },
  { f: "🇹🇲", n: "Turkmenistan", c: "+993" },
  { f: "🇹🇻", n: "Tuvalu", c: "+688" },
  { f: "🇺🇬", n: "Uganda", c: "+256" },
  { f: "🇺🇦", n: "Ukraine", c: "+380" },
  { f: "🇦🇪", n: "United Arab Emirates", c: "+971" },
  { f: "🇬🇧", n: "United Kingdom", c: "+44" },
  { f: "🇺🇸", n: "United States", c: "+1" },
  { f: "🇺🇾", n: "Uruguay", c: "+598" },
  { f: "🇺🇿", n: "Uzbekistan", c: "+998" },
  { f: "🇻🇺", n: "Vanuatu", c: "+678" },
  { f: "🇻🇦", n: "Vatican City", c: "+379" },
  { f: "🇻🇪", n: "Venezuela", c: "+58" },
  { f: "🇻🇳", n: "Vietnam", c: "+84" },
  { f: "🇾🇪", n: "Yemen", c: "+967" },
  { f: "🇿🇲", n: "Zambia", c: "+260" },
  { f: "🇿🇼", n: "Zimbabwe", c: "+263" },
];

// ── Phone format validation per country ───────────────────────────────────────

const PHONE_PATTERNS = {
  "+1":   /^[2-9]\d{2}[2-9]\d{6}$/,
  "+7":   /^\d{10}$/,
  "+20":  /^1[0-25]\d{8}$/,
  "+27":  /^[6-8]\d{8}$/,
  "+30":  /^[26]\d{9}$/,
  "+31":  /^[1-9]\d{8}$/,
  "+32":  /^[1-9]\d{7,8}$/,
  "+33":  /^[1-9]\d{8}$/,
  "+34":  /^[6-9]\d{8}$/,
  "+36":  /^[1-9]\d{7,8}$/,
  "+39":  /^[0-9]\d{6,10}$/,
  "+40":  /^[2-8]\d{8}$/,
  "+41":  /^[1-9]\d{8}$/,
  "+43":  /^[1-9]\d{6,12}$/,
  "+44":  /^[1-9]\d{9}$/,
  "+45":  /^[2-9]\d{7}$/,
  "+46":  /^[1-9]\d{6,9}$/,
  "+47":  /^[2-9]\d{7}$/,
  "+48":  /^[1-9]\d{8}$/,
  "+49":  /^[1-9]\d{6,12}$/,
  "+51":  /^[19]\d{8}$/,
  "+52":  /^[1-9]\d{9}$/,
  "+53":  /^[5-8]\d{7}$/,
  "+54":  /^[1-9]\d{9,10}$/,
  "+55":  /^[1-9]{2}[2-9]\d{7,8}$/,
  "+56":  /^[2-9]\d{8}$/,
  "+57":  /^[1-9]\d{9}$/,
  "+58":  /^[2-4]\d{9}$/,
  "+60":  /^[1-9]\d{7,9}$/,
  "+61":  /^[2-57-8]\d{8}$/,
  "+62":  /^[2-9]\d{6,11}$/,
  "+63":  /^[2-9]\d{7,9}$/,
  "+64":  /^[2-9]\d{7,9}$/,
  "+65":  /^[689]\d{7}$/,
  "+66":  /^[2-9]\d{7,8}$/,
  "+81":  /^[1-9]\d{8,9}$/,
  "+82":  /^[1-9]\d{7,9}$/,
  "+84":  /^[1-9]\d{8,9}$/,
  "+86":  /^1[3-9]\d{9}$/,
  "+90":  /^5\d{9}$/,
  "+91":  /^[6-9]\d{9}$/,
  "+92":  /^3\d{9}$/,
  "+93":  /^[7]\d{8}$/,
  "+94":  /^[1-9]\d{8}$/,
  "+98":  /^9\d{9}$/,
  "+212": /^[5-7]\d{8}$/,
  "+213": /^[5-7]\d{8}$/,
  "+216": /^[2-9]\d{7}$/,
  "+218": /^[2-9]\d{8}$/,
  "+220": /^[2-9]\d{6}$/,
  "+221": /^[3-9]\d{8}$/,
  "+234": /^[7-9]\d{9}$/,
  "+254": /^[17]\d{8}$/,
  "+255": /^[67]\d{8}$/,
  "+256": /^[37]\d{8}$/,
  "+380": /^[3-9]\d{8}$/,
  "+381": /^[1-9]\d{7,8}$/,
  "+385": /^[1-9]\d{6,9}$/,
  "+386": /^[1-9]\d{7}$/,
  "+420": /^[1-9]\d{8}$/,
  "+421": /^[1-9]\d{8}$/,
  "+966": /^5\d{8}$/,
  "+971": /^5\d{8}$/,
  "+972": /^[5-9]\d{8}$/,
};

// Default: 6–15 digits
function validatePhoneNumber(number, dialCode) {
  const digits = number.replace(/[\s\-().]/g, "");
  if (!digits) return true; // optional field — blank is ok
  const pattern = PHONE_PATTERNS[dialCode];
  if (pattern) return pattern.test(digits);
  return /^\d{6,15}$/.test(digits);
}

// ── Dial-code picker ──────────────────────────────────────────────────────────

(function initDialPicker() {
  const trigger  = document.getElementById("dialTrigger");
  const dropdown = document.getElementById("dialDropdown");
  const search   = document.getElementById("dialSearch");
  const list     = document.getElementById("dialList");
  const flagEl   = document.getElementById("dialFlag");
  const codeEl   = document.getElementById("dialCode");
  const hidden   = document.getElementById("qDialCode");

  if (!trigger) return;

  let selected = COUNTRIES.find(c => c.c === "+47") || COUNTRIES[0];

  function renderList(filter = "") {
    const q = filter.toLowerCase();
    const filtered = q
      ? COUNTRIES.filter(c => c.n.toLowerCase().includes(q) || c.c.includes(q))
      : COUNTRIES;
    list.innerHTML = filtered
      .map(c =>
        `<li role="option" data-code="${c.c}" data-flag="${c.f}" data-name="${c.n}" class="${c.c === selected.c ? "is-active" : ""}">
          <span class="dl-flag">${c.f}</span>
          <span class="dl-name">${c.n}</span>
          <span class="dl-code">${c.c}</span>
        </li>`
      )
      .join("");
  }

  function openDropdown() {
    dropdown.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    search.value = "";
    renderList();
    search.focus();
    const active = list.querySelector(".is-active");
    if (active) active.scrollIntoView({ block: "nearest" });
  }

  function closeDropdown() {
    dropdown.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  }

  function select(code, flag, name) {
    selected = { c: code, f: flag, n: name };
    flagEl.textContent = flag;
    codeEl.textContent = code;
    hidden.value = code;
    closeDropdown();
  }

  trigger.addEventListener("click", e => {
    e.stopPropagation();
    dropdown.hidden ? openDropdown() : closeDropdown();
  });

  search.addEventListener("input", () => renderList(search.value));

  list.addEventListener("click", e => {
    const li = e.target.closest("li[data-code]");
    if (!li) return;
    select(li.dataset.code, li.dataset.flag, li.dataset.name);
  });

  document.addEventListener("click", e => {
    if (!document.getElementById("dialPicker")?.contains(e.target)) closeDropdown();
  });

  search.addEventListener("keydown", e => {
    if (e.key === "Escape") closeDropdown();
  });

  renderList();
})();

// ── Quiz form submission ───────────────────────────────────────────────────────

const quizForm   = document.getElementById("quizForm");
const quizStatus = document.getElementById("quizStatus");
const quizSubmit = document.getElementById("quizSubmit");

const qEmailInput = document.getElementById("qEmail");
const qEmailField = qEmailInput?.closest(".quiz-field");

function validateEmail() {
  const val = qEmailInput.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  qEmailField?.classList.toggle("has-error", val.length > 0 && !valid);
  return valid;
}

qEmailInput?.addEventListener("blur", validateEmail);
qEmailInput?.addEventListener("input", () => {
  if (qEmailField?.classList.contains("has-error")) validateEmail();
});

quizForm?.addEventListener("submit", async function (e) {
  e.preventDefault();
  updateFullMessage();
  populateHidden();

  const name = document.getElementById("qName").value.trim();
  const email = document.getElementById("qEmail").value.trim();

  if (name.length < 2) {
    setStatus("Vennligst skriv inn ditt navn.", true);
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    qEmailField?.classList.add("has-error");
    qEmailInput?.focus();
    return;
  }
  qEmailField?.classList.remove("has-error");

  const phoneInput = document.getElementById("qPhone");
  const phoneField = phoneInput?.closest(".quiz-field");
  const phoneVal   = phoneInput?.value.trim() || "";
  const dialCodeVal = document.getElementById("qDialCode")?.value || "+1";

  if (phoneVal && !validatePhoneNumber(phoneVal, dialCodeVal)) {
    if (phoneField) {
      phoneField.classList.add("has-error");
      let errEl = phoneField.querySelector(".quiz-field-error");
      if (!errEl) {
        errEl = document.createElement("p");
        errEl.className = "quiz-field-error";
        phoneField.appendChild(errEl);
      }
      errEl.textContent = "Please enter a valid phone number for the selected country.";
    }
    phoneInput?.focus();
    return;
  }
  if (phoneField) phoneField.classList.remove("has-error");

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
