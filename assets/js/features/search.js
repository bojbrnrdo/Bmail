import { state } from "../core/state.js";
import { buildSearchHaystack } from "../core/utils.js";
import { renderAll } from "../ui/render.js";

export function setupSearch() {
  const input = document.getElementById("search-input");

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();

    state.filteredEmails = state.emails.filter((email) => {
      return buildSearchHaystack(email).includes(query);
    });

    if (!state.filteredEmails.some((email) => email.id === state.selectedEmailId)) {
      state.selectedEmailId = state.filteredEmails[0]?.id ?? null;
    }

    renderAll();
  });
}