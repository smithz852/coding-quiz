var startingMsg = document.querySelector('.startingMsg')
var timeElement = document.querySelector('.timeElement')
var quizButton = document.querySelector('#quizButton')
var quiz = document.querySelector('.quiz')
var questionsEl = document.querySelector('.questions')
var choicesEl = document.querySelector('.choices')

var quizQuestions = [
    {
      // add question below
      question: "",
      //create an array of answers for selection buttons
      choices: [""],
      //input the answer from one of the selections in the array
      answer: ""
    },
    {
      question: "",
      choices: [""],
      answer: ""
    },
    {
      question: "",
      choices: [""],
      answer: ""
    },
    {
      question: "",
      choices: [""],
      answer: ""
    },
    {
      question: "",
      choices: [""],
      answer: ""
    }
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
 timeInterval = setInterval( function() {
    timeElement.textContent = 'Time: ' + time
    time --;
    if (time <= 0) {
        clearInterval()
        // eventually write out a function call for end quiz
    }
 }, 1000);
}

function renderQuestions() {
 questionsEl.textContent = quizQuestions[questionIndex].question
 var answerChoices = quizQuestions[questionIndex].choices
 var choicesContainer = '';
 for (var i = 0; i < answerChoices.length; i++) {
    choicesContainer += `<li class = 'choiceStyle'>${answerChoices[i]}</li>`
    choicesEl.innerHTML = choicesContainer
 }
}

  quizButton.addEventListener('click', function(event){
   event.preventDefault();
   startQuiz();
  })