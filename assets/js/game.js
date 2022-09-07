const QUIZ_DATA = [
    {
        question: 'Question 1',
        answer1: 'Answer 1',
        answer2: 'Answer 2',
        answer3: 'Answer 3',
        answer4: 'Answer 4',
        correctAnswer: 1,
    },
    {
        question: 'Question 2',
        answer1: 'Answer 1',
        answer2: 'Answer 2',
        answer3: 'Answer 3',
        answer4: 'Answer 4',
        correctAnswer: 2,
    },
    {
        question: 'Question 3',
        answer1: 'Answer 1',
        answer2: 'Answer 2',
        answer3: 'Answer 3',
        answer4: 'Answer 4',
        correctAnswer: 3,
    },
    {
        question: 'Question 4',
        answer1: 'Answer 1',
        answer2: 'Answer 2',
        answer3: 'Answer 3',
        answer4: 'Answer 4',
        correctAnswer: 4,
    },
    {
        question: 'Question 5',
        answer1: 'Answer 1',
        answer2: 'Answer 2',
        answer3: 'Answer 3',
        answer4: 'Answer 4',
        correctAnswer: 5,
    },
];
const MAX_QUESTIONS = 5;
const TIME_AVAILABLE_FOR_EACH_QUESTION_IN_SECS = 15;
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
 * If so will show total score in result page.
 * Otherwise, increments the Question Counter in HUD (Heads-up Display),
 * and loads a new question.
 */
function loadQuestion() {
    const questionCounterEl = parseInt(document.querySelector('#question-counter').innerText);
    const MAX_QUESTIONS_EL = parseInt(document.querySelector('#max-questions').innerText);

    if (questions.length === 0 || questionCounterEl >= MAX_QUESTIONS_EL) {
        return showTotalScore();
    }
    
    incrementQuestionCounter();

    getNewQuestion();

    acceptingAnswers = true;
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
 */
function addEventListenersToAnswerBtns() {
    const answerEls = Array.from(document.querySelectorAll('.game__answer-text'));
    answerEls.forEach(function (answerEl) {
        answerEl.addEventListener('click', onAnswerBtnClick);
    });
}

/**
 * Checks if acceptingAnswers. If no, then will ignore user clicked.
 * If yes, then logs selected answer.
 * Then will start loadQuestion() function. 
 */
function onAnswerBtnClick(e) {
    if (!acceptingAnswers) return;
  
    acceptingAnswers = false;
    const clickedAnswer = e.target;
    const selectedAnswer = clickedAnswer.dataset['number'];

    loadQuestion();
}