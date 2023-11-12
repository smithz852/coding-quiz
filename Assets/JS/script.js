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
      // add question below
      question: "Testing this question?",
      //create an array of answers for selection buttons
      choices: ["1", "2", '3', '4', '5'],
      //input the answer from one of the selections in the array
      answer: "2"
    },
    {
      question: "Question 2?",
      choices: ["1", '2', '3'],
      answer: "3"
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

var answerChoices = quizQuestions[questionIndex].choices

function renderQuestions() {
 questionsEl.textContent = quizQuestions[questionIndex].question
 
 var choicesContainer = '';
 for (var i = 0; i < answerChoices.length; i++) {
    choicesContainer += `<li class = 'choiceStyle'>${answerChoices[i]}</li>`
    choicesEl.innerHTML = choicesContainer
 }
}

function questionSubmit() {
  var choice = localStorage.getItem('choice')
  console.log(choice);
   if ( choice === quizQuestions[questionIndex].answer) {
      right.classList.remove('hide');
    } else {
      wrong.classList.remove('hide')
    }
    }




 


  quizButton.addEventListener('click', function(event){
   event.preventDefault();
   startQuiz();
  })

  choicesEl.addEventListener('click', function select(event) {
    // event.preventDefault();
    var choice = event.target.textContent
    localStorage.setItem('choice', choice);
    questionSubmit();
  }, {once : true});