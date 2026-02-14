// --- Mobile nav ---
const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")

function setNav(open) {
  navMenu.classList.toggle("is-open", open)
  navToggle.setAttribute("aria-expanded", String(open))
}

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.contains("is-open")
  setNav(!isOpen)
})

navMenu?.addEventListener("click", e => {
  const target = e.target
  if (target && target.tagName === "A") setNav(false)
})

document.addEventListener("click", e => {
  if (!navMenu || !navToggle) return
  const within = navMenu.contains(e.target) || navToggle.contains(e.target)
  if (!within) setNav(false)
})

// --- Year ---
document.getElementById("year").textContent = String(new Date().getFullYear())

// --- Gallery modal ---
const modal = document.getElementById("modal")
const modalImg = document.getElementById("modalImg")
const modalClose = document.getElementById("modalClose")
const gallery = document.getElementById("gallery")

function openModal(src) {
  modalImg.src = src
  modal.setAttribute("aria-hidden", "false")
  document.body.style.overflow = "hidden"
}
function closeModal() {
  modal.setAttribute("aria-hidden", "true")
  modalImg.src = ""
  document.body.style.overflow = ""
}

gallery?.addEventListener("click", e => {
  const btn = e.target.closest("button[data-full]")
  if (!btn) return
  openModal(btn.getAttribute("data-full"))
})

modal?.addEventListener("click", e => {
  const close = e.target?.dataset?.close === "true"
  if (close) closeModal()
})
modalClose?.addEventListener("click", closeModal)
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal?.getAttribute("aria-hidden") === "false") closeModal()
})

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
]

let qIndex = 0
const quoteText = document.getElementById("quoteText")
const quoteMeta = document.getElementById("quoteMeta")
const quotePrev = document.getElementById("quotePrev")
const quoteNext = document.getElementById("quoteNext")

function renderQuote() {
  const q = quotes[qIndex]
  quoteText.textContent = q.text
  quoteMeta.textContent = q.meta
}

quotePrev?.addEventListener("click", () => {
  qIndex = (qIndex - 1 + quotes.length) % quotes.length
  renderQuote()
})
quoteNext?.addEventListener("click", () => {
  qIndex = (qIndex + 1) % quotes.length
  renderQuote()
})

// --- Contact form validation (client-side demo) ---
const leadForm = document.getElementById("leadForm")
const formNote = document.getElementById("formNote")

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

leadForm?.addEventListener("submit", e => {
  e.preventDefault()
  formNote.textContent = ""

  const data = new FormData(leadForm)
  const name = String(data.get("name") || "").trim()
  const email = String(data.get("email") || "").trim()
  const goal = String(data.get("goal") || "").trim()
  const message = String(data.get("message") || "").trim()

  const errors = []
  if (name.length < 2) errors.push("Please enter your name.")
  if (!isValidEmail(email)) errors.push("Please enter a valid email.")
  if (!goal) errors.push("Please choose a goal.")
  if (message.length < 10) errors.push("Please add a short message (10+ characters).")

  if (errors.length) {
    formNote.textContent = errors[0]
    return
  }

  // Demo: replace with real backend (Netlify Forms, Formspree, custom API, etc.)
  formNote.textContent =
    "Thanks! Your message is ready to send (connect this form to your backend)."
  leadForm.reset()
})
