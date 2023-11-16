var startingMsg = document.querySelector('.startingMsg')
var timeElement = document.querySelector('.timeElement')
var quizButton = document.querySelector('#quizButton')
var startDisplay = document.querySelector('.start-display')
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
var retakeButton = document.querySelector('#retakeButton')
var homePage = document.querySelector('#homePage')
var highScoreButton = document.querySelector('#scorePage')

//Array for storing initials and final scores
var highScoreArray = [];

// Array for quiz questions
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

  // Starts quiz
function startQuiz() {
  highScoreButton.classList.add('hide')
 quiz.classList.remove('hide')
quizButton.classList.add('hide')
startDisplay.classList.add('hide')
if (time !== 0) {
  quizReset();
}
 startTime();
 renderQuestions();
}

var timeInterval;
var time = 100;
var score = 0

// Restore time and score values for retaking quiz as well as default content
function quizReset() {
  time = 100;
  score = 0
  questionIndex = 0
  timeElement.classList.remove('hide');
  viewScores.classList.add('hide')
  startingMsg.classList.remove('hide')
  errorMsg.classList.add('hide')
}

//starts decreasing time
function startTime() {
 timeInterval = setInterval( function() {
    timeElement.textContent = 'Time: ' + time
    time --;
    if (time < 0) {
        quizEnd();
        clearInterval(timeInterval)
    } else if (questionIndex >= 5) {
      quizEnd();
      clearInterval(timeInterval);
    }
 }, 1000);
  totalScore();
}

//Tracks score throughout quiz and stores it
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

// Renders questions and choices sequentially
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

// Checks what was clicked against what the answer is per question
function questionSubmit() {
  var choice = localStorage.getItem("choice");
  console.log(choice);
  if (choice === quizQuestions[questionIndex].answer) {
    right.classList.remove("hide");
    wrong.classList.add("hide");
  } else {
    wrong.classList.remove("hide");
    right.classList.add("hide");
    time = time - 10;
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

//Ends quiz, hides old content, and runs functions to render more content
function quizEnd() {
  startingMsg.classList.add('hide')
  quiz.classList.add('hide');
  timeElement.classList.add('hide');
  enterScore(); 
  finalScore();
}
// Reveals completion page for the end of the quiz
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
    scoreBoard();
  }
}

// Prints final score on completion page
function finalScore() {
 document.querySelector('#printScore').innerHTML = 'Final Score: ' + score;
}

//Sets initials and final score to high score page
function scoreBoard() {

 var highScoreList = JSON.parse(localStorage.getItem('scoreStore'));
console.log(highScoreList);


 highScoreArray.push(highScoreList.initials);
 highScoreArray.push(highScoreList.score);

 console.log(highScoreArray);

 var listContainer = ''
var scoreContainer = ''
 
for(var i = 0; i < highScoreArray.length; i += 2) {
  listContainer += `<li class= 'scoreLi initialLi'>${highScoreArray[i]}</li>`;
    initialList.innerHTML = listContainer;
}

for(var i = 0; i < highScoreArray.length; i++) {
  if (i % 2 !== 0) {
  scoreContainer += `<li class= 'scoreLi scoreLiAdj' style= 'text-align: end'>${highScoreArray[i]}</li>`;
    scoreList.innerHTML = scoreContainer;
  }
}
};

//For clicking home button on high score page and resetting needed values/content
function home() {
  startingMsg.classList.remove('hide')
 quiz.classList.add('hide')
quizButton.classList.remove('hide')
startDisplay.classList.remove('hide')
highScoreButton.classList.remove('hide')
timeElement.textContent = 'Time: 100'
quizReset();
}
//Sets content for going directly from home page to high score page
function scoreDirect() {
  viewScores.classList.remove('hide')
  startingMsg.classList.add('hide')
  highScoreButton.classList.remove('hide')
 quiz.classList.add('hide')
quizButton.classList.add('hide')
startDisplay.classList.add('hide')
}

// To start the quiz
  quizButton.addEventListener('click', function(event){
   event.preventDefault();
   startQuiz();
  });

  // To record choices clicked
  choicesEl.addEventListener('click', function select(event) {
    var choice = event.target.textContent
    localStorage.setItem('choice', choice);
    questionSubmit();
    totalScore();
  });

//Submits initials input at end of quiz
  submitScore.addEventListener('click', function(event) {
  scoreEnter.classList.add('hide')
  saveName();
 }
 );

 // Try again button from high score page
 retakeButton.addEventListener('click', function(event){
  event.preventDefault();
  startQuiz();
 });

// Goes to home page from high score page
 homePage.addEventListener('click', function(event){
  event.preventDefault();
  home();
 });

 // Goes directly to high score page
 highScoreButton.addEventListener('click', function(event){
  event.preventDefault();
  scoreDirect();
 });
