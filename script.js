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
catTitle:document.getElementById("catTitle"),
name:document.getElementById("name"),
pw:document.getElementById("pw"),
code:document.getElementById("code")
};

let current="",quizData=[],i=0;

/* LOGIN */
function register(){
let u=JSON.parse(localStorage.getItem("users"))||{};
if(!ACCESS_CODES.includes(el.code.value)) return alert("Code falsch");
u[el.name.value]=el.pw.value;
localStorage.setItem("users",JSON.stringify(u));
alert("Registriert");
}

function login(){
let u=JSON.parse(localStorage.getItem("users"))||{};
if(u[el.name.value]!==el.pw.value) return alert("Falsch");
showApp();
}

function showApp(){
el.login.style.display="none";
el.app.style.display="block";
loadCats();
}

function logout(){location.reload();}

/* CATS */
function loadCats(){
el.cats.innerHTML="";
Object.keys(db).forEach(cat=>{
let div=document.createElement("div");
div.className="cat";
div.innerHTML=`<span>${cat}</span><div class="circle">0%</div>`;
div.onclick=()=>openCat(cat);
el.cats.appendChild(div);
});
}

/* NAV */
function openCat(c){
current=c;
el.catTitle.innerText=c;
el.mode.classList.remove("hidden");
el.cats.classList.add("hidden");
}

function back(){location.reload();}

/* QUIZ */
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
b.classList.add(ix===qd.c?"correct":"wrong");
setTimeout(()=>{i++;load();},300);
}
