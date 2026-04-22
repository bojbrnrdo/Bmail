import { state } from "../core/state.js";
import { isDecisionCorrect } from "../core/utils.js";
import { renderAll, getEmailById } from "../ui/render.js";
import { openComposeModal } from "./compose.js";

const legitBtn = document.getElementById("btn-legit");
const phishBtn = document.getElementById("btn-phish");
const nextBtn = document.getElementById("btn-next");
const backToListBtn = document.getElementById("back-to-list-btn");

const phishModal = document.getElementById("phish-modal");
const closePhishModalBtn = document.getElementById("close-phish-modal-btn");

function handleDecision(choice) {
  const email = getEmailById(state.selectedEmailId);
  if (!email || state.resolvedMap[email.id]) return;

  const correct = isDecisionCorrect(choice, email.type);

  state.resolvedMap[email.id] = true;
  state.decisionMap[email.id] = choice;
  state.correctnessMap[email.id] = correct;
  state.reviewedCount += 1;

  if (correct) {
    state.score += 1;
  } else {
    state.mistakes += 1;
  }

  renderAll();

  if (choice === "phish" && email.type === "phishing") {
    openComposeModal(email);
  }
}

function goToNextEmail() {
  const currentIndex = state.filteredEmails.findIndex((email) => email.id === state.selectedEmailId);

  if (currentIndex >= 0 && state.filteredEmails[currentIndex + 1]) {
    state.selectedEmailId = state.filteredEmails[currentIndex + 1].id;
    renderAll();
    return;
  }

  const unresolved = state.filteredEmails.find((email) => !state.resolvedMap[email.id]);
  if (unresolved) {
    state.selectedEmailId = unresolved.id;
    renderAll();
  }
}

export function setupActions() {
  legitBtn.addEventListener("click", () => handleDecision("legit"));
  phishBtn.addEventListener("click", () => handleDecision("phish"));
  nextBtn.addEventListener("click", goToNextEmail);

  backToListBtn.addEventListener("click", () => {
    document.body.classList.remove("mobile-viewer-open");
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!target) return;

    if (target.classList?.contains("fake-button")) {
      event.preventDefault();
      phishModal.classList.remove("hidden");
    }
  });

  closePhishModalBtn.addEventListener("click", () => {
    phishModal.classList.add("hidden");
  });

  document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    const email = getEmailById(state.selectedEmailId);
    const resolved = email ? state.resolvedMap[email.id] : false;

    if (key === "l" && !resolved) handleDecision("legit");
    if (key === "p" && !resolved) handleDecision("phish");
    if (key === "n" && resolved) goToNextEmail();
    if (key === "escape") {
      phishModal.classList.add("hidden");
    }
  });
}