/* The array of questions for the game.
Description of the variables:
    pos is position of where the user in the test or which question they're up to
    correct - holds the number of correct responses
    test -  'test' div setup in HTML
    test_status - heading that displaying user's progress in the quiz
    question - question that is grabbed from the array listed below
    choice - response selected by user
    choices - list of possible answers (multiple choice)
    chA, chB, chC, chD - represents each line of the multiple choice responses */
var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, chD, correct = 0;
var startBtn = document.querySelector('#start');
var instructionsEl = document.querySelector('#instructions');
var timerEl = document.querySelector('#countdown');
var quizEl = document.querySelector('#quiz-body');
var statusEl = document.querySelector('#status');
var timeInterval;
var timeLeft = 0;
// this is a multidimensional array with 5 inner array elements with 6 elements inside them 

var myQuestions = [
    {
        question: "Commonly used data types do NOT include:",

        a: "Strings",
        b: "Booleans",
        c: "Alerts",
        d: "Numbers",
        answer: "C"
    },
    {
        question: "Arrays in JavaScript can be used to store ______",
        a: "Other Arrays",
        b: "Numbers and Strings",
        c: "Booleans",
        d: "All of the Above",
        answer: "D"
    },
    {
        question: "The condition in an if/else statement is enclosed with _____",

        a: "Quotes",
        b: "Parenthesis",
        c: "Square Brackets",
        d: "Curly Brackets"
        ,
        answer: "B",
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",

        a: "Quotes",
        b: "Curly Brackets",
        c: "Commas",
        d: "Parenthesis"
        ,
        answer: "A"
    },
    {
        question: "A useful tool used during development/debugging for printing content to the debugger is:",

        a: "JavaScript",
        b: "terminal/bash",
        c: "for loops",
        d: "console.log"
        ,
        answer: "D"
    }
];

// this get function is short for the getElementById function  
function get(x) {
    return document.getElementById(x);
}
quizEl.textContent = "Try to answer the following code - related questions withn the time limit.Keep in mind that incorrect answers will penalize your score / time by ten seconds!";


function timer() {
    timeLeft = 60;
    startBtn.setAttribute("style", "display: none"); // Hide start button on start

    timeInterval = setInterval(function () {
        // While timer is running
        if (timeLeft > -1) {
            timerEl.textContent = 'Time: ' + timeLeft; // Display timer on page
            timeLeft--;
        }
        // After timer hits zero
        else {
            timerEl.textContent = 'Times Up!'; // Display times up message
            clearInterval(timeInterval); // Reset Timer
            endGame(timeLeft);
        }
    }, 1000);
    renderQuestion();
}

// this function renders a question for display on the page

function renderQuestion() {
    test = get("quiz-body");
    if (pos >= myQuestions.length) {
        test.innerHTML = "<h2>You got " + correct + " of " + myQuestions.length + " questions correct</h2>";
        get("quiz-body").innerHTML = "Test completed";
        // resets the variable to allow users to restart the test
        pos = 0;
        correct = 0;
        // stops rest of renderQuestion function running when test is completed
        return false;
    }

    get("quiz-body").innerHTML = "Question " + (pos + 1) + " of " + myQuestions.length;

    question = myQuestions[pos].question;
    chA = myQuestions[pos].a;
    chB = myQuestions[pos].b;
    chC = myQuestions[pos].c;
    chD = myQuestions[pos].d;
    // display the question
    test.innerHTML = "<h3>" + question + "</h3>";
    // display the answer options
    // the += appends to the data we started on the line above
    test.innerHTML += "<label> <input type='radio' name='choices' value='A'> " + chA + "</label><br>";
    test.innerHTML += "<label> <input type='radio' name='choices' value='B'> " + chB + "</label><br>";
    test.innerHTML += "<label> <input type='radio' name='choices' value='C'> " + chC + "</label><br>";
    test.innerHTML += "<label> <input type='radio' name='choices' value='D'> " + chD + "</label><br><br>";
    test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
}

function checkAnswer() {
    // use getElementsByName because we have an array which it will loop through
    choices = document.getElementsByName("choices");
    for (var i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            choice = choices[i].value;
        }
    }
    // checks if answer matches the correct choice
    if (choice === myQuestions[pos].answer) {
        //each time there is a correct answer this value increases
        correct++;
    }
    // changes position of which character user is on
    pos++;
    // then the renderQuestion function runs again to go to next question
    renderQuestion();
}
// Add event listener to call renderQuestion on page load event
//window.addEventListener("load", renderQuestion);
startBtn.onclick = timer;