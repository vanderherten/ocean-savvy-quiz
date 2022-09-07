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

