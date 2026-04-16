function setTitle(text){
document.getElementById("title").innerText = text;
}

function animate(el, delay=0){
el.style.opacity = 0;
el.style.transform = "translateY(20px)";
setTimeout(()=>{
el.style.opacity = 1;
el.style.transform = "translateY(0)";
}, delay);
}

/* MAIN */
function renderMain(){
view="main";
setTitle("Kategorien");

const c = document.getElementById("content");
c.innerHTML="";

Object.keys(db).forEach((cat,index)=>{
let div = document.createElement("div");
div.className="card";
div.innerText = cat;

div.onclick = ()=>{
currentMain = cat;
renderSub();
};

c.appendChild(div);
animate(div, index*80);
});
}

/* SUB */
function renderSub(){
view="sub";
setTitle(currentMain);

const c = document.getElementById("content");
c.innerHTML="";

Object.keys(db[currentMain]).forEach((sub,index)=>{
let div = document.createElement("div");
div.className="card";
div.innerText = sub;

div.onclick = ()=>{
currentSub = sub;
startQuiz(db[currentMain][sub]);
};

c.appendChild(div);
animate(div, index*80);
});

/* BACK */
let back = document.createElement("button");
back.innerText="← Zurück";
back.onclick=renderMain;
c.appendChild(back);
}
