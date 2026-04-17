export const data = [
  {
    name: "Oberbau",
    id: "oberbau",
    subcategories: [
      {
        name: "Schienen",
        id: "schienen",
        questions: [
          {
            question: "Welche Schienenformen kennen Sie und nennen sie die Abmessungen?",
            answers: [
              { text: "71b, 60E1, 54E2, 49E1, A, 35E1", correct: true },
              { text: "Nur 60E1 und 49E1", correct: false },
              { text: "Nur Betonformen", correct: false }
            ]
          },
          {
            question: "Welche Stahlsorten werden derzeit bei den ÖBB verwendet?",
            answers: [
              { text: "R260, R350HT, R400HT", correct: true },
              { text: "Nur R100", correct: false },
              { text: "Aluminium", correct: false }
            ]
          }
        ]
      },
      {
        name: "Kleineisen",
        id: "kleineisen",
        questions: [
          {
            question: "Was versteht man unter Kleineisen?",
            answers: [
              { text: "Teile zur Befestigung der Schiene", correct: true },
              { text: "Nur Schrauben", correct: false },
              { text: "Nur Schwellen", correct: false }
            ]
          }
        ]
      }
    ]
  },

  {
    name: "Unterbau",
    id: "unterbau",
    subcategories: [
      {
        name: "Eisenbahnkreuzungen",
        id: "ek",
        questions: [
          {
            question: "Welche Rillenweite muss eingehalten werden?",
            answers: [
              { text: "60–85 mm", correct: true },
              { text: "10 mm", correct: false },
              { text: "200 mm", correct: false }
            ]
          }
        ]
      }
    ]
  }
];
