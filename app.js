/* CHECK LOGIN */
if(!localStorage.getItem("user")){
window.location.href="index.html";
}

/* DB */
const db={
"Schienen":[
{q:"Schienenformen?",a:["71b,60E1","nur 60E1","keine","nur 71b"],c:0}
]
};

let current="",quizData=[],i=0;

/* CATS */
function loadCats(){
cats.innerHTML="";

Object.keys(db).forEach(cat=>{
let div=document.createElement("div");
div.className="cat";
div.innerText=cat;
div.onclick=()=>openCat(cat);
cats.appendChild(div);
});
}

function openCat(c){
current=c;
mode.innerHTML=`
<button onclick="start()">Start</button>
<button onclick="loadCats()">Zurück</button>
`;
cats.style.display="none";
mode.classList.remove("hidden");
}

/* QUIZ */
function start(){
quizData=[...db[current]];
i=0;

mode.classList.add("hidden");
quiz.classList.remove("hidden");

load();
}

function load(){
if(i>=quizData.length){
alert("Fertig");
location.reload();
return;
}

let qd=quizData[i];
quiz.innerHTML=`<h2>${qd.q}</h2><div id="a"></div>`;

qd.a.forEach((x,ix)=>{
let b=document.createElement("div");
b.className="answer";
b.innerText=x;
b.onclick=()=>ans(ix,qd,b);
a.appendChild(b);
});
}

function ans(ix,qd,b){
b.classList.add(ix===qd.c?"correct":"wrong");
setTimeout(()=>{i++;load();},400);
}

/* LOGOUT */
function logout(){
localStorage.removeItem("user");
window.location.href="index.html";
}

loadCats();
