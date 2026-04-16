function show(view){
["cats","mode","quiz"].forEach(v=>{
const el = document.getElementById(v);
if(v === view){
el.classList.remove("hidden");
el.style.opacity = 0;
setTimeout(()=>{el.style.opacity = 1;},50);
} else {
el.classList.add("hidden");
}
});
}

/* KATEGORIEN */
function renderCats(){
const cats = document.getElementById("cats");
cats.innerHTML="";

Object.keys(db).forEach((cat,i)=>{
let s = stats[cat] || {c:0,t:0};
let p = s.t ? Math.round(s.c/s.t*100) : 0;

let div = document.createElement("div");
div.className="cat";

/* ANIMATION DELAY */
div.style.opacity=0;
div.style.transform="translateY(20px)";
setTimeout(()=>{
div.style.opacity=1;
div.style.transform="translateY(0)";
}, i*80);

div.innerHTML=`
<div>
<div style="font-weight:600">${cat}</div>
<div style="font-size:12px;color:#aaa">${s.c}/${s.t}</div>
</div>
<div class="circle">${p}%</div>
`;

div.onclick=()=>{
currentCat = cat;
renderMode();
};

cats.appendChild(div);
});

show("cats");
}

/* MODE */
function renderMode(){
const mode = document.getElementById("mode");

mode.innerHTML=`
<button onclick="start('all')">Alle Fragen</button>
<button onclick="start('wrong')">Nur falsche</button>
<button onclick="start('exam')">🔥 Prüfung</button>
<button onclick="goBack()">← Zurück</button>
`;

show("mode");
}
