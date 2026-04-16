const ACCESS_CODES = ["1234","LAP2026"];

function getUsers(){
return JSON.parse(localStorage.getItem("users")) || {};
}

function saveUsers(users){
localStorage.setItem("users", JSON.stringify(users));
}

function register(){
const n = document.getElementById("name").value.trim();
const p = document.getElementById("pw").value.trim();
const c = document.getElementById("code").value.trim();

if(!n || !p || !c){
alert("Alles ausfüllen");
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

users[n] = p;
saveUsers(users);

/* 🔥 AUTO LOGIN */
localStorage.setItem("user", n);

window.location.href = "app.html";
}

function login(){
const n = document.getElementById("name").value.trim();
const p = document.getElementById("pw").value.trim();

let users = getUsers();

if(!users[n]){
alert("User existiert nicht");
return;
}

if(users[n] !== p){
alert("Passwort falsch");
return;
}

localStorage.setItem("user", n);
window.location.href = "app.html";
}
