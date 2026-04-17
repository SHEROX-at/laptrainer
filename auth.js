const ACCESS_CODE = "1234";

/* REGISTER */
function register() {
  const user = document.getElementById("user").value.trim();
  const pass = document.getElementById("pass").value.trim();
  const code = document.getElementById("code").value.trim();

  if (!user || !pass || !code) {
    alert("Bitte alles ausfüllen");
    return;
  }

  if (code !== ACCESS_CODE) {
    alert("Falscher Zugangscode");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[user]) {
    alert("User existiert bereits");
    return;
  }

  users[user] = {
    password: pass,
    progress: {}
  };

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", user);

  window.location.href = "app.html";
}

/* LOGIN */
function login() {
  const user = document.getElementById("user").value.trim();
  const pass = document.getElementById("pass").value.trim();

  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if (!users[user] || users[user].password !== pass) {
    alert("Falsche Login Daten");
    return;
  }

  localStorage.setItem("currentUser", user);

  window.location.href = "app.html";
}

/* CHECK LOGIN */
function checkAuth() {
  const user = localStorage.getItem("currentUser");
  if (!user) {
    window.location.href = "index.html";
  }
}

/* LOGOUT */
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
