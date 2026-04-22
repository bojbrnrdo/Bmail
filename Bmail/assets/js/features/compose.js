import { stripHtml } from "../core/utils.js";

const composeModal = document.getElementById("compose-modal");
const composeTo = document.getElementById("compose-to");
const composeSubject = document.getElementById("compose-subject");
const composeBody = document.getElementById("compose-body");
const closeComposeBtn = document.getElementById("close-compose-btn");
const sendComposeBtn = document.getElementById("send-compose-btn");
const composeBtn = document.getElementById("compose-btn");

let currentComposeEmailId = null;

export function buildReportBody(email) {
  return [
    "Reported Phishing Email",
    "",
    `Sender: ${email.senderName} <${email.senderEmail}>`,
    `Category: ${email.category}`,
    `Time: ${email.time}`,
    `Subject: ${email.subject}`,
    "",
    "--- EMAIL CONTENT ---",
    stripHtml(email.body),
    "",
    "--- END OF MESSAGE ---"
  ].join("\n");
}

export function openComposeModal(email = null) {
  currentComposeEmailId = email?.id ?? null;
  composeTo.value = "cyberops@bounty.com.ph";
  composeSubject.value = email ? `[PHISHING REPORT] ${email.subject}` : "";
  composeBody.value = email ? buildReportBody(email) : "";
  composeModal.classList.remove("hidden");
}

export function closeComposeModal() {
  composeModal.classList.add("hidden");
}

export function setupCompose() {
  composeBtn.addEventListener("click", () => openComposeModal());

  closeComposeBtn.addEventListener("click", closeComposeModal);

  sendComposeBtn.addEventListener("click", () => {
    closeComposeModal();
    alert("Report sent successfully.");
  });
}