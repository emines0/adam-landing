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


<!-- HERO -->
<section class="hero">
  <div class="container hero__grid">
    <div class="hero__copy">
      <!-- ═══ QUIZ PANEL ═══ -->
      <div class="quiz-panel" id="quizPanel">
        <div class="quiz-logo">
          <div class="quiz-logo__top">ADAM KAVKA</div>
          <div class="quiz-logo__bottom">COACHING</div>
          <p class="quiz-tagline"><b>Contact me</b> by answering the following questions below.</p>
        </div>

        <div class="quiz-progress">
          <div class="quiz-progress__fill" id="quizProgress" style="width: 16.66%"></div>
        </div>

        <div class="quiz-steps" id="quizSteps">
          <!-- Step 1 -->
          <div class="quiz-step is-active" data-step="1">
            <p class="quiz-question">How can I help you reach your goal?</p>
            <div class="quiz-options">
              <button class="quiz-opt" data-group="goal" data-val="athlete">
                Athlete improvement
              </button>
              <button class="quiz-opt" data-group="goal" data-val="muscle">Build muscles</button>
              <button class="quiz-opt" data-group="goal" data-val="energy">
                Get more energy and structure
              </button>
              <button class="quiz-opt" data-group="goal" data-val="glutes">Build glutes</button>
              <button class="quiz-opt" data-group="goal" data-val="injury">
                Recover from injury / Prevent injury
              </button>
              <button class="quiz-opt" data-group="goal" data-val="fat">Fat reduction</button>
            </div>
            <div class="quiz-nav">
              <button class="quiz-nav-btn quiz-nav-btn--next" data-next="2" disabled>Next</button>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="quiz-step" data-step="2">
            <p class="quiz-question">How many times per week do you realistically want to train?</p>
            <div class="quiz-options">
              <button class="quiz-opt" data-group="freq" data-val="2">2 times</button>
              <button class="quiz-opt" data-group="freq" data-val="3">3 times</button>
              <button class="quiz-opt" data-group="freq" data-val="4+">4+ times</button>
              <button class="quiz-opt" data-group="freq" data-val="unsure">Not sure</button>
            </div>
            <div class="quiz-nav">
              <button class="quiz-nav-btn quiz-nav-btn--back" data-back="1">Back</button>
              <button class="quiz-nav-btn quiz-nav-btn--next" data-next="3" disabled>Next</button>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="quiz-step" data-step="3">
            <p class="quiz-question">What is your biggest challenge?</p>
            <div class="quiz-options quiz-options--3col">
              <button class="quiz-opt" data-group="challenge" data-val="diet">
                It's hard to stick to a diet
              </button>
              <button class="quiz-opt" data-group="challenge" data-val="structure">
                Lack of structure in my training
              </button>
              <button class="quiz-opt" data-group="challenge" data-val="motivation">
                Struggle with motivation
              </button>
              <button class="quiz-opt" data-group="challenge" data-val="time">
                Not enough time in my daily life
              </button>
              <button class="quiz-opt" data-group="challenge" data-val="tried">
                Tried a lot without results
              </button>
              <button class="quiz-opt" data-group="challenge" data-val="coaching">
                Need coaching
              </button>
            </div>
            <div class="quiz-nav">
              <button class="quiz-nav-btn quiz-nav-btn--back" data-back="2">Back</button>
              <button class="quiz-nav-btn quiz-nav-btn--next" data-next="4" disabled>Next</button>
            </div>
          </div>

          <!-- Step 3b – ATHLETE variant -->
          <div class="quiz-step" data-step="3b">
            <p class="quiz-question">
              What aspect of your performance do you most want to improve?
            </p>
            <div class="quiz-options quiz-options--3col">
              <button class="quiz-opt" data-group="challenge" data-val="speed">
                Speed & explosiveness
              </button>
              <button class="quiz-opt" data-group="challenge" data-val="strength">
                Strength & power
              </button>
              <button class="quiz-opt" data-group="challenge" data-val="endurance">Recovery</button>
              <button class="quiz-opt" data-group="challenge" data-val="injury">
                Staying injury-free
              </button>
              <button class="quiz-opt" data-group="challenge" data-val="body-comp">
                Body composition
              </button>
              <button class="quiz-opt" data-group="challenge" data-val="consistency">
                Training consistency
              </button>
            </div>
            <div class="quiz-nav">
              <button class="quiz-nav-btn quiz-nav-btn--back" data-back="2">Back</button>
              <button class="quiz-nav-btn quiz-nav-btn--next" data-next="4" disabled>Next</button>
            </div>
          </div>

          <!-- Step 3c – INJURY/RECOVERY variant -->
          <div class="quiz-step" data-step="3c">
            <p class="quiz-question">What best describes your current situation?</p>
            <div class="quiz-options quiz-options--3col">
              <button class="quiz-opt" data-group="challenge" data-val="rehab">
                Recovering from a recent injury
              </button>
              <button class="quiz-opt" data-group="challenge" data-val="chronic">
                Managing a chronic / recurring issue
              </button>
              <button class="quiz-opt" data-group="challenge" data-val="prevention">
                No injury now, want to stay that way
              </button>
              <button class="quiz-opt" data-group="challenge" data-val="post-surgery">
                Post-surgery rehabilitation
              </button>
              <button class="quiz-opt" data-group="challenge" data-val="pain">
                Pain during training I want to fix
              </button>
              <button class="quiz-opt" data-group="challenge" data-val="return">
                Returning to sport after time off
              </button>
            </div>
            <div class="quiz-nav">
              <button class="quiz-nav-btn quiz-nav-btn--back" data-back="2">Back</button>
              <button class="quiz-nav-btn quiz-nav-btn--next" data-next="4" disabled>Next</button>
            </div>
          </div>

          <!-- Step 4 -->
          <div class="quiz-step" data-step="4">
            <p class="quiz-question">How ready are you to start making real progress?</p>
            <div class="quiz-options">
              <button class="quiz-opt" data-group="ready" data-val="now">
                I'm ready to start now
              </button>
              <button class="quiz-opt" data-group="ready" data-val="soon">
                I want to start within the next few weeks
              </button>
            </div>
            <div class="quiz-nav">
              <button class="quiz-nav-btn quiz-nav-btn--back" data-back="3">Back</button>
              <button class="quiz-nav-btn quiz-nav-btn--next" data-next="5" disabled>Next</button>
            </div>
          </div>

          <!-- Step 5 -->
          <div class="quiz-step" data-step="5">
            <p class="quiz-question">What do you feel you're missing most right now?</p>
            <div class="quiz-options">
              <button class="quiz-opt" data-group="missing" data-val="diet-structure">
                Nutrition structure
              </button>
              <button class="quiz-opt" data-group="missing" data-val="training-structure">
                Training structure
              </button>
              <button class="quiz-opt" data-group="missing" data-val="accountability">
                Accountability and check-ins
              </button>
              <button class="quiz-opt" data-group="missing" data-val="all">All</button>
            </div>
            <div class="quiz-nav">
              <button class="quiz-nav-btn quiz-nav-btn--back" data-back="4">Back</button>
              <button
                class="quiz-nav-btn quiz-nav-btn--next scroll-top-btn"
                data-next="contact"
                disabled
              >
                Next
              </button>
            </div>
            <!-- <div class="quiz-nav">
              <button class="quiz-nav-btn quiz-nav-btn--back" data-back="4">Back</button>
              <button class="quiz-nav-btn quiz-nav-btn--next" data-next="6" disabled>Next</button>
            </div> -->
          </div>

          <!-- Step 6 -->
          <!-- <div class="quiz-step" data-step="6">
            <p class="quiz-question">Are you willing to follow a plan if it suits you?</p>
            <div class="quiz-options">
              <button class="quiz-opt" data-group="commit" data-val="yes">
                Yes, I'm ready to do what it takes
              </button>
              <button class="quiz-opt" data-group="commit" data-val="support">
                Yes, but I need support and guidance
              </button>
            </div>
            <div class="quiz-nav">
              <button class="quiz-nav-btn quiz-nav-btn--back" data-back="5">Back</button>
              <button
                class="quiz-nav-btn quiz-nav-btn--next scroll-top-btn"
                data-next="contact"
                disabled
              >
                Next
              </button>
            </div>
          </div> -->

          <!-- Contact -->
          <div class="quiz-step" data-step="contact">
            <p class="quiz-contact-title">Contact Information</p>
            <form id="quizForm" action="https://api.web3forms.com/submit" method="POST">
              <input type="hidden" name="access_key" value="e5d29712-9a06-461d-8689-d2d3aa229a0f" />
              <input type="hidden" name="subject" id="fSubject" />
              <input type="hidden" name="goal" id="fGoal" />
              <input type="hidden" name="frequency" id="fFreq" />
              <input type="hidden" name="challenge" id="fChallenge" />
              <input type="hidden" name="readiness" id="fReady" />
              <input type="hidden" name="missing" id="fMissing" />
              <input type="hidden" name="commitment" id="fCommit" />

              <div class="quiz-field">
                <label for="qName">Full name</label>
                <input
                  type="text"
                  id="qName"
                  name="name"
                  placeholder="Your full name"
                  required
                  autocomplete="name"
                />
              </div>
              <div class="quiz-field">
                <label for="qEmail">Email</label>
                <input
                  type="email"
                  id="qEmail"
                  name="email"
                  placeholder="Your email"
                  required
                  autocomplete="email"
                />
                <p class="quiz-field-error" id="qEmailError">Please enter a valid email address.</p>
              </div>
              <div class="quiz-field">
                <label for="qPhone">Phone</label>
                <div class="quiz-phone-row">
                  <div class="dial-picker" id="dialPicker">
                    <button
                      type="button"
                      class="dial-trigger"
                      id="dialTrigger"
                      aria-haspopup="listbox"
                      aria-expanded="false"
                    >
                      <span class="dial-flag" id="dialFlag">🇳🇴</span>
                      <span class="dial-code" id="dialCode">+47</span>
                      <span class="dial-arrow" aria-hidden="true">▾</span>
                    </button>
                    <div
                      class="dial-dropdown"
                      id="dialDropdown"
                      role="listbox"
                      aria-label="Select country code"
                      hidden
                    >
                      <div class="dial-search-wrap">
                        <input
                          type="text"
                          class="dial-search"
                          id="dialSearch"
                          placeholder="Search country…"
                          autocomplete="off"
                          aria-label="Search countries"
                        />
                      </div>
                      <ul class="dial-list" id="dialList"></ul>
                    </div>
                  </div>
                  <input type="hidden" name="dial_code" id="qDialCode" value="+47" />
                  <input
                    type="tel"
                    id="qPhone"
                    name="phone"
                    placeholder="Mobile number"
                    autocomplete="tel"
                  />
                </div>
              </div>

              <!-- Your answers toggle -->
              <div class="quiz-field">
                <div class="quiz-answers-header">
                  <label>Your answers</label>
                  <button type="button" class="quiz-answers-toggle" id="answersToggle">
                    Show my answers
                  </button>
                </div>
                <div class="quiz-answers-body" id="answersBody" hidden>
                  <div id="qSummaryDisplay" class="quiz-summary-display"></div>
                </div>
                <input type="hidden" id="qSummary" />
              </div>

              <div class="quiz-field">
                <label for="qMessage"
                  >Anything else you'd like to add?
                  <span class="quiz-label-optional">(optional)</span></label
                >
                <textarea
                  id="qMessage"
                  name="additional_notes"
                  class="quiz-message-textarea"
                  rows="3"
                  placeholder="Tell me about your schedule, goals, or anything relevant…"
                ></textarea>
              </div>

              <input type="hidden" name="message" id="fFullMessage" />

              <div class="h-captcha" data-captcha="true" data-theme="dark"></div>

              <div class="quiz-bottom-row">
                <button
                  type="button"
                  class="quiz-nav-btn quiz-nav-btn--back scroll-top-btn"
                  data-back="5"
                >
                  Back
                </button>
                <button type="submit" class="quiz-submit-btn" id="quizSubmit">Contact me</button>
              </div>
              <p class="quiz-privacy">
                When you submit the form, we use your contact information to send you special
                offers. Read our <a href="/privacy">privacy policy</a> for more information.
              </p>
              <p class="quiz-status" id="quizStatus"></p>
            </form>
          </div>

          <!-- Thanks -->
          <div class="quiz-step" data-step="thanks">
            <div class="quiz-thanks">
              <div class="quiz-thanks__icon">✓</div>
              <h2>Thank you! We'll be in touch soon.</h2>
              <p>
                We've received your information and will get back to you as soon as possible.
              </p>
            </div>
          </div>
        </div>
        <!-- /quiz-steps -->
      </div>
      <!-- /quiz-panel -->
    </div>
    <div class="hero__media">
      <img
        class="hero__image"
        src="assets/coach-hero-toned.jpg"
        alt="Abstract placeholder graphic (replace with coach photo)"
        loading="eager"
      />
      <div class="hero__card">
        <h3>What you get</h3>
        <ul class="checklist">
          <li>Personalized training plan</li>
          <li>Nutrition targets + meals framework</li>
          <li>Weekly check-ins + adjustments</li>
          <li>In-app chat + form review</li>
        </ul>
      </div>
    </div>
  </div>
</section>