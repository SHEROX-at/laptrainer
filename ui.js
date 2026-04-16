function renderMain(){
const c=document.getElementById("content");
c.innerHTML="";

Object.keys(db).forEach((cat,index)=>{
let div=document.createElement("div");
div.className="card-item";
div.innerText=cat;

div.onclick=()=>{
currentMain=cat;
renderSub();
};

c.appendChild(div);

setTimeout(()=>div.classList.add("show"),index*100);
});
}

function renderSub(){
const c=document.getElementById("content");
c.innerHTML="";

Object.keys(db[currentMain]).forEach((sub,index)=>{
let div=document.createElement("div");
div.className="card-item";
div.innerText=sub;

div.onclick=()=>{
startQuiz(db[currentMain][sub]);
};

c.appendChild(div);
setTimeout(()=>div.classList.add("show"),index*100);
});

let back=document.createElement("button");
back.innerText="← Zurück";
back.onclick=renderMain;
c.appendChild(back);
}
