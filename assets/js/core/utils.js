export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function stripHtml(html) {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
}

export function regexEscape(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function isDecisionCorrect(choice, type) {
  return (choice === "legit" && type === "legitimate") ||
         (choice === "phish" && type === "phishing");
}

export function buildSearchHaystack(email) {
  return [
    email.senderName,
    email.senderEmail,
    email.subject,
    email.preview,
    stripHtml(email.body),
    email.category
  ].join(" ").toLowerCase();
}