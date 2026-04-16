const ACCESS_CODES = ["1234","LAP2026"];

function getUsers(){
return JSON.parse(localStorage.getItem("users")) || {};
}

function saveUsers(u){
localStorage.setItem("users", JSON.stringify(u));
}

function register(){
let n = document.getElementById("name").value.trim();
let p = document.getElementById("pw").value.trim();
let c = document.getElementById("code").value.trim();

if(!n || !p || !c) return alert("Alles ausfüllen");
if(!ACCESS_CODES.includes(c)) return alert("Code falsch");

let users = getUsers();
if(users[n]) return alert("User existiert");

users[n] = p;
saveUsers(users);

alert("Registriert!");
}

function login(){
let n = document.getElementById("name").value.trim();
let p = document.getElementById("pw").value.trim();

let users = getUsers();

if(users[n] !== p) return alert("Falsch");

localStorage.setItem("user", n);
window.location.href = "app.html";
}

function logout(){
localStorage.removeItem("user");
window.location.href = "index.html";
}
