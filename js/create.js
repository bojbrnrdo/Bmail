/* ===================== ELEMENTS ===================== */
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const strengthContainer = document.getElementById("strengthContainer");
const suggestionsBox = document.getElementById("suggestions");
const loadingScreen = document.getElementById("loadingScreen");

/* 🛡️ ASSISTANT */
const assistant = document.getElementById("assistant");
const assistantBubble = document.getElementById("assistantBubble");

let currentStrength = "weak";

/* ===================== VOICE CONTROL ===================== */
let lastSpoken = "";
let speakTimeout = null;

/* SPEAK FUNCTION */
function speak(text) {
  if (text === lastSpoken) return;

  lastSpoken = text;

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speech.rate = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}

/* DELAYED SPEAK (ANTI-SPAM) */
function speakWithDelay(text) {
  clearTimeout(speakTimeout);

  speakTimeout = setTimeout(() => {
    speak(text);
  }, 800);
}

/* ===================== SINGLE SOURCE ===================== */
function updateAssistant(message) {
  assistant.classList.remove("hidden");
  assistantBubble.innerText = message;

  speakWithDelay(message);
}

/* ===================== INTRO MESSAGE ===================== */
window.addEventListener("load", () => {
  const introMessage =
    "This is a password training simulation. Please create a strong password to continue.";

  assistant.classList.remove("hidden");
  assistantBubble.innerText = introMessage;

  setTimeout(() => {
    speak(introMessage);
  }, 500);
});

/* ===================== REAL-TIME STRENGTH ===================== */
passwordInput.addEventListener("input", checkStrength);

function checkStrength() {
  const pass = passwordInput.value;

  if (pass.length > 0) {
    strengthContainer.classList.remove("hidden");
    assistant.classList.remove("hidden");
  } else {
    strengthContainer.classList.add("hidden");
    assistant.classList.add("hidden");
    return;
  }

  let strength = 0;

  if (pass.length >= 12) strength++;
  if (/[A-Z]/.test(pass)) strength++;
  if (/[0-9]/.test(pass)) strength++;
  if (/[^A-Za-z0-9]/.test(pass)) strength++;

  strengthBar.className = "strength-bar";

  if (strength <= 2) {
    strengthBar.classList.add("strength-weak");
    strengthText.innerText = "Weak";
    currentStrength = "weak";

    updateAssistant("This password is weak. Try adding symbols or making it longer.");
  }
  else if (strength === 3) {
    strengthBar.classList.add("strength-medium");
    strengthText.innerText = "Medium";
    currentStrength = "medium";

    updateAssistant("You're getting there. Add more complexity to strengthen it.");
  }
  else {
    strengthBar.classList.add("strength-strong");
    strengthText.innerText = "Strong";
    currentStrength = "strong";

    updateAssistant("Great! This is a strong password.");
  }
}

/* ===================== TOGGLE PASSWORD ===================== */
function togglePassword() {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
  confirmInput.type = type;
}

/* ===================== VALIDATION ===================== */
function validatePassword() {
  const pass = passwordInput.value;
  const confirm = confirmInput.value;

  let errors = [];

  if (pass.length < 12) {
    errors.push("Use at least 12 characters");
  }

  if (!/[A-Z]/.test(pass)) {
    errors.push("Add uppercase letters");
  }

  if (!/[0-9]/.test(pass)) {
    errors.push("Add numbers");
  }

  if (!/[^A-Za-z0-9]/.test(pass)) {
    errors.push("Add symbols");
  }

  /* SHOW ERRORS */
  if (errors.length > 0) {
    suggestionsBox.classList.remove("hidden");
    suggestionsBox.innerText = errors.join(". ") + ".";

    updateAssistant("Your password needs improvement before continuing.");
    return;
  }

  if (pass !== confirm) {
    suggestionsBox.classList.remove("hidden");
    suggestionsBox.innerText = "Passwords do not match.";

    updateAssistant("Passwords do not match.");
    return;
  }

  /* SUCCESS */
  updateAssistant("Account created successfully. Please wait while we set up your account.");

  /* SHOW LOADING SCREEN */
  loadingScreen.classList.remove("hidden");

  /* REDIRECT AFTER 2 SECONDS */
  setTimeout(() => {
    window.location.href = "mail.html";
  }, 6000);
}