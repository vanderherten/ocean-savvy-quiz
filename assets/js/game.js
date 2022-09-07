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
 */
function loadQuiz() {
    setMaxQuestions(MAX_QUESTIONS);
    resetQuestionCounter(0);
    resetScore(0);
    createQuestions();
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