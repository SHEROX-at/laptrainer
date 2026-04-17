const root = document.getElementById("root");

/* ========= SAFE START ========= */
window.onload = () => {
  try {
    initApp();
  } catch (e) {
    console.error(e);
    root.innerHTML = "❌ Fehler beim Laden der App";
  }
};

function initApp() {
  if (typeof db === "undefined") {
    root.innerHTML = "❌ data.js fehlt oder kaputt";
    return;
  }

  if (Object.keys(db).length === 0) {
    root.innerHTML = "❌ Keine Daten vorhanden";
    return;
  }

  showMenu();
}

/* ========= MENU ========= */
function showMenu() {
  root.innerHTML = "";

  const container = document.createElement("div");
  container.className = "menu";

  container.innerHTML = `
    <div class="card">📚 Lernen</div>
    <div class="card">🧠 Prüfung</div>
    <div class="card">📄 PDF ansehen</div>
  `;

  const cards = container.querySelectorAll(".card");

  cards[0].onclick = showCategories;
  cards[1].onclick = startExam;
  cards[2].onclick = openPDF;

  root.appendChild(container);
}

/* ========= BACK BUTTON ========= */
function addBack(fn) {
  const btn = document.createElement("button");
  btn.className = "back-btn";
  btn.innerText = "⬅ Zurück";
  btn.onclick = fn;
  root.appendChild(btn);
}

/* ========= KATEGORIEN ========= */
function showCategories() {
  root.innerHTML = "";

  Object.keys(db).forEach(cat => {
    const el = document.createElement("div");
    el.className = "card";
    el.innerText = cat;
    el.onclick = () => showSub(cat);
    root.appendChild(el);
  });

  addBack(showMenu);
}

/* ========= SUB ========= */
function showSub(cat) {
  root.innerHTML = "";

  Object.keys(db[cat]).forEach(sub => {
    const el = document.createElement("div");
    el.className = "card";
    el.innerText = sub;
    el.onclick = () => startQuiz(cat, sub);
    root.appendChild(el);
  });

  addBack(showCategories);
}

/* ========= SHUFFLE ========= */
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

/* ========= QUIZ ========= */
let questions = [];
let index = 0;
let results = [];

function startQuiz(cat, sub) {
  questions = shuffle([...db[cat][sub]]);
  index = 0;
  results = [];
  renderQuestion();
}

function renderQuestion() {
  root.innerHTML = "";

  const q = questions[index];

  const answers = shuffle(
    q.a.map((a, i) => ({
      text: a,
      correct: i === q.c
    }))
  );

  const selected = new Set();

  const box = document.createElement("div");
  box.className = "question";

  box.innerHTML = `<h2>${q.q}</h2>`;

  answers.forEach((ans, i) => {
    const el = document.createElement("div");
    el.className = "answer";
    el.innerText = ans.text;

    el.onclick = () => {
      if (selected.has(i)) {
        selected.delete(i);
        el.style.background = "";
      } else {
        selected.add(i);
        el.style.background = "#7c3aed";
      }
    };

    box.appendChild(el);
  });

  const btn = document.createElement("button");
  btn.className = "btn";
  btn.innerText = "Weiter";

  btn.onclick = () => {
    results.push({
      question: q.q,
      answers,
      selected: [...selected]
    });

    index++;

    if (index >= questions.length) {
      showResults();
    } else {
      renderQuestion();
    }
  };

  root.appendChild(box);
  root.appendChild(btn);
}

/* ========= RESULTS ========= */
function showResults() {
  root.innerHTML = "<h2>Ergebnis</h2>";

  results.forEach((r, i) => {
    const div = document.createElement("div");
    div.className = "result-block";

    let html = `<h3>${i + 1}. ${r.question}</h3>`;

    r.answers.forEach((a, j) => {
      let color = "";

      if (a.correct && r.selected.includes(j)) color = "green";
      else if (!a.correct && r.selected.includes(j)) color = "red";
      else if (a.correct) color = "lightgreen";

      html += `<div style="color:${color}">${a.text}</div>`;
    });

    div.innerHTML = html;
    root.appendChild(div);
  });

  addBack(showMenu);
}

/* ========= PRÜFUNG ========= */
function startExam() {
  let all = [];

  Object.values(db).forEach(cat => {
    Object.values(cat).forEach(sub => {
      all = all.concat(sub);
    });
  });

  questions = shuffle(all);
  index = 0;
  results = [];

  renderQuestion();
}

/* ========= PDF ========= */
function openPDF() {
  window.location.href = "pdf.html";
}
