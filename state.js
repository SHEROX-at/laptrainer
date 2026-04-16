let currentCat = null;
let quizData = [];
let index = 0;

let stats = JSON.parse(localStorage.getItem("stats")) || {};
let wrong = JSON.parse(localStorage.getItem("wrong")) || {};
