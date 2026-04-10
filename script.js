const ACCESS_CODES=["1234","LAP2026"];

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
cats:document.getElementById("cats"),
mode:document.getElementById("mode"),
quiz:document.getElementById("quiz"),
q:document.getElementById("q"),
answers:document.getElementById("answers"),
progress:document.getElementById("progress"),
bar:document.getElementById("bar"),
title:document.getElementById("title"),
name:document.getElementById("name"),
pw:document.getElementById("pw"),
code:document.getElementById("code")
};

let stats=JSON.parse(localStorage.getItem("stats"))||{};
let wrong=JSON.parse(localStorage.getItem("wrong"))||{};

/* LOGIN */
function register(){
let n=el.name.value,p=el.pw.value,c=el.code.value;
if(!ACCESS_CODES.includes(c)) return alert("Code falsch");

let u=JSON.parse(localStorage.getItem("users"))||{};
u[n]=p;
localStorage.setItem("users",JSON.stringify(u));
alert("Registriert");
}

function login(){
let n=el.name.value,p=el.pw.value;
let u=JSON.parse(localStorage.getItem("users"))||{};
if(u[n]!==p) return alert("Falsch");

localStorage.setItem("user",n);
showApp();
}

function showApp(){
el.login.style.display="none";
el.app.style.display="block";
loadCats();
}

/* CATS */
function loadCats(){
el.cats.innerHTML="";
el.title.innerText="Kategorien";

Object.keys(db).forEach(cat=>{
let s=stats[cat]||{c:0,t:0};
let p=s.t?Math.round(s.c/s.t*100):0;

let div=document.createElement("div");
div.className="cat";
div.onclick=()=>openCat(cat);

div.innerHTML=`
<div>${cat}</div>
<div class="circle">${p}%</div>
`;

el.cats.appendChild(div);
});
}

/* NAV */
function openCat(c){
current=c;
el.cats.classList.add("hidden");
el.mode.classList.remove("hidden");
el.title.innerText=c;
}

function back(){
location.reload();
}

/* QUIZ */
let current="",quizData=[],i=0;

function start(type){
i=0;

if(type==="exam"){
quizData=[];
Object.values(db).forEach(a=>quizData.push(...a));
quizData=quizData.sort(()=>Math.random()-0.5).slice(0,80);
}else{
quizData=[...db[current]];
}

el.mode.classList.add("hidden");
el.quiz.classList.remove("hidden");

load();
}

function load(){
if(i>=quizData.length){alert("Fertig");location.reload();return;}

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
if(ix===qd.c) b.classList.add("correct");
else b.classList.add("wrong");

setTimeout(()=>{i++;load();},300);
}
