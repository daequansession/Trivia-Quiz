// Query Select the button element
const startButton = document.querySelector('#start-button');
const quizScreen = document.querySelector('#quiz-screen');
const resultScreen = document.querySelector('#result-screen');
const questionElement = document.querySelector("#question")
const choicesButtons = document.querySelectorAll(".btn");
const nextQuestionButton = document.querySelector("#next-btn");
const scoreBoard = document.querySelector("#score");
const gameOver = document.querySelector('#game-over');
const resetButton = document.querySelector('#restart-button');

let index = 0;
// Step 1: create a variable (called score) and initialize it to the number 0

let score = 0;

const backgroundMusic = new Audio('https://www.epidemicsound.com/music/tracks/6fc54e3e-f7a3-44fe-ae46-3f9ac239f358/');
backgroundMusic.loop = true
backgroundMusic.volume = 0.7

startButton.addEventListener("click", function() {
    startButton.classList.toggle("hide") // hide the start button
    quizScreen.classList.toggle("hide") // show questions section
    resultScreen.classList.toggle("hide") // show the results section
    
    backgroundMusic.play()  // Play music
    displayQuestion() // Calling displayQuestion function that will display the question from the questions array
});

nextQuestionButton.addEventListener("click", function() {
    // Check if we have reached the last question
    if (index >= questions.length - 1){
        nextQuestionButton.disabled = true
        gameOver.classList.toggle('hide')
        
        backgroundMusic.pause(); //Stop music

        return
    }

    index++
    // remove borders from buttons
    choicesButtons.forEach(function(btn){
        btn.style.border = ""
    })

    enableButtons()
    displayQuestion()
})


resetButton.addEventListener("click", function(){
    index = 0;
    score = 0;

    choicesButtons.forEach(function(btn){
        btn.style.border = ""
    })

    scoreBoard.textContent = score;
    gameOver.classList.toggle('hide')
    nextQuestionButton.disabled = false
    enableButtons()
    displayQuestion()
})

function disableButtons() {
    choicesButtons.forEach(function(btn){
        btn.disabled = true
    })
}

function enableButtons(){
    choicesButtons.forEach(function(btn){
        btn.disabled = false
    })
}

function displayQuestion(){
    const currentQuestion = questions[index] // Get current question from questions array at index

    questionElement.textContent = currentQuestion.prompt // adding question prompt to UI
    
    // TBU: Shuffle choices
    choicesButtons.forEach(function(btn, i){ // adding choices to buttons UI
        btn.textContent = currentQuestion.choices[i]
    })
}

// Event Delegation
quizScreen.addEventListener("click", function(event) {
    // Notes:
    // questions => will give us the array of objects [{...}, {...}, {...}]
    // questions[index] => will give us an object { prompt: "...", choices: [...], answer: ""}
    // questions[0].answer => will give us the value of the key "answer" which is a string

    if (event.target.classList.contains("btn")) {
    
        if (event.target.textContent === questions[index].answer) {
            score += 5;
            event.target.style.border = '4px solid green';
        } else {
            score -= 5;
            event.target.style.border = '4px solid red';
        }

        scoreBoard.textContent = score;
        disableButtons()
    }
});


