const db = firebase.firestore();

let questions = [
  {
    q: "Was sind Kleineisen?",
    a: ["Befestigung", "nur Schrauben", "nur Nägel", "keine"],
    correct: [0]
  }
];

let current = 0;
let answers = [];

function startQuiz() {
  current = 0;
  answers = [];
  showQuestion();
}

function showQuestion() {
  const q = questions[current];

  document.getElementById("quiz").innerHTML = `
    <h3>${q.q}</h3>
    ${q.a.map((a,i)=>`
      <div onclick="select(${i})" class="option">${a}</div>
    `).join("")}
    <button onclick="next()">Weiter</button>
  `;
}

function select(i){
  answers[current] = i;
}

function next(){
  current++;
  if(current < questions.length){
    showQuestion();
  } else {
    finish();
  }
}

function finish(){
  let correct = 0;

  questions.forEach((q,i)=>{
    if(q.correct.includes(answers[i])) correct++;
  });

  document.getElementById("quiz").innerHTML = `
    <h2>Ergebnis: ${correct}/${questions.length}</h2>
  `;

  saveProgress(correct);
}

function saveProgress(score){
  const user = firebase.auth().currentUser;

  db.collection("results").add({
    user: user.email,
    score: score,
    date: new Date()
  });
}
