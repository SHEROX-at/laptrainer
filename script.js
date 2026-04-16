const ACCESS_CODES = ["1234","LAP2026"];

/* USERS */
function getUsers(){
  return JSON.parse(localStorage.getItem("users")) || {};
}

function saveUsers(u){
  localStorage.setItem("users", JSON.stringify(u));
}

/* REGISTER */
function register(){
  const name = document.getElementById("name").value.trim();
  const pw = document.getElementById("pw").value.trim();
  const code = document.getElementById("code").value.trim();

  if(!name || !pw || !code){
    alert("Bitte alles ausfüllen");
    return;
  }

  if(!ACCESS_CODES.includes(code)){
    alert("Code falsch");
    return;
  }

  let users = getUsers();

  if(users[name]){
    alert("User existiert bereits");
    return;
  }

  users[name] = pw;
  saveUsers(users);

  alert("Registriert! Jetzt einloggen");
}

/* LOGIN */
function login(){
  const name = document.getElementById("name").value.trim();
  const pw = document.getElementById("pw").value.trim();

  let users = getUsers();

  if(!users[name]){
    alert("User existiert nicht");
    return;
  }

  if(users[name] !== pw){
    alert("Passwort falsch");
    return;
  }

  localStorage.setItem("currentUser", name);

  startApp();
}

/* START APP */
function startApp(){
  document.getElementById("login").style.display = "none";
  document.getElementById("app").style.display = "block";

  loadCats();
}

/* AUTO LOGIN */
window.onload = () => {
  if(localStorage.getItem("currentUser")){
    startApp();
  }
};

/* LOGOUT */
function logout(){
  localStorage.removeItem("currentUser");
  location.reload();
}
