const root = document.getElementById("root");

/* ========= STATE ========= */
let questions = [];
let currentIndex = 0;
let userAnswers = [];

/* ========= START ========= */
function startQuiz(cat, sub) {
  questions = shuffle([...db[cat][sub]]);
  currentIndex = 0;
  userAnswers = [];

  showQuestion();
}

/* ========= SHOW QUESTION ========= */
function showQuestion() {
  root.innerHTML = "";

  const q = questions[currentIndex];

  // Antworten mischen + richtige merken
  const answers = shuffle(
    q.a.map((text, i) => ({
      text,
      correct: i === q.c
    }))
  );

  const selected = new Set();

  const box = document.createElement("div");
  box.className = "question";

  box.innerHTML = `<h2>${q.q}</h2>`;

  answers.forEach((ans, i) => {
    const btn = document.createElement("div");
    btn.className = "answer";
    btn.innerText = ans.text;

    btn.onclick = () => {
      if (selected.has(i)) {
        selected.delete(i);
        btn.style.background = "";
      } else {
        selected.add(i);
        btn.style.background = "#7c3aed";
      }
    };

    box.appendChild(btn);
  });

  const next = document.createElement("button");
  next.className = "btn";
  next.innerText = "Weiter";

  next.onclick = () => {
    // speichern
    userAnswers.push({
      question: q.q,
      answers: answers,
      selected: [...selected]
    });

    currentIndex++;

    if (currentIndex >= questions.length) {
      showResult();
    } else {
      showQuestion();
    }
  };

  root.appendChild(box);
  root.appendChild(next);
}

/* ========= RESULT ========= */
function showResult() {
  root.innerHTML = "<h2>Ergebnis</h2>";

  userAnswers.forEach((q, idx) => {
    const block = document.createElement("div");
    block.className = "result-block";

    let html = `<h3>${idx + 1}. ${q.question}</h3>`;

    q.answers.forEach((a, i) => {
      const isSelected = q.selected.includes(i);

      let color = "";
      if (a.correct && isSelected) color = "green";
      else if (!a.correct && isSelected) color = "red";
      else if (a.correct) color = "lightgreen";

      html += `<div style="color:${color}">${a.text}</div>`;
    });

    block.innerHTML = html;
    root.appendChild(block);
  });

  const back = document.createElement("button");
  back.className = "btn";
  back.innerText = "Zurück";
  back.onclick = showMenu;

  root.appendChild(back);
}
