const ACCESS_CODES = ["1234","LAP2026"];

/* DEBUG HELFER */
function logUsers(){
console.log("USERS:", localStorage.getItem("users"));
}

/* USERS HOLEN */
function getUsers(){
try{
return JSON.parse(localStorage.getItem("users")) || {};
}catch(e){
return {};
}
}

/* USERS SPEICHERN */
function saveUsers(users){
localStorage.setItem("users", JSON.stringify(users));
logUsers();
}

/* REGISTER */
function register(){
const n = document.getElementById("name").value.trim();
const p = document.getElementById("pw").value.trim();
const c = document.getElementById("code").value.trim();

console.log("REGISTER:", n,p,c);

/* CHECKS */
if(!n || !p || !c){
alert("Alles ausfüllen");
return;
}

if(!ACCESS_CODES.includes(c)){
alert("Code falsch");
return;
}

let users = getUsers();

/* DEBUG */
console.log("Vorher:", users);

if(users[n]){
alert("User existiert bereits");
return;
}

/* SPEICHERN */
users[n] = p;
saveUsers(users);

/* TEST */
let test = getUsers();

if(!test[n]){
alert("FEHLER beim Speichern!");
return;
}

alert("Registrierung erfolgreich!");

/* FELDER RESET */
document.getElementById("name").value="";
document.getElementById("pw").value="";
document.getElementById("code").value="";
}

/* LOGIN */
function login(){
const n = document.getElementById("name").value.trim();
const p = document.getElementById("pw").value.trim();

console.log("LOGIN:", n,p);

let users = getUsers();

/* DEBUG */
console.log("Gespeicherte User:", users);

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

alert("Login erfolgreich!");

window.location.href = "app.html";
}
