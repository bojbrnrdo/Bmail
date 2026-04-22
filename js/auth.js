function checkRules() {
  const password = document.getElementById("password").value;

  toggle("length", password.length >= 8);
  toggle("uppercase", /[A-Z]/.test(password));
  toggle("number", /[0-9]/.test(password));
  toggle("symbol", /[^A-Za-z0-9]/.test(password));
}

function toggle(id, valid) {
  const el = document.getElementById(id);

  if (valid) {
    el.classList.add("valid");
    el.innerText = "✔ " + el.innerText.slice(2);
  } else {
    el.classList.remove("valid");
    el.innerText = "❌ " + el.innerText.slice(2);
  }
}

function createAccount() {
  const password = document.getElementById("password").value;

  if (!isValid(password)) {
    alert("Password does not meet security requirements.");
    return;
  }

  // Save for training context only
  localStorage.setItem("bmail_trained", true);

  // 🚀 DIRECT REDIRECT (NO LOGIN)
  window.location.href = "mail.html";
}

function isValid(password) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}