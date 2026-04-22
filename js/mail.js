/* ===================== DATASET ===================== */
let emails = [
  {
    sender: "IT Service Desk",
    email: "it.support@bounty.com.ph",
    subject: "Action Required: Your Password Will Expire in 3 Days",
    preview: "Your password will expire soon. Update it now...",
    body: `Dear Job,

This is a reminder that your company account password will expire in 3 days.

To avoid any disruption to your access, please update your password using the official portal below:

https://portal.bounty.com.ph/password-reset

Password Requirements:
- At least 12 characters
- Combination of uppercase, lowercase, numbers, and symbols
- Must not match previous passwords

If you need assistance, you may contact the IT Service Desk.

Thank you,
IT Service Desk Team
Bounty Fresh Group`,
    time: "8:30 AM",
    phishing: false,
    unread: true,
    starred: false
  },

  {
    sender: "HR Department",
    email: "hr@bounty.com.ph",
    subject: "Updated Work-From-Home Guidelines",
    preview: "WFH guidelines have been updated...",
    body: `Dear Employees,

Please be advised that the Work-From-Home (WFH) Guidelines have been updated effective immediately.

You may review the updated policy here:

https://intranet.bounty.com.ph/hr/wfh-guidelines

Kindly ensure compliance with the updated procedures.

For any questions, feel free to reach out to HR.

Regards,
Human Resources Department`,
    time: "Yesterday",
    phishing: false,
    unread: true,
    starred: false
  },

  {
    sender: "Microsoft Security",
    email: "security-alert@micr0soft-support.com",
    subject: "Urgent: Unusual Sign-in Activity Detected",
    preview: "We detected suspicious login activity...",
    body: `Dear User,

We detected a suspicious login attempt on your account from an unknown device.

To secure your account, please verify your identity immediately:

http://micr0soft-secure-login.verify-user.net

Failure to verify within 24 hours may result in account suspension.

Stay safe,
Microsoft Security Team`,
    time: "10:12 AM",
    phishing: true,
    unread: true,
    starred: false
  },

  {
    sender: "Payroll Team",
    email: "payroll@bountypayroll-support.com",
    subject: "Payroll Issue: Immediate Action Required",
    preview: "There is an issue with your salary processing...",
    body: `Dear Employee,

We encountered an issue processing your salary for this period due to incomplete records.

Please update your payroll information here:

http://bounty-payroll-update.secure-form.net

Failure to comply may delay your salary release.

Thank you,
Payroll Processing Team`,
    time: "Today",
    phishing: true,
    unread: true,
    starred: false
  },

  {
    sender: "Courier Service",
    email: "delivery@express-logistics-track.com",
    subject: "Delivery Failed – Action Needed",
    preview: "We attempted delivery but failed...",
    body: `Dear Customer,

We attempted to deliver your package but were unable to complete the delivery.

To reschedule, please confirm your details here:

http://track-package-delivery.info/reschedule

Note: Failure to respond within 48 hours will result in package return.

Regards,
Delivery Team`,
    time: "1:45 PM",
    phishing: true,
    unread: true,
    starred: false
  }
];

/* ===================== SHUFFLE ===================== */
function shuffleEmails(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/* ===================== LOAD INBOX ===================== */
function loadInbox() {
  const container = document.getElementById("emails");
  container.innerHTML = "";

  emails.forEach((email, index) => {
    const row = document.createElement("div");
    row.className = "email-item";

    if (email.unread) row.classList.add("unread");

    row.innerHTML = `
      <div class="email-left">
        <input type="checkbox" onclick="event.stopPropagation()">

        <span class="material-icons star ${email.starred ? 'starred' : ''}"
          onclick="toggleStar(event, ${index})">
          ${email.starred ? 'star' : 'star_border'}
        </span>

        <span class="sender">${email.sender}</span>
      </div>

      <div class="email-content">
        <div class="email-subject">${email.subject}</div>
        <div class="email-preview">${email.preview}</div>
      </div>

      <div class="email-time">${email.time}</div>
    `;

    row.onclick = () => openEmail(index, row);

    container.appendChild(row);
  });
}

/* ===================== OPEN EMAIL ===================== */
function openEmail(index, element) {
  const email = emails[index];

  document.querySelectorAll(".email-item").forEach(e => e.classList.remove("active"));
  element.classList.add("active");

  email.unread = false;
  element.classList.remove("unread");

  document.getElementById("emptyState").style.display = "none";
  document.getElementById("emailContent").classList.remove("hidden");

  /* HEADER */
  document.getElementById("subject").innerText = email.subject;
  document.getElementById("senderName").innerText = email.sender;
  document.getElementById("senderEmail").innerText = `<${email.email}>`;
  document.getElementById("emailTime").innerText = email.time;

  document.getElementById("avatarCircle").innerText =
    email.sender.charAt(0);

  /* BODY */
  document.getElementById("body").innerText = email.body;

  window.currentEmail = email;
}

/* ===================== STAR ===================== */
function toggleStar(event, index) {
  event.stopPropagation();
  emails[index].starred = !emails[index].starred;
  loadInbox();
}

/* ===================== REPORT PHISHING ===================== */
function reportPhishing() {
  if (!window.currentEmail) return;

  const email = window.currentEmail;

  /* VALIDATION */
  if (!email.phishing) {
    alert("❌ Incorrect — This email is legitimate and should not be reported.");
    return;
  }

  document.getElementById("composeModal").classList.remove("hidden");

  document.getElementById("composeTo").value = "cyberops@bounty.com.ph";

  document.getElementById("composeSubject").value =
    `[Phishing Report] Suspicious Email - ${email.subject}`;

  document.getElementById("composeBody").value =
`Hi CyberOps Team,

I would like to report a suspicious email that I encountered.

---------------------------------------
Sender: ${email.sender}
Email: ${email.email}
Subject: ${email.subject}
---------------------------------------

Reason for suspicion:
- Suspicious link or request for sensitive information
- Possible impersonation attempt

Please investigate this email.

Thank you.`;
}

/* ===================== SEND ===================== */
function sendEmail() {
  alert("✅ Correct — Phishing email reported to CyberOps.");
  document.getElementById("composeModal").classList.add("hidden");
}

/* ===================== LEGIT ===================== */
function markLegit() {
  if (!window.currentEmail) return;

  if (window.currentEmail.phishing) {
    alert("❌ Incorrect — This is phishing.");
  } else {
    alert("✅ Correct — Legitimate email.");
  }
}

/* ===================== INIT ===================== */
shuffleEmails(emails);
loadInbox();