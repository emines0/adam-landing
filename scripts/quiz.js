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
  const lines = Object.entries(QUESTION_LABELS)
    .filter(([key]) => answers[key])
    .map(([key, question]) => {
      const raw = answers[key];
      const label = (ANSWER_LABELS[key] && ANSWER_LABELS[key][raw]) || raw;
      return question + "\n" + label;
    });

  const additionalMsg = document.getElementById("qMessage")?.value.trim() || "";
  if (additionalMsg) {
    lines.push("Additional message:\n" + additionalMsg);
  }

  const combined = lines.join("\n\n");

  // Write into the hidden 'message' field that Web3Forms uses as the email body
  const el = document.getElementById("fFullMessage");
  if (el) el.value = combined;

  // Also keep qSummary in sync for the display
  const summaryEl = document.getElementById("qSummary");
  if (summaryEl) summaryEl.value = combined;
}

// Live update when user types in free-text area
document.getElementById("qMessage")?.addEventListener("input", updateFullMessage);
