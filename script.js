const ACCESS_CODES = ["1234","LAP2026"];

const db={
"Streckenausrüstung":[
{q:"Abstand zweigleisig?",a:["50","100","200","500"],c:1},
{q:"Abstand eingleisig?",a:["100","150","200","300"],c:2}
],
"Schienen":[
{q:"Schienenformen?",a:["71b,60E1...","nur 60E1","keine","nur 71b"],c:0}
]
};

const el={
login:document.getElementById("login"),
app:document.getElementById("app"),
user:document.getElementById("user"),
cats:document.getElementById("cats"),
mode:document.getElementById("mode"),
quiz:document.getElementById("quiz"),
q:document.getElementById("q"),
answers:document.getElementById("answers"),
progress:document.getElementById("progress"),
bar:document.getElementById("bar"),
bigCircle:document.getElementById("bigCircle"),
stats:document.getElementById("stats"),
name:document.getElementById("name"),
pw:document.getElementById("pw"),
code:document.getElementById("code")
};

let stats=JSON.parse(localStorage.getItem("stats"))||{};
let wrong=JSON.parse(localStorage.getItem("wrong"))||{};

/* USERS */
function getUsers(){return JSON.parse(localStorage.getItem("users"))||{};}
function saveUsers(u){localStorage.setItem("users",JSON.stringify(u));}

/* REGISTER */
function register(){
let n=el.name.value.trim();
let p=el.pw.value.trim();
let c=el.code.value.trim();

if(!ACCESS_CODES.includes(c)) return alert("Code falsch");

let users=getUsers();
users[n]=p;
saveUsers(users);

alert("Registriert!");
}

/* LOGIN */
function login(){
let n=el.name.value.trim();
let p=el.pw.value.trim();

let users=getUsers();
if(users[n]!==p) return alert("Falsch");

localStorage.setItem("currentUser",n);
showApp();
}

function showApp(){
el.login.style.display="none";
el.app.style.display="block";
el.user.innerText=localStorage.getItem("currentUser");
loadCats();
updateStats();
}

window.onload=()=>{
if(localStorage.getItem("currentUser")) showApp();
};

function logout(){
localStorage.clear();
location.reload();
}

/* DASHBOARD */
function updateStats(){
let total=0,correct=0;

Object.values(stats).forEach(s=>{
total+=s.t||0;
correct+=s.c||0;
});

let percent=total?Math.round(correct/total*100):0;

el.stats.innerText=`${correct}/${total} richtig`;

setTimeout(()=>{
el.bigCircle.style.background=`conic-gradient(#7c3aed ${percent}%, #1f2937 ${percent}%)`;
el.bigCircle.innerText=percent+"%";
},100);
}

/* CATEGORIES MIT ANIMATION */
function loadCats(){
el.cats.innerHTML="";

Object.keys(db).forEach(cat=>{
let s=stats[cat]||{c:0,t:0};
let p=s.t?Math.round(s.c/s.t*100):0;

let div=document.createElement("div");
div.className="cat";
div.onclick=()=>openCat(cat);

let circle=document.createElement("div");
circle.className="circle";
circle.innerText="0%";

/* SMOOTH ANIMATION */
setTimeout(()=>{
circle.style.background=`conic-gradient(#7c3aed ${p}%, #1f2937 ${p}%)`;
circle.innerText=p+"%";
},150);

div.innerHTML=`<div>${cat}</div>`;
div.appendChild(circle);

el.cats.appendChild(div);
});
}

let current="",quizData=[],i=0,fail=0;

function openCat(c){
current=c;
el.cats.style.display="none";
el.mode.style.display="block";
}

function start(type){
i=0;fail=0;

if(type==="exam"){
quizData=[];
Object.values(db).forEach(a=>quizData.push(...a));
quizData=quizData.sort(()=>Math.random()-0.5).slice(0,80);
}
else if(type==="wrong"){
quizData=db[current].filter(q=>wrong[q.q]);
}
else{
quizData=[...db[current]];
}

el.mode.style.display="none";
el.quiz.style.display="block";

load();
}

function load(){
if(i>=quizData.length){
alert("Fertig");
location.reload();
return;
}

let qd=quizData[i];
el.q.innerText=qd.q;
el.answers.innerHTML="";

qd.a.forEach((x,ix)=>{
let b=document.createElement("div");
b.className="answer";
b.innerText=x;
b.onclick=()=>answer(ix,b,qd);
el.answers.appendChild(b);
});

el.progress.innerText=(i+1)+"/"+quizData.length;
el.bar.style.width=(i/quizData.length*100)+"%";
}

function answer(ix,b,qd){
let s=stats[current]||{c:0,t:0};
s.t++;

if(ix===qd.c){
b.classList.add("correct");
s.c++;
delete wrong[qd.q];
}else{
b.classList.add("wrong");
wrong[qd.q]=true;
fail++;
}

stats[current]=s;

localStorage.setItem("stats",JSON.stringify(stats));
localStorage.setItem("wrong",JSON.stringify(wrong));

setTimeout(()=>{i++;load();},400);
}

function home(){
location.reload();
}
