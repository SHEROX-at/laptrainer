const ACCESS_CODES = ["1234","LAP2026"];

/* USERS LADEN */
function getUsers(){
return JSON.parse(localStorage.getItem("users")) || {};
}

/* USERS SPEICHERN */
function saveUsers(users){
localStorage.setItem("users", JSON.stringify(users));
}

/* REGISTER */
function register(){
const nameInput = document.getElementById("name");
const pwInput = document.getElementById("pw");
const codeInput = document.getElementById("code");

const n = nameInput.value.trim();
const p = pwInput.value.trim();
const c = codeInput.value.trim();

/* VALIDATION */
if(!n || !p || !c){
alert("Bitte alles ausfüllen");
return;
}

if(!ACCESS_CODES.includes(c)){
alert("Code falsch");
return;
}

let users = getUsers();

if(users[n]){
alert("User existiert bereits");
return;
}

/* SPEICHERN */
users[n] = p;
saveUsers(users);

alert("Registriert! Jetzt einloggen");

/* FELDER LEEREN */
nameInput.value="";
pwInput.value="";
codeInput.value="";
}

/* LOGIN */
function login(){
const nameInput = document.getElementById("name");
const pwInput = document.getElementById("pw");

const n = nameInput.value.trim();
const p = pwInput.value.trim();

if(!n || !p){
alert("Bitte Daten eingeben");
return;
}

let users = getUsers();

/* CHECK */
if(!users[n]){
alert("User existiert nicht");
return;
}

if(users[n] !== p){
alert("Passwort falsch");
return;
}

/* LOGIN OK */
localStorage.setItem("user", n);

/* DEBUG */
console.log("Login erfolgreich:", n);

/* REDIRECT */
window.location.href = "app.html";
}
