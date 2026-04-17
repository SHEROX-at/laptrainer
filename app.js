/* AUTH CHECK */
checkAuth();

/* GLOBAL */
let currentCategory = null;
let currentSub = null;
let questions = [];
let currentIndex = 0;
let score = { correct: 0, wrong: 0 };

/* LOAD DB */
const dbData = typeof db !== "undefined" ? db : {};

/* UI ROOT */
const root = document.querySelector(".grid");

/* -------------------- DASHBOARD -------------------- */

function renderDashboard() {
  root.innerHTML = `
    <div class="big-card" onclick="showCategories()">
      📚 Lernen
    </div>

    <div class="big-card" onclick="startExam()">
      🧠 Prüfung (alle Fragen)
    </div>

    <div class="big-card" onclick="openPDF()">
      📄 PDF ansehen
    </div>
  `;
}

/* -------------------- KATEGORIEN -------------------- */

function showCategories() {
  root.innerHTML = "";

  Object.keys(dbData).forEach(cat => {
    root.innerHTML += `
      <div class="big-card" onclick="showSubs('${cat}')">
        ${cat}
      </div>
    `;
  });

  addBack(renderDashboard);
}

/* -------------------- UNTERKATEGORIEN -------------------- */

function showSubs(cat) {
  currentCategory = cat;
  root.innerHTML = "";

  Object.keys(dbData[cat]).forEach(sub => {
    root.innerHTML += `
      <div class="big-card" onclick="startQuiz('${cat}','${sub}')">
        ${sub}
      </div>
    `;
  });

  addBack(showCategories);
}

/* -------------------- QUIZ START -------------------- */

function startQuiz(cat, sub) {
  currentCategory = cat;
  currentSub = sub;
  questions = dbData[cat][sub];
  currentIndex = 0;
  score = { correct: 0, wrong: 0 };

  showQuestion();
}

/* -------------------- FRAGE -------------------- */

function showQuestion() {
  if (currentIndex >= questions.length) {
    showResult();
    return;
  }

  const q = questions[currentIndex];

  root.innerHTML = `
    <div class="big-card">
      <h3>${q.q}</h3>

      ${q.a.map((ans, i) => `
        <button class="btn" onclick="answer(${i})">${ans}</button>
      `).join("")}
    </div>
  `;
}

/* -------------------- ANTWORT -------------------- */

function answer(i) {
  const q = questions[currentIndex];

  if (i === q.c) {
    score.correct++;
  } else {
    score.wrong++;
  }

  currentIndex++;
  showQuestion();
}

/* -------------------- ERGEBNIS -------------------- */

function showResult() {
  root.innerHTML = `
    <div class="big-card">
      <h2>Ergebnis</h2>
      <p>✅ Richtig: ${score.correct}</p>
      <p>❌ Falsch: ${score.wrong}</p>

      <button class="btn" onclick="showCategories()">Weiter</button>
    </div>
  `;
}

/* -------------------- PRÜFUNG (ALLE FRAGEN) -------------------- */

function startExam() {
  questions = [];

  Object.keys(dbData).forEach(cat => {
    Object.keys(dbData[cat]).forEach(sub => {
      questions.push(...dbData[cat][sub]);
    });
  });

  questions = shuffle(questions).slice(0, 80);

  currentIndex = 0;
  score = { correct: 0, wrong: 0 };

  showQuestion();
}

/* -------------------- UTIL -------------------- */

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function openPDF() {
  window.location.href = "pdf.html";
}

/* BACK BUTTON */
function addBack(fn) {
  root.innerHTML += `
    <button class="btn btn2" onclick="(${fn.toString()})()">⬅ Zurück</button>
  `;
}

/* INIT */
renderDashboard();
