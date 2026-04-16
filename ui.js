function show(view){
["cats","mode","quiz"].forEach(v=>{
document.getElementById(v).classList.add("hidden");
});
document.getElementById(view).classList.remove("hidden");
}

function renderCats(){
const cats = document.getElementById("cats");
cats.innerHTML="";

Object.keys(db).forEach(cat=>{
let s = stats[cat] || {c:0,t:0};
let p = s.t ? Math.round(s.c/s.t*100) : 0;

let div = document.createElement("div");
div.className="cat";

div.innerHTML=`
<div>
<div>${cat}</div>
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
}

function renderMode(){
const mode = document.getElementById("mode");

mode.innerHTML=`
<button onclick="start('all')">Alle Fragen</button>
<button onclick="start('wrong')">Nur falsche</button>
<button onclick="start('exam')">Prüfung</button>
<button onclick="renderCats()">Zurück</button>
`;

show("mode");
}
