/* ROOT */
const root = document.getElementById("app");

/* DATABASE */
const dbData = typeof db !== "undefined" ? db : {};

/* ---------------- DASHBOARD ---------------- */

function renderDashboard() {
  root.innerHTML = `
    <div class="big-card" onclick="showCategories()">📚 Lernen</div>
    <div class="big-card" onclick="startExam()">🧠 Prüfung</div>
    <div class="big-card" onclick="openPDF()">📄 PDF</div>
  `;
}

/* ---------------- KATEGORIEN ---------------- */

function showCategories() {
  root.innerHTML = "";

  Object.keys(dbData).forEach(cat => {
    root.innerHTML += `
      <div class="big-card" onclick="showSubs('${cat}')">${cat}</div>
    `;
  });

  addBack(renderDashboard);
}

/* ---------------- UNTERKATEGORIEN ---------------- */

function showSubs(cat) {
  root.innerHTML = "";

  Object.keys(dbData[cat]).forEach(sub => {
    root.innerHTML += `
      <div class="big-card" onclick="startQuiz('${cat}','${sub}')">${sub}</div>
    `;
  });

  addBack(showCategories);
}

/* ---------------- QUIZ ---------------- */

let questions = [];
let index = 0;
let correct = 0;
let wrong = 0;

function startQuiz(cat, sub) {
  questions = dbData[cat][sub];
  index = 0;
  correct = 0;
  wrong = 0;

  showQuestion();
}

function showQuestion() {
  if (index >= questions.length) {
    showResult();
    return;
  }

  const q = questions[index];

  root.innerHTML = `
    <div class="big-card">
      <h3>${q.q}</h3>

      ${q.a.map((a,i)=>`
        <button class="btn" onclick="answer(${i})">${a}</button>
      `).join("")}
    </div>
  `;
}

function answer(i) {
  if (i === questions[index].c) correct++;
  else wrong++;

  index++;
  showQuestion();
}

function showResult() {
  root.innerHTML = `
    <div class="big-card">
      <h2>Ergebnis</h2>
      <p>✅ ${correct}</p>
      <p>❌ ${wrong}</p>
      <button class="btn" onclick="renderDashboard()">Zurück</button>
    </div>
  `;
}

/* ---------------- PRÜFUNG ---------------- */

function startExam() {
  questions = [];

  Object.keys(dbData).forEach(cat => {
    Object.keys(dbData[cat]).forEach(sub => {
      questions.push(...dbData[cat][sub]);
    });
  });

  questions = shuffle(questions).slice(0, 80);

  index = 0;
  correct = 0;
  wrong = 0;

  showQuestion();
}

/* ---------------- UTIL ---------------- */

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function openPDF() {
  window.location.href = "pdf.html";
}

function addBack(fn) {
  root.innerHTML += `
    <button class="btn" onclick="(${fn.toString()})()">⬅ Zurück</button>
  `;
}

/* ---------------- INIT ---------------- */

document.addEventListener("DOMContentLoaded", () => {
  renderDashboard();
});
