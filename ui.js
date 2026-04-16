function renderMain(){
const c = document.getElementById("content");
c.innerHTML = "";

Object.keys(db).forEach((cat,index)=>{

let s = stats[cat] || {correct:0,wrong:0,total:0};

let correct = s.correct;
let wrong = s.wrong;
let total = s.total || 1;

let unanswered = Math.max(total - correct - wrong,0);

/* WINKEL */
let degCorrect = (correct/total)*360;
let degWrong = (wrong/total)*360;

/* KREIS */
let circle = `
<div class="circle" style="
background:conic-gradient(
#22c55e 0deg ${degCorrect}deg,
#ef4444 ${degCorrect}deg ${degCorrect+degWrong}deg,
#111827 ${degCorrect+degWrong}deg 360deg
);
">
${Math.round((correct/total)*100)}%
</div>
`;

let div = document.createElement("div");
div.className="card-item";

div.innerHTML = `
<div>
<div style="font-weight:600">${cat}</div>
<div style="font-size:12px;color:#aaa">${correct}/${total}</div>
</div>
${circle}
`;

div.onclick = ()=>{
currentMain = cat;
renderSub();
};

c.appendChild(div);

/* ANIMATION */
setTimeout(()=>div.classList.add("show"),index*100);

});
}

/* SUB */
function renderSub(){
const c = document.getElementById("content");
c.innerHTML = "";

Object.keys(db[currentMain]).forEach((sub,index)=>{

let div = document.createElement("div");
div.className="card-item";
div.innerText = sub;

div.onclick = ()=>{
startQuiz(db[currentMain][sub]);
};

c.appendChild(div);
setTimeout(()=>div.classList.add("show"),index*100);

});

let back = document.createElement("button");
back.innerText="← Zurück";
back.onclick = renderMain;

c.appendChild(back);
}
