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
  console.log('hello')
  const questionDisplay = document.querySelector('.question h3')
  let point = document.querySelector('.progress').childNodes[15]
  point.style.color = 'black';
  point.style.backgroundColor = '#f76029';

  const response = await fetch('https://the-trivia-api.com/v2/questions?categories=general_knowledge');
  const questions = await response.json()
  questionDisplay.textContent = questions[0].question.text;
  const correctAnswer = questions[0].correctAnswer
  const wrongAnswers = questions[0].incorrectAnswers
  console.log(questions[0], questions, correctAnswer, wrongAnswers)
  shuffleAnswers(correctAnswer, wrongAnswers)


}

function shuffleAnswers (correctAnswer, wrongAnswers) {
  const choices = document.querySelectorAll('.answer button');
  choices.forEach(choice => {
    
  })
  console.log(choices[Math.floor(Math.random() * 3)]);

}

loadProgress();
startGame();

