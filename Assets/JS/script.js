var startingMsg = document.querySelector('.startingMsg')
var timeElement = document.querySelector('.timeElement')
var quizButton = document.querySelector('#quizButton')
var quiz = document.querySelector('.quiz')
var questionsEl = document.querySelector('.questions')
var choicesEl = document.querySelector('.choices')

var quizQuestions = [
    {
      question: "What is the capital of France?",
      choices: ["Berlin", "Paris", "London", "Madrid"],
      answer: "Paris"
    },
    {
      question: "Which planet is known as the 'Red Planet'?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars"
    },
    {
      question: "What is the largest mammal in the world?",
      choices: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      answer: "Blue Whale"
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      choices: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Mark Twain"],
      answer: "William Shakespeare"
    },
    {
      question: "What is the powerhouse of the cell?",
      choices: ["Nucleus", "Mitochondria", "Endoplasmic Reticulum", "Ribosome"],
      answer: "Mitochondria"
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