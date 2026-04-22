import { renderAll } from "./ui/render.js";
import { setupSearch } from "./features/search.js";
import { setupCompose } from "./features/compose.js";
import { setupActions } from "./features/actions.js";

const enterBmailBtn = document.getElementById("enter-bmail-btn");
const loginScreen = document.getElementById("login-screen");
const appShell = document.getElementById("app-shell");

enterBmailBtn.addEventListener("click", () => {
  loginScreen.classList.add("hidden");
  appShell.classList.remove("hidden");
});

setupSearch();
setupCompose();
setupActions();
renderAll();