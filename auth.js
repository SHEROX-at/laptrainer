const ACCESS_CODES = ["1234","LAP2026"];

function getUsers(){
return JSON.parse(localStorage.getItem("users")) || {};
}

function register(){
let n=name.value.trim();
let p=pw.value.trim();
let c=code.value.trim();

if(!ACCESS_CODES.includes(c)) return alert("Code falsch");

let u=getUsers();
u[n]=p;
localStorage.setItem("users",JSON.stringify(u));

alert("Registriert");
}

function login(){
let u=getUsers();

if(u[name.value]!==pw.value) return alert("Falsch");

localStorage.setItem("user",name.value);
window.location.href="app.html";
}
