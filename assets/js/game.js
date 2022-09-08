const MAX_QUESTIONS = 5;
const TIME_AVAILABLE_FOR_EACH_QUESTION_IN_SECS = 16;
const ANSWER_CORRECT_POINTS = 20;

let questions = [];
let currentQuestion = {};
let acceptingAnswers = false;

// Waits for the DOM to finish loading before loading the quiz.
document.addEventListener('DOMContentLoaded', function () {
    loadQuiz();
});

/**
 * Sets the Maximum Questions value to MAX_QUESTIONS.
 * Then, resets the question counter and score to 0.
 * Then, creates a question array (full copy) from quizData array.
 * Then, loads a new question from question array and starts the Timer.
 */
function loadQuiz() {
    setMaxQuestions(MAX_QUESTIONS);
    resetQuestionCounter(0);
    resetScore(0);
    createQuestions();
    loadQuestion();
}

/**
 * Function to set the Maximum questions value and show in the HUD (Heads-up Display).
 */
function setMaxQuestions(num) {
    updateHTMLOfNodeId('max-questions', num);
}

/**
 * Function to reset the question counter value and show in the HUD (Heads-up Display). 
 */
function resetQuestionCounter(num) {
    updateHTMLOfNodeId('question-counter', num);
}

/**
 * Function to Reset the score value and show in the HUD (Heads-up Display).
 */
function resetScore(num) {
    updateHTMLOfNodeId('score', num);
}

/**
 * Function to update an HTML element with the ID attribute and assign a value to it's innerText
 */
function updateHTMLOfNodeId(targetId, value) {
    document.querySelector(`#${targetId}`).innerText = value;
}

/**
 * Creates a full copy of the quizData array,
 * which is stored in the questions array.
 * Copy made with the spread operator to prevent mutation.
 */
function createQuestions() {
    questions = [...QUIZ_DATA];
}

/**
 * Checks if the questions array is empty,
 * or if the maximum questions amount in quiz is reached,
 * If so saves total score to show in result page.
 * Otherwise, increments the Question Counter in HUD (Heads-up Display),
 * and loads a new question while also restarting the Timer.
 */
function loadQuestion() {
    const questionCounterEl = parseInt(document.querySelector('#question-counter').innerText);
    const MAX_QUESTIONS_EL = parseInt(document.querySelector('#max-questions').innerText);

    if (questions.length === 0 || questionCounterEl >= MAX_QUESTIONS_EL) {
        saveTotalScore();

        return showTotalScore();
    }
    
    incrementQuestionCounter();

    getNewQuestion();

    acceptingAnswers = true;

    startTimer();
}

/**
 * Save total score to local storage (for access in result page).
 */
function saveTotalScore() {
    let totalScore = document.querySelector('#score').innerText;
    localStorage.setItem('scoreResult', totalScore);
}

/**
 * Go to the result page to show total score.
 */
function showTotalScore() {
    window.location.assign('/result.html');
}

/**
 * Increment question counter in hud (heads-up display).
 */
function incrementQuestionCounter() {
    let oldQuestionCounterEl = parseInt(document.querySelector('#question-counter').innerText);
  
    updateHTMLOfNodeId('question-counter', ++oldQuestionCounterEl);
}

/**
 * Get a new random question with its answers out of questions array,
 * then show question in quiz,
 * and remove question from questions array (to prevent repeating questions).
 */
function getNewQuestion() {
    const questionIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[questionIndex];
  
    const questionEl = document.querySelector('#question');
    questionEl.innerText = currentQuestion.question;
  
    const answerEls = Array.from(document.querySelectorAll('.game__answer-text'));
  
    answerEls.forEach(function (answerEl, index) {
        answerEl.innerText = currentQuestion['answer' + (index + 1)];
    });
  
    // Remove the questions already used
    questions.splice(questionIndex, 1);
}

addEventListenersToAnswerBtns();

/**
 * Adds Event Listeners to the Answer buttons, to execute the onAnswerBtnClick function.
 * The onAnswerBtnClick function:
 * Checks if acceptingAnswers. If no, then will ignore user clicked.
 * If yes, then shows selected answer feedback,
 * by highlighting the clicked answer in green when correct or in red when incorrect.
 * If user clicked answer is correct will incrementScore().
 * Also, will highlight correct answer when answered incorrectly.
 * Then implements 1.5sec TimeOut delay to remove feedback class ('correct' or 'incorrect) and loadQuestion().
 */
function addEventListenersToAnswerBtns() {
    const answerEls = Array.from(document.querySelectorAll('.game__answer-text'));
    answerEls.forEach(function (answerEl) {
        answerEl.addEventListener('click', onAnswerBtnClick);
    });
}

/**
 * Checks if acceptingAnswers. If no, then will ignore user clicked.
 * If yes, then shows selected answer feedback,
 * by highlighting the clicked answer in green when correct or in red when incorrect.
 * If user clicked answer is correct will incrementScore().
 * Also, will highlight correct answer when answered incorrectly.
 * Then implements 1.5sec TimeOut delay to remove feedback class ('correct' or 'incorrect) and loadQuestion().
 */
function onAnswerBtnClick(e) {
    if (!acceptingAnswers) return;
  
    acceptingAnswers = false;
    const clickedAnswer = e.target;
    const selectedAnswer = parseInt(clickedAnswer.dataset['number']);
    const correctAnswer = currentQuestion.correctAnswer;
    const correctAnswerEl = document.querySelector(`[data-number="${correctAnswer}"]`);
    
    const isCorrect = selectedAnswer === correctAnswer;
    const classToApply = isCorrect ? 'correct' : 'incorrect';

    if (isCorrect) {
        incrementScore(ANSWER_CORRECT_POINTS);
      }

    clickedAnswer.parentElement.classList.add(classToApply);

    if (!isCorrect) {
        correctAnswerEl.parentElement.classList.add('correct');
    }

    const timeoutRef = setTimeout(() => {
        clickedAnswer.parentElement.classList.remove(classToApply);
        correctAnswerEl.parentElement.classList.remove('correct');
        loadQuestion();
        clearTimeout(timeoutRef);
    }, 1500);
}

/**
 * Function to increment score by a number value and show in HUD (Heads-up Display).
 */
function incrementScore(num) {
    let oldScore = parseInt(document.querySelector('#score').innerText);
    updateHTMLOfNodeId('score', oldScore + num);
}

/**
 * Checks if allotted question Time is smaller or equal to zero, if so it stops the timer and loadQuestion().
 * Also Checks if acceptingAnswers value is false and if so it stops the timer.
 * Otherwise will start timer of text countdown and timer bar showing in the HUD (Heads-up Display).
 */
function startTimer() {
    const timerBarEl = document.querySelector('#timer-bar');
    const timerBarTextEl = document.querySelector('#timer-bar-text');
    const timerBarCounterEl = document.querySelector('#timer-bar-counter');
  
    let questionTime = TIME_AVAILABLE_FOR_EACH_QUESTION_IN_SECS;
    let timerBarCounterFull = timerBarEl.clientWidth;
    let timerBarCounterWidthPerSec = timerBarCounterFull / questionTime;
    let timerBarCounterWidth = 0;
  
    let timer = setInterval(function () {
        if (questionTime <= 0) {
            // stop timer
            clearInterval(timer);
            loadQuestion();
        } else if (acceptingAnswers === false) {
            // stop timer
            clearInterval(timer);
        } else {
            // start timer
            questionTime--;
  
            // start timer bar text countdown in HUD (Heads-up Display)
            timerBarTextEl.innerText = `${questionTime} Sec`;
            timerBarCounterEl.style.width = '0px';
  
            // start timer bar counter in HUD (Heads-up Display)
            timerBarCounterWidth += timerBarCounterWidthPerSec;
            timerBarCounterEl.style.width = timerBarCounterWidth + 'px';
        }
    }, 1000);
}