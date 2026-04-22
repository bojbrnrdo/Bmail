import { state } from "../core/state.js";
import { escapeHtml, regexEscape, isDecisionCorrect } from "../core/utils.js";

const el = {
  appShell: document.getElementById("app-shell"),
  loginScreen: document.getElementById("login-screen"),
  inboxList: document.getElementById("inbox-list"),
  inboxCount: document.getElementById("inbox-count"),
  score: document.getElementById("score"),
  mistakes: document.getElementById("mistakes"),
  progressBar: document.getElementById("progress-bar"),
  progressText: document.getElementById("progress-text"),
  mailUsageText: document.getElementById("mail-usage-text"),
  mailPageMeta: document.getElementById("mail-page-meta"),
  viewerPosition: document.getElementById("viewer-position"),
  emailSubject: document.getElementById("email-subject"),
  senderName: document.getElementById("sender-name"),
  emailSender: document.getElementById("email-sender"),
  senderAvatar: document.getElementById("sender-avatar"),
  messageTag: document.getElementById("message-tag"),
  messageTime: document.getElementById("message-time"),
  emailBody: document.getElementById("email-body"),
  resultStatusPill: document.getElementById("result-status-pill"),
  legitBtn: document.getElementById("btn-legit"),
  phishBtn: document.getElementById("btn-phish"),
  nextBtn: document.getElementById("btn-next")
};

export function getEmailById(id) {
  return state.emails.find((email) => email.id === id) || null;
}

function applyHighlights(email, html) {
  if (!state.resolvedMap[email.id] || email.type !== "phishing" || !email.highlights?.length) {
    return html;
  }

  let output = html;

  email.highlights.forEach((item) => {
    const pattern = new RegExp(regexEscape(item.text), "gi");
    output = output.replace(pattern, (match) => `<span class="phish-highlight">${match}</span>`);
  });

  return output;
}

function renderStatusPill(email) {
  const pill = el.resultStatusPill;
  if (!email || !state.resolvedMap[email.id]) {
    pill.className = "result-status-pill hidden";
    pill.textContent = "";
    return;
  }

  const correct = isDecisionCorrect(state.decisionMap[email.id], email.type);
  pill.className = `result-status-pill ${correct ? "success" : "error"}`;
  pill.textContent = correct ? "✓ Correct" : "✕ Incorrect";
}

function renderActionButtons(email) {
  if (!email) {
    el.legitBtn.disabled = true;
    el.phishBtn.disabled = true;
    el.nextBtn.disabled = true;
    return;
  }

  const resolved = state.resolvedMap[email.id];

  el.legitBtn.disabled = resolved;
  el.phishBtn.disabled = resolved;
  el.nextBtn.disabled = !resolved;
}

export function renderHUD() {
  el.inboxCount.textContent = state.filteredEmails.length;
  el.score.textContent = state.score;
  el.mistakes.textContent = state.mistakes;

  const total = state.emails.length;
  const percent = total ? (state.reviewedCount / total) * 100 : 0;

  el.progressBar.style.width = `${percent}%`;
  el.progressText.textContent = `${state.reviewedCount} of ${total} reviewed`;
  el.mailUsageText.textContent = `${state.reviewedCount} reviewed`;
  el.mailPageMeta.textContent = `${state.filteredEmails.length} visible`;
}

export function renderInbox() {
  el.inboxList.innerHTML = "";

  state.filteredEmails.forEach((email) => {
    const row = document.createElement("div");
    const selected = email.id === state.selectedEmailId;
    const resolved = state.resolvedMap[email.id];

    row.className = `mail-row ${selected ? "selected" : ""} ${resolved ? "" : "unread"}`;
    row.innerHTML = `
      <div class="mail-select">☐</div>
      <div class="mail-star">☆</div>
      <div class="mail-from">${escapeHtml(email.senderName)}</div>
      <div class="mail-main">
        <span class="mail-main-subject">${escapeHtml(email.subject)}</span>
        <span class="mail-main-preview">- ${escapeHtml(email.preview)}</span>
      </div>
      <div class="mail-date">${escapeHtml(email.time)}</div>
    `;

    row.addEventListener("click", () => {
      state.selectedEmailId = email.id;
      renderAll();
      if (window.innerWidth <= 1120) {
        document.body.classList.add("mobile-viewer-open");
      }
    });

    el.inboxList.appendChild(row);
  });
}

export function renderViewer() {
  const email = getEmailById(state.selectedEmailId);

  if (!email) {
    el.emailSubject.textContent = "Select an email";
    el.senderName.textContent = "Bmail Training";
    el.emailSender.textContent = "<simulation@bmail.local>";
    el.senderAvatar.textContent = "B";
    el.messageTag.textContent = "Inbox";
    el.messageTime.textContent = "—";
    el.emailBody.innerHTML = "Open an email and decide whether it is legitimate or phishing.";
    renderStatusPill(null);
    renderActionButtons(null);
    el.viewerPosition.textContent = `0 of ${state.filteredEmails.length}`;
    return;
  }

  el.emailSubject.innerHTML = applyHighlights(email, email.subject);
  el.senderName.textContent = email.senderName;
  el.emailSender.innerHTML = `&lt;${applyHighlights(email, email.senderEmail)}&gt;`;
  el.senderAvatar.textContent = email.senderInitial;
  el.messageTag.textContent = email.tag;
  el.messageTime.textContent = email.time;
  el.emailBody.innerHTML = applyHighlights(email, email.body);

  renderStatusPill(email);
  renderActionButtons(email);

  const index = state.filteredEmails.findIndex((item) => item.id === email.id);
  el.viewerPosition.textContent = `${index >= 0 ? index + 1 : 0} of ${state.filteredEmails.length}`;
}

export function renderAll() {
  renderHUD();
  renderInbox();
  renderViewer();
}