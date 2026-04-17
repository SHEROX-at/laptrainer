/* LOGIN CHECK */
if(!localStorage.getItem("user")){
window.location.href="index.html";
}

window.onload=()=>{
renderMain();
};

/* QUIZ */
function startQuiz(data){
quiz = [...data];
i = 0;
renderQuiz();
}

/* PRÜFUNG */
function startExam(){
quiz = [];

Object.values(db).forEach(subs=>{
Object.values(subs).forEach(arr=>{
quiz.push(...arr);
});
});

quiz.sort(()=>Math.random()-0.5);
i = 0;

renderQuiz();
}

/* RENDER QUIZ */
function renderQuiz(){
const c=document.getElementById("content");

if(i>=quiz.length){
alert("Fertig");
renderMain();
return;
}

let qd=quiz[i];

c.innerHTML=`
<h2>${qd.q}</h2>
<div id="answers"></div>
<button onclick="renderMain()">← Zurück</button>
`;

const a=document.getElementById("answers");

qd.a.forEach((x,ix)=>{
let div=document.createElement("div");
div.className="answer";
div.innerText=x;

div.onclick=()=>{

let cat=currentMain;

if(!stats[cat]){
stats[cat]={correct:0,wrong:0,total:0};
}

stats[cat].total++;

if(ix===qd.c){
div.classList.add("correct");
stats[cat].correct++;
}else{
div.classList.add("wrong");
stats[cat].wrong++;
}

function openPDF() {
  window.location.href = "pdf.html";
}
  
localStorage.setItem("stats",JSON.stringify(stats));

setTimeout(()=>{
i++;
renderQuiz();
},400);
};

a.appendChild(div);
});
}
