var startingMsg = document.querySelector('.startingMsg')
var timeElement = document.querySelector('.timeElement')
var quizButton = document.querySelector('#quizButton')
var quiz = document.querySelector('.quiz')
var questionsEl = document.querySelector('.questions')
var choicesEl = document.querySelector('.choices')
var scoreEnter = document.querySelector('.enterScore')
var submitScore = document.querySelector('.submitScore')
var initials = document.querySelector('.initials')
var viewScores = document.querySelector('.highScoreContainer')
var errorMsg = document.querySelector('.errorMsg')
var right = document.querySelector('.right')
var wrong = document.querySelector('.wrong')
var initialList = document.querySelector('.initialList')
var scoreList = document.querySelector('.scoreList')

var highScoreArray = [];

var quizQuestions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log",
  },
];

  var questionIndex = 0

function startQuiz() {
 startingMsg.classList.add('hide')
 quiz.classList.remove('hide')
quizButton.classList.add('hide')
if (time !== 0) {
  quizReset();
}
 startTime();
 renderQuestions();
}

var timeInterval;
var time = 30;
var score = 0

function quizReset() {
  time = 30;
  score = 0
  questionIndex = 0
  timeElement.classList.remove('hide');

}

function startTime() {
//  var timer = setInterval(timeInterval);
 timeInterval = setInterval( function() {
    timeElement.textContent = 'Time: ' + time
    time --;
    if (time < 0) {
        quizEnd();
    } else if (questionIndex >= 5) {
      quizEnd();
      clearInterval(timeInterval);
    }
 }, 1000);
  totalScore();
}

function totalScore() {
 var choice = localStorage.getItem("choice");
  console.log(choice);
  if (choice === quizQuestions[questionIndex].answer) {
    score = score + 10;
  } else {
    score = score + 0;
  }
 var addScore = '';
 addScore = localStorage.setItem('score', score);
 var getScore = localStorage.getItem('score');
 var currentScore =['']
currentScore.push(getScore)
console.log(currentScore);
}

// var answerChoices = quizQuestions[questionIndex].choices

function renderQuestions() {
  var answerChoices = quizQuestions[questionIndex].choices;
  questionsEl.textContent = quizQuestions[questionIndex].question;
  var choicesContainer = "";
  for (var i = 0; i < answerChoices.length; i++) {
    choicesContainer += `<li class = 'choiceStyle'>${answerChoices[i]}</li>`;
    choicesEl.innerHTML = choicesContainer;
  }
  if (questionIndex >= 5) {
    quizEnd();
    right.classList.add('hide')
    wrong.classList.add('hide')
  }
}

function questionSubmit() {
  var choice = localStorage.getItem("choice");
  console.log(choice);
  if (choice === quizQuestions[questionIndex].answer) {
    right.classList.remove("hide");
    wrong.classList.add("hide");
  } else {
    wrong.classList.remove("hide");
    right.classList.add("hide");
    time = time - 5;
  }
  setTimeout( function() {
    questionIndex++;
    renderQuestions();
  })
  setTimeout( function() {
    right.classList.add('hide')
    wrong.classList.add('hide')
  }, 3000)
};

function quizEnd() {
  quiz.classList.add('hide');
  timeElement.classList.add('hide');
  enterScore(); 
  finalScore();
}

function enterScore() {
 scoreEnter.classList.remove('hide')
}

 // storing scores and names
function saveName() {
  var scoreStore = {
    initials: initials.value,
    score,
  }

  if (initials.value === '') {
     errorMsg.classList.remove('hide')
     scoreEnter.classList.remove('hide')
     viewScores.classList.add('hide')
  } else {
    viewScores.classList.remove('hide')
    localStorage.setItem('scoreStore', JSON.stringify(scoreStore));
  }
}

function finalScore() {
 document.querySelector('#printScore').innerHTML = 'Final Score: ' + score;
}

function scoreBoard() {

 var highScoreList = JSON.parse(localStorage.getItem('scoreStore'));
console.log(highScoreList);
 highScoreArray.push(highScoreList.initials);
 highScoreArray.push(highScoreList.score);

 console.log(highScoreArray);

 var listContainer = ''
var scoreContainer = ''
 
for(var i = 0; i < highScoreArray.length; i += 2) {
  listContainer += `<li>${highScoreArray[i]}</li>`;
    initialList.innerHTML = listContainer;
}

for(var i = 0; i < highScoreArray.length; i++) {
  if (i % 2 !== 0) {
  scoreContainer += `<li>${highScoreArray[i]}</li>`;
    scoreList.innerHTML = scoreContainer;
  }
}


 quizButton.classList.remove('hide')

}

  quizButton.addEventListener('click', function(event){
   event.preventDefault();
   startQuiz();
  });

  choicesEl.addEventListener('click', function select(event) {
    var choice = event.target.textContent
    localStorage.setItem('choice', choice);
    questionSubmit();
    totalScore();
  });


  submitScore.addEventListener('click', function(event) {
  scoreEnter.classList.add('hide')
  saveName();
  scoreBoard();
 }
 )

