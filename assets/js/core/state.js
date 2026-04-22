import { EMAILS } from "../data/emails.js";

export const state = {
  emails: EMAILS,
  filteredEmails: [...EMAILS],
  selectedEmailId: EMAILS[0]?.id ?? null,
  reviewedCount: 0,
  score: 0,
  mistakes: 0,
  resolvedMap: {},
  decisionMap: {},
  correctnessMap: {}
};

EMAILS.forEach((email) => {
  state.resolvedMap[email.id] = false;
  state.decisionMap[email.id] = null;
  state.correctnessMap[email.id] = null;
});