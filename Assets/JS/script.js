var startingMsg = document.querySelector('.startingMsg')
var timeElement = document.querySelector('.timeElement')
var quizButton = document.querySelector('#quizButton')
var quiz = document.querySelector('.quiz')
var questionsEl = document.querySelector('.questions')
var choicesEl = document.querySelector('.choices')
var nextButton = document.querySelector('.nextButton')

//New variables to test
var right = document.querySelector('.right')
var wrong = document.querySelector('.wrong')

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
];

  var questionIndex = 0

function startQuiz() {
 startingMsg.classList.add('hide')
 quiz.classList.remove('hide')
 startTime();
 renderQuestions();
}

var timeInterval;
var time = 100;

function startTime() {
//  var timer = setInterval(timeInterval);
 timeInterval = setInterval( function() {
    timeElement.textContent = 'Time: ' + time
    time --;
    if (time < 0) {
        clearInterval(timeInterval);
        // eventually write out a function call for end quiz
    }
 }, 1000);
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
}

function questionSubmit() {
  var choice = localStorage.getItem("choice");
  console.log(choice);
  if (choice === quizQuestions[questionIndex].answer) {
    right.classList.remove("hide");
  } else {
    wrong.classList.remove("hide");
  }
  questionIndex++;
  renderQuestions();
}

// function nextQuestion() {
//   questionIndex++;
//   renderQuestions();
// }

  quizButton.addEventListener('click', function(event){
   event.preventDefault();
   startQuiz();
  })

  choicesEl.addEventListener('click', function select(event) {
    // event.preventDefault();
    var choice = event.target.textContent
    localStorage.setItem('choice', choice);
    questionSubmit();
  });

  // nextButton.addEventListener('click', function(event) {
  //   event.preventDefault();
  //   nextQuestion();
  // });