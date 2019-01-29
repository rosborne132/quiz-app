'use strict';
// Setup global variables
let questionCounter = 0;
let quizCounter = 0;
let correctAnswers = 0;

// Global Questions
const questionStore = [
    {
        questionTitle: 'How many Star Spirits do you save throughout the game',
        possibleAnswers: ['5', '2', '10', '7'],
        correctAnswer: '7'
    },
    {
        questionTitle: 'Which of the following do Shy Guys never do',
        possibleAnswers: ['Sing', 'Run', 'Sleep', 'Dance'],
        correctAnswer: 'Sing'
    },
    {
        questionTitle: 'What best describes the relationship between Mario and Luigi',
        possibleAnswers: ['Neighbors', 'Friends', 'Enemies', 'Brothers'],
        correctAnswer: 'Brothers'
    },
    {
        questionTitle: 'What are Boos, exactly',
        possibleAnswers: ['Thieves', 'Ghosts', 'Koopas', 'Sheets'],
        correctAnswer: 'Ghosts'
    },
    {
        questionTitle: 'What treasure did Bowser steal from Star Haven',
        possibleAnswers: ['Star rod', 'Princess Peach', 'Twink', 'Luigi'],
        correctAnswer: 'Star rod'
    }
]

// Checks if selected answer is correct
const isCorrectAnswer = (selectedAnswer, correctAnswer) => selectedAnswer === correctAnswer;

// Handle submit handler functions
function handleStartSubmit(e) {
    quizCounter += 1;
    main();
}

function nextQuestion(e) {
    questionCounter += 1;
    quizCounter += 1;
    main();
}

function resetQuiz(e) {
    questionCounter = 0;
    quizCounter = 1;
    correctAnswers = 0;
    main();
}

function handleQuestionSubmit(e) {
    const selectedAnswer = $('input:checked').siblings('span').text();
    const correctAnswer = questionStore[questionCounter].correctAnswer;
    const results = isCorrectAnswer(selectedAnswer, correctAnswer);

    if (results){
        questionResults(results)
        correctAnswers += 1;
    } else {
        questionResults(results, correctAnswer, selectedAnswer)
    }
}

// Render pages
function generateStartPage() {
    const startPage =  `
        <section class="quiz-page">
            <h1>Chuck Quizmo's Quiz</h1>
            <p>Test your Paper Mario knowledge!</p>
            <br>
            <button class="js-button" id="js-start-button">Start</button>
        </section>
    `;

    $('.container').html(startPage);
};

function generateQuestionPage(question, questionCounter, correctAnswers) {
    const questionPage = `
     <section class="quiz-page" role="main">
        <div id="progress-bar">
            <span id="question-count">Question: ${questionCounter}/${questionStore.length}</span>
            <span id="score-count">Score: ${correctAnswers}</span>
        </div>

        <h2 id="question-title">${question.questionTitle}?</h2>
        
        <form>
            <label tabindex="1">
                <input class="answer" type="radio" name="option"></input>
                <span>${question.possibleAnswers[0]}</span>
            </label>
            <label tabindex="2">
                <input class="answer" type="radio" name="option"></input>
                <span>${question.possibleAnswers[1]}</span>
            </label>
            <label tabindex="3">
                <input class="answer" type="radio" name="option"></input>
                <span>${question.possibleAnswers[2]}</span>
            </label>
            <label tabindex="4">
                <input class="answer" type="radio" name="option"></input>
                <span>${question.possibleAnswers[3]}</span>
            </label>

            <button class="js-button full-width" id="js-submit-button">Submit</button>
        </form>
    </section>
    `;

    $('.container').html(questionPage);
};

function questionResults(results, correctAnswer = null, selectedAnswer = null) {
    const resultsPage = results ? `
        <section class="quiz-page">
            <h1 class="correct">Correct!</h1>
            <br>
            <br>
            <br>
            <button class="js-button" id="js-next-button">Next</button>
        </section>` 
        : `
        <section class="quiz-page">
            <h1>Incorrect!</h1>
            <p>Correct answer: ${correctAnswer}</p>
            <p>Selected answer:  ${selectedAnswer}</p>
            <button class="js-button" id="js-next-button">Next</button>
        </section>`

    $('.container').html(resultsPage);
};

function generateResultsPage(questionCounter, correctAnswers) {
    const resultsPage =  `
        <section class="quiz-page">
            <h1>Congrats!</h1>
            <p>You scored ${correctAnswers} out of ${questionCounter}</p>
            <br>
            <button class="js-button" id="js-reset-button">Retry Quiz!</button>
        </section>
    `;

    $('.container').html(resultsPage);
};

// Register event handlers
$('.container').on('click', '#js-start-button', function(e) {
    e.preventDefault();
    handleStartSubmit();
});

$('.container').on('click', '#js-submit-button', function(e) {
    e.preventDefault();
    $('input:checked').siblings('span').text() !== '' ? handleQuestionSubmit(e) : null
});

$('.container').on('click', '#js-next-button', function(e) {
    e.preventDefault();
    nextQuestion();
});

$('.container').on('click', '#js-reset-button', function(e) {
    e.preventDefault();
    resetQuiz();
});


function main() {
    // Main logic flow
    if (quizCounter === 0){
        return generateStartPage();
    } else if (quizCounter === 6) {
        return generateResultsPage(questionCounter, correctAnswers);
    } else {
        return generateQuestionPage(questionStore[questionCounter], questionCounter, correctAnswers);
    }
}

$(main);