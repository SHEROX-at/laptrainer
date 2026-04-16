/* START */
renderMain();

/* QUIZ START */
function startQuiz(data){
quiz = [...data];
i = 0;
renderQuiz();
}

/* PRÜFUNG (ALLE KATEGORIEN) */
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

/* QUIZ */
function renderQuiz(){
view="quiz";

if(i >= quiz.length){
alert("Fertig!");
renderMain();
return;
}

const qd = quiz[i];
const c = document.getElementById("content");

c.innerHTML = `
<div class="progress">
<div class="bar" style="width:${(i/quiz.length)*100}%"></div>
</div>

<h2>${qd.q}</h2>
<div id="answers"></div>
<button onclick="goBack()">← Zurück</button>
`;

const answers = document.getElementById("answers");

qd.a.forEach((a,index)=>{
let div = document.createElement("div");
div.className="answer";
div.innerText=a;

div.onclick=()=>{
handleAnswer(index, qd, div);
};

answers.appendChild(div);
});
}

/* ANSWER */
function handleAnswer(index,qd,el){
if(index===qd.c){
el.classList.add("correct");
}else{
el.classList.add("wrong");
}

setTimeout(()=>{
i++;
renderQuiz();
},400);
}

/* BACK */
function goBack(){
if(view==="quiz"){
renderSub();
}
else{
renderMain();
}
}
