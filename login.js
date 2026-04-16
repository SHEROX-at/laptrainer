const ACCESS_CODES = ["1234","LAP2026"];

function getUsers(){
return JSON.parse(localStorage.getItem("users")) || {};
}

function saveUsers(u){
localStorage.setItem("users", JSON.stringify(u));
}

function register(){
let n = name.value.trim();
let p = pw.value.trim();
let c = code.value.trim();

if(!n || !p || !c) return alert("Alles ausfüllen");
if(!ACCESS_CODES.includes(c)) return alert("Code falsch");

let users = getUsers();

if(users[n]) return alert("User existiert");

users[n] = p;
saveUsers(users);

alert("Registriert!");
}

function login(){
let n = name.value.trim();
let p = pw.value.trim();

let users = getUsers();

if(users[n] !== p) return alert("Falsch");

localStorage.setItem("user", n);

/* 👉 WEITERLEITUNG */
window.location.href = "app.html";
}
