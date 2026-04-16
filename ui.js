function renderMain(){
console.log("renderMain läuft");

const c = document.getElementById("content");

if(!c){
alert("❌ content div fehlt!");
return;
}

c.innerHTML="";

Object.keys(db).forEach(cat=>{
let div = document.createElement("div");
div.className="card";
div.innerText = cat;

div.onclick = ()=>{
currentMain = cat;
renderSub();
};

c.appendChild(div);
});

/* FALLBACK */
if(Object.keys(db).length === 0){
c.innerHTML = "❌ Keine Kategorien gefunden";
}
}

/* SUB */
function renderSub(){
const c = document.getElementById("content");
c.innerHTML="";

Object.keys(db[currentMain]).forEach(sub=>{
let div = document.createElement("div");
div.className="card";
div.innerText = sub;

div.onclick = ()=>{
startQuiz(db[currentMain][sub]);
};

c.appendChild(div);
});

let back = document.createElement("button");
back.innerText="← Zurück";
back.onclick=renderMain;
c.appendChild(back);
}
