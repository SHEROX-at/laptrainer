/* LOGIN CHECK */
if(!localStorage.getItem("user")){
window.location.href="index.html";
}

/* STATE */
let currentCat = null;
let quizData = [];
let index = 0;

let stats = JSON.parse(localStorage.getItem("stats")) || {};
let wrong = JSON.parse(localStorage.getItem("wrong")) || {};

/* START */
renderCats();

/* START QUIZ */
function start(type){
index = 0;

if(type==="exam"){
quizData=[];
Object.values(db).forEach(a=>quizData.push(...a));
quizData.sort(()=>Math.random()-0.5);
}
else if(type==="wrong"){
quizData = db[currentCat].filter(q=>wrong[q.q]);
}
else{
quizData = [...db[currentCat]];
}

renderQuiz();
}

/* QUIZ */
function renderQuiz(){
if(index >= quizData.length){
alert("Fertig!");
renderCats();
return;
}

let qd = quizData[index];

const quiz = document.getElementById("quiz");

quiz.innerHTML=`
<h2>${qd.q}</h2>
<div id="answers"></div>
<button onclick="goBack()">← Zurück</button>
`;

const answers = document.getElementById("answers");

qd.a.forEach((a,i)=>{
let div=document.createElement("div");
div.className="answer";
div.innerText=a;

div.onclick=()=>answer(i,qd,div);

answers.appendChild(div);
});

show("quiz");
}

/* ANSWER */
function answer(i,qd,el){
let s = stats[currentCat] || {c:0,t:0};
s.t++;

if(i===qd.c){
el.classList.add("correct");
s.c++;
delete wrong[qd.q];
}else{
el.classList.add("wrong");
wrong[qd.q]=true;
}

stats[currentCat]=s;

localStorage.setItem("stats",JSON.stringify(stats));
localStorage.setItem("wrong",JSON.stringify(wrong));

setTimeout(()=>{
index++;
renderQuiz();
},400);
}

/* 🔥 BACK FIX */
function goBack(){
const quiz = document.getElementById("quiz");
const mode = document.getElementById("mode");

if(!quiz.classList.contains("hidden")){
renderMode(); // von Quiz → Mode
}
else if(!mode.classList.contains("hidden")){
renderCats(); // von Mode → Kategorien
}
}
