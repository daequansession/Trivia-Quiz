// Query Select the button element
const myButton = document.querySelector('#start-button');
const quizScreen = document.querySelector('#quiz-screen');
const resultScreen = document.querySelector('#result-screen');
const questionElement = document.querySelector("#question")
const choicesButtons = document.querySelectorAll(".btn");
const nextQuestionButton = document.querySelector("#next-btn");

let index = 0;

myButton.addEventListener("click", function() {
    myButton.classList.toggle("hide") // hide the start button
    quizScreen.classList.toggle("hide") // show questions section
    resultScreen.classList.toggle("hide") // show the results section

    displayQuestion() // Calling displayQuestion function that will display the question from the questions array
})

nextQuestionButton.addEventListener("click", function() {
    index++
    displayQuestion()
})




function displayQuestion(){
    const currentQuestion = questions[index] // Get current question from questions array at index

    questionElement.textContent = currentQuestion.prompt // adding question prompt to UI
    
    // TBU: Shuffle choices
    choicesButtons.forEach(function(btn, i){ // adding choices to buttons UI
        btn.textContent = currentQuestion.choices[i]
    })
}

quizScreen.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn")) {
    console.log("answer:", event.target.textContent);
    index++
    displayQuestion();
  } else {
    console.log("Wrong Answer");
  }

});