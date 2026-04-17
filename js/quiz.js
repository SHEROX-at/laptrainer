let current = 0;
let score = [];
let shuffled = shuffle([...questions]);

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  const q = shuffled[current];

  document.getElementById("question").innerText = q.q;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  let answers = shuffle(q.a.map((text, i) => ({
    text,
    correct: i === q.c
  })));

  answers.forEach(a => {
    const btn = document.createElement("button");
    btn.innerText = a.text;

    btn.onclick = () => {
      if (a.correct) {
        btn.classList.add("correct");
        score.push(true);
      } else {
        btn.classList.add("wrong");
        score.push(false);
      }
    };

    answersDiv.appendChild(btn);
  });
}

function nextQuestion() {
  current++;

  if (current >= shuffled.length) {
    localStorage.setItem("result", JSON.stringify(score));
    window.location.href = "result.html";
    return;
  }

  loadQuestion();
}

if (document.getElementById("question")) {
  loadQuestion();
}

// RESULT
if (document.getElementById("result")) {
  const res = JSON.parse(localStorage.getItem("result")) || [];
  document.getElementById("result").innerText =
    "Richtig: " + res.filter(x => x).length +
    " / " + res.length;
}
