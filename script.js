/* 🔐 DEIN CODE */
const ACCESS_CODES = ["1234", "LAP2026"]; // hier kannst du Codes ändern

const el = {
login: document.getElementById("login"),
app: document.getElementById("app"),
user: document.getElementById("user"),
name: document.getElementById("name"),
pw: document.getElementById("pw"),
code: document.getElementById("code")
};

/* USERS */
function getUsers(){
return JSON.parse(localStorage.getItem("users")) || {};
}

function saveUsers(u){
localStorage.setItem("users", JSON.stringify(u));
}

/* REGISTER */
function register(){
let n = el.name.value.trim();
let p = el.pw.value.trim();
let c = el.code.value.trim();

if(!n || !p || !c) return alert("Alles ausfüllen");

/* CODE CHECK */
if(!ACCESS_CODES.includes(c)) return alert("Code falsch");

let users = getUsers();

if(users[n]) return alert("User existiert");

users[n] = p;
saveUsers(users);

alert("Registriert! Jetzt einloggen.");
}

/* LOGIN */
function login(){
let n = el.name.value.trim();
let p = el.pw.value.trim();

let users = getUsers();

if(users[n] !== p) return alert("Falsche Daten");

localStorage.setItem("currentUser", n);
showApp();
}

/* APP */
function showApp(){
el.login.style.display="none";
el.app.style.display="block";
el.user.innerText = localStorage.getItem("currentUser");
}

/* AUTO LOGIN */
window.onload = () => {
let u = localStorage.getItem("currentUser");
if(u) showApp();
};

/* LOGOUT */
function logout(){
localStorage.removeItem("currentUser");
location.reload();
}
