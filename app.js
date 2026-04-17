const root = document.getElementById("root");

/* ---------- NAV ---------- */

function showMenu() {
  root.innerHTML = "";

  const grid = document.createElement("div");
  grid.className = "menu";

  grid.innerHTML = `
    <div class="card" onclick="showCategories()">📚 Lernen</div>
    <div class="card" onclick="startExam()">🧠 Prüfung</div>
    <div class="card" onclick="openPDF()">📄 PDF ansehen</div>
  `;

  root.appendChild(grid);
}

/* ---------- BACK BUTTON ---------- */

function addBack(fn) {
  const btn = document.createElement("button");
  btn.className = "back-btn";
  btn.innerText = "⬅ Zurück";
  btn.onclick = fn;

  root.appendChild(btn);
}

/* ---------- KATEGORIEN ---------- */

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

/* ---------- UNTERKATEGORIEN ---------- */

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

/* ---------- QUIZ ---------- */

let current = [];

function startQuiz(cat, sub) {
  current = db[cat][sub];
  let i = 0;
  let score = 0;

  function render() {
    root.innerHTML = "";

    if (i >= current.length) {
      root.innerHTML = `
        <div class="result">
          Ergebnis: ${score}/${current.length}
        </div>
      `;
      addBack(showCategories);
      return;
    }

    const q = current[i];

    const box = document.createElement("div");
    box.className = "question";

    box.innerHTML = `<h2>${q.q}</h2>`;

    q.a.forEach((ans, index) => {
      const btn = document.createElement("div");
      btn.className = "answer";
      btn.innerText = ans;

      btn.onclick = () => {
        if (index === q.c) score++;
        i++;
        render();
      };

      box.appendChild(btn);
    });

    root.appendChild(box);
  }

  render();
}

/* ---------- PRÜFUNG ---------- */

function startExam() {
  let all = [];

  Object.values(db).forEach(cat => {
    Object.values(cat).forEach(sub => {
      all = all.concat(sub);
    });
  });

  current = all.sort(() => Math.random() - 0.5).slice(0, 20);

  let i = 0;
  let score = 0;

  function render() {
    root.innerHTML = "";

    if (i >= current.length) {
      root.innerHTML = `
        <div class="result">
          Prüfung: ${score}/${current.length}
        </div>
      `;
      addBack(showMenu);
      return;
    }

    const q = current[i];

    const box = document.createElement("div");
    box.className = "question";

    box.innerHTML = `<h2>${q.q}</h2>`;

    q.a.forEach((ans, index) => {
      const btn = document.createElement("div");
      btn.className = "answer";
      btn.innerText = ans;

      btn.onclick = () => {
        if (index === q.c) score++;
        i++;
        render();
      };

      box.appendChild(btn);
    });

    root.appendChild(box);
  }

  render();
}

/* ---------- PDF ---------- */

function openPDF() {
  window.location.href = "pdf.html";
}

/* ---------- INIT ---------- */

showMenu();
