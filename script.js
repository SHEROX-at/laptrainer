const el = {
login: document.getElementById("login"),
app: document.getElementById("app"),
user: document.getElementById("user"),
name: document.getElementById("name"),
pw: document.getElementById("pw")
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

if(!n || !p) return alert("Alles ausfüllen");

let users = getUsers();

if(users[n]) return alert("User existiert");

users[n] = p;
saveUsers(users);

alert("Registriert!");
}

/* LOGIN */
function login(){
let n = el.name.value.trim();
let p = el.pw.value.trim();

let users = getUsers();

if(users[n] !== p) return alert("Falsch");

localStorage.setItem("currentUser", n);
showApp();
}

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

function logout(){
localStorage.removeItem("currentUser");
location.reload();
}
