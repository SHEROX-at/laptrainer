const db = {

"1. Themengebiet Oberbau": {

  "1.1 | Schienen":[

    {q:"Welche Schienenformen kennen Sie und nennen sie die Abmessungen?",
    a:[
    "71b, 60E1, 54E2, 49E1, A, 35E1",
    "nur 60E1 und 54E2",
    "nur 71b",
    "keine genormten Schienenformen"
    ],
    c:0},

    {q:"Welche Stahlsorten werden derzeit bei den ÖBB verwendet und wie erkennt man diese?",
    a:[
    "R260, R350HT, R400HT – erkennbar am Walzzeichen",
    "nur R260 – erkennbar an Farbe",
    "nur R350HT – durch Gewicht",
    "keine Unterscheidung möglich"
    ],
    c:0}

  ],

  "1.2 | Kleineisen":[
    {q:"Was sind Kleineisen?",a:["Befestigung der Schiene","nur Schrauben","nur Nägel","keine"],c:0}
  ],

  "1.3 | Weichen":[
    {q:"Was ist die Funktion einer Weiche?",a:["Gleiswechsel ermöglichen","nur bremsen","nur stoppen","keine"],c:0}
  ],

  "1.4 | Gleisabschlüsse":[
    {q:"Wozu dienen Gleisabschlüsse?",a:["Sicherung gegen Wegrollen","nur Optik","nur Stabilität","keine"],c:0}
  ],

  "1.5 | Vermessung":[
    {q:"Wozu dient die Vermessung im Gleisbau?",a:["Lage und Höhe bestimmen","nur Kontrolle","nur Planung","keine"],c:0}
  ]

}

};

/* WEITERE KATEGORIEN */

db["Unterbau"] = {
  "Eisenbahnkreuzungen": [
    {q:"Was ist eine Eisenbahnkreuzung?",a:["Kreuzung Straße-Bahn","nur Bahn","nur Straße","keine"],c:0}
  ],
  "Bahnkörper & Entwässerung": [
    {q:"Wozu dient Entwässerung?",a:["Wasser ableiten","nur Optik","nur Stabilität","keine"],c:0}
  ]
};

db["Instandhaltung"] = {
  "Inspektion": [
    {q:"Was ist Inspektion?",a:["Zustand prüfen","Reparieren","Neu bauen","keine"],c:0}
  ]
};

db["Planungsgrundsätze"] = {
  "Streckenausrüstung": [
    {q:"Was gehört zur Streckenausrüstung?",a:["Signale etc.","nur Schienen","nur Züge","keine"],c:0}
  ],
  "Bahnsteige": [
    {q:"Wofür sind Bahnsteige?",a:["Ein/Ausstieg","nur Warten","nur Sitzen","keine"],c:0}
  ],
  "Trassierung": [
    {q:"Was ist Trassierung?",a:["Streckenplanung","nur Bau","nur Wartung","keine"],c:0}
  ],
  "Lichter Raum": [
    {q:"Was ist lichter Raum?",a:["Freiraumprofil","nur Licht","nur Höhe","keine"],c:0}
  ]
};

db["Arbeitnehmerschutz"] = {
  "Maschinen": [
    {q:"Wozu Arbeitnehmerschutz?",a:["Sicherheit","nur Regeln","nur Kontrolle","keine"],c:0}
  ]
};
