const ACCESS_CODES=["1234","LAP2026"];

/* KATALOG (ECHTE THEMEN) */
const db={
"Oberbau - Schienen":[
{q:"Welche Schienenformen gibt es?",a:["71b,60E1,54E2,49E1","nur 60E1","keine","nur 71b"],c:0},
{q:"Was beinhaltet das Walzzeichen?",a:["Walzwerk, Stahlsorte, Walzjahr, Schienenform","nur Gewicht","nur Baujahr","keine"],c:0},
{q:"Welche Stahlsorten werden verwendet?",a:["R260,R350HT,R400HT","nur R260","keine","nur HSH"],c:0}
],

"Kleineisen":[
{q:"Was sind Kleineisen?",a:["Teile zur Befestigung der Schiene","nur Schrauben","nur Nägel","keine"],c:0}
],

"Weichen":[
{q:"Welche Funktion haben Weichen?",a:["Übergang zwischen Gleisen","nur stoppen","nur bremsen","keine"],c:0}
]
};

/* ELEMENTE */
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
catTitle:document.getElementById("catTitle"),
name:document.getElementById("name"),
pw:document.getElementById("pw"),
code:document.getElementById("code")
};

let stats=JSON.parse(localStorage.getItem("stats"))||{};
let wrong=JSON.parse(localStorage.getItem("wrong"))||{};

let current="",quizData=[],i=0;

/* USERS */
function getUsers(){return JSON.parse(localStorage.getItem("users"))||{};}
function saveUsers(u){localStorage.setItem("users",JSON.stringify(u));}

/* REGISTER */
function register(){
let n=el.name.value.trim();
let p=el.pw.value.trim();
let c=el.code.value.trim();

if(!n||!p||!c) return alert("Alles ausfüllen");
if(!ACCESS_CODES.includes(c)) return alert("Code falsch");

let u=getUsers();
if(u[n]) return alert("User existiert");

u[n]=p;
saveUsers(u);

alert("Registriert!");
}

/* LOGIN */
function login(){
let u=getUsers();
if(u[el.name.value]!==el.pw.value) return alert("Falsch");

localStorage.setItem("user",el.name.value);
startApp();
}

/* START */
function startApp(){
el.login.style.display="none";
el.app.style.display="block";
loadCats();
}

/* AUTO LOGIN */
if(localStorage.getItem("user")) startApp();

/* LOGOUT */
function logout(){
localStorage.clear();
location.reload();
}

/* KATEGORIEN */
function loadCats(){
el.cats.innerHTML="";

Object.keys(db).forEach(cat=>{
let s=stats[cat]||{c:0,t:0};
let p=s.t?Math.round(s.c/s.t*100):0;

let div=document.createElement("div");
div.className="cat";
div.innerHTML=`<span>${cat}</span><div class="circle">${p}%</div>`;
div.onclick=()=>openCat(cat);

el.cats.appendChild(div);
});
}

/* NAV */
function openCat(c){
current=c;
el.catTitle.innerText=c;
el.cats.classList.add("hidden");
el.mode.classList.remove("hidden");
}

function back(){location.reload();}

/* QUIZ */
function start(type){
i=0;

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

el.mode.classList.add("hidden");
el.quiz.classList.remove("hidden");

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
}

stats[current]=s;

localStorage.setItem("stats",JSON.stringify(stats));
localStorage.setItem("wrong",JSON.stringify(wrong));

setTimeout(()=>{i++;load();},400);
}