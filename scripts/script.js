let correctAnswer = undefined;
let wrongAnswers = undefined;

let PointIndex = 15;
function loadProgress() {
  const progress = document.querySelector(".progress");
  const points = [
    "1 Million",
    "500,000",
    "250,000",
    "100,000",
    "50,000",
    "25,000",
    "16,000",
    "8000",
    "4000",
    "2000",
    "1000",
    "500",
    "300",
    "200",
    "100",
  ];

  for (let index = 0; index < points.length; index++) {
    const element = document.createElement("p");
    element.textContent = `${15 - index} ${points[index]}`;
    element.className = `progress-point`;
    if (parseInt(element.textContent) % 5 === 0) {
      element.style.color = "white";
    }
    progress.appendChild(element);
  }
}

async function startGame() {
  console.log("hello");
  const questionDisplay = document.querySelector(".question h3");
  const choices = document.querySelectorAll(".answer button");
  let point = document.querySelector(".progress").childNodes[PointIndex];
  console.log(document.querySelector(".progress").childNodes);
  setActive(point);

  let response = await fetch(
    "https://the-trivia-api.com/v2/questions?categories=general_knowledge"
  );
  let questions = await response.json();
  questionDisplay.textContent = questions[0].question.text;
  let correctAnswer = questions[0].correctAnswer;
  let wrongAnswers = questions[0].incorrectAnswers;
  shuffleAnswers(correctAnswer, wrongAnswers);
  console.log(correctAnswer);

  choices.forEach((choice) => {
    choice.addEventListener("click", function () {
      console.log(correctAnswer, "yay");
      verifyAnswer(correctAnswer, choice, questionDisplay);
    });
  });
}

function verifyAnswer(answer, choice, questionDisplay) {
  const chosenChoice = choice.textContent.split(": ")[1];
  console.log(answer, chosenChoice, correctAnswer);
  if (correctAnswer != undefined) {
    if (correctAnswer === chosenChoice) {
      choice.style.backgroundColor = "green";
      choice.style.borderColor = "white";
      questionDisplay.textContent = "CORRECT!";
      nextQuestion();
      return;
      // proceed with logic
    } else {
      lostGame(choice, questionDisplay);
    }
  } else {
    if (answer === chosenChoice) {
      choice.style.backgroundColor = "green";
      choice.style.borderColor = "white";
      questionDisplay.textContent = "CORRECT!";
      nextQuestion();
      return;
      // proceed with logic
    } else {
      setTimeout(resetOption, 3000);
      lostGame(choice, questionDisplay);
    }
  }
}

function lostGame(choice, questionDisplay) {
  choice.style.backgroundColor = "red";
  choice.style.borderColor = "white";
  questionDisplay.textContent = "WRONG!";
  window.location.replace("./lose.html");
}
async function resetOption() {
  const choices = document.querySelectorAll(".answer button");
  choices.forEach((choice) => {
    choice.style.backgroundColor = "black";
    choice.style.borderColor = "#1363bc";
  });
}
function nextQuestion() {
  let point = document.querySelector(".progress").childNodes[PointIndex];
  removeActive(point);
  PointIndex--;
  point = document.querySelector(".progress").childNodes[PointIndex];
  setActive(point);
  setTimeout(resetOption, 3000);
  setTimeout(generateQuestion, 3000);
  //resetOption();
  //startGame();
}
async function generateQuestion() {
  console.log("hello");
  const questionDisplay = document.querySelector(".question h3");
  let point = document.querySelector(".progress").childNodes[PointIndex];
  console.log(document.querySelector(".progress").childNodes);
  setActive(point);

  const response = await fetch(
    "https://the-trivia-api.com/v2/questions?categories=general_knowledge"
  );
  const questions = await response.json();
  questionDisplay.textContent = questions[0].question.text;
  correctAnswer = questions[0].correctAnswer;
  wrongAnswers = questions[0].incorrectAnswers;
  shuffleAnswers(correctAnswer, wrongAnswers);
  console.log(correctAnswer);
}
function setActive(point) {
  point.style.color = "black";
  point.style.backgroundColor = "#f76029";
}
function removeActive(point) {
  point.style.color = "#a2794d";
  point.style.backgroundColor = "";
}

function shuffleAnswers(correctAnswer, answers) {
  answers.push(correctAnswer);
  answers = shuffle(answers);
  const option = ["A", "B", "C", "D"];
  const choices = document.querySelectorAll(".answer button");
  choices.forEach((choice, index) => {
    choice.textContent = `${option[index]}: ${answers[index]}`;
  });
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

loadProgress();
startGame();
