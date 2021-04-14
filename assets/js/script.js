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
var formEl = document.querySelector("#highscore");
var highscoreEl = document.querySelector("#highscore-panel")

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
quizEl.textContent = "Try to answer the following code related questions within the time limit.  Keep in mind that incorrect answers will penalize your score / time by ten seconds!";

// timer function to run in parallel with the quiz
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
        endGame(timeLeft);
        //displays the total number of correct answers to users
        get("status").innerHTML = "<h2>You got " + correct + " of " + myQuestions.length + " questions correct</h2>";
        //displays the final score on top
        test.innerHTML = "Test completed.  Your final score is: " + timeLeft;
        // resets the variable to allow users to restart the test
        pos = 0;
        correct = 0;
        // stops rest of renderQuestion function running when test is completed
        return false;
    }
    //displays which question the user is currently looking at
    get("quiz-body").innerHTML = "Question " + (pos + 1) + " of " + myQuestions.length;
    //iterate through the questions based on the position (quiz number)
    question = myQuestions[pos].question;
    //fetch the multiple choice answers
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

//funciton to validate the users repsonse with actual response
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
    else
        //reduce 10 secs to penalize wrong answer
        timeLeft = timeLeft - 10;
    // changes position of which character user is on
    pos++;
    // then the renderQuestion function runs again to go to next question
    renderQuestion();
}

//endGame function to clear timer and display message to users if time runs out before quiz is completed
var endGame = function (timeLeft) {
    clearInterval(timeInterval); // Stop Timer
    quizEl.innerHTML = "<h2>All Done!</h2><h3>Your final score is " + (timeLeft) + "</h3>";
    var highscoreEl = document.querySelector('#highscore-panel');
    highscoreEl.setAttribute("style", "display: block; margin-top: -250px");
}

//function to record highscore of the user by using local storage
var recordHighScores = function () {
    event.preventDefault();
    var playerInput = document.querySelector("input[name='player-initials']").value;
    // Check if input values are empty strings
    if (!playerInput) {
        alert("Please enter your name or initals!");
        return false;
    }
    // clear the screen
    highscoreEl.textContent = "";
    quizEl.textContent = "";
    statusEl.textContent = "";

    // Gather data for local storage
    var highscore = {
        name: playerInput,
        score: timeLeft
    }
    localStorage.setItem('scores', JSON.stringify(highscore));
    showHighScores();
};

//function to display highscore from local storage
var showHighScores = function () {
    var savedScores = localStorage.getItem("scores")
    //if there are no high scores, display below message
    if (!savedScores) {
        alert("No High Scores Recorded!")
        return false;
    }
    savedScores = JSON.parse(savedScores);
    //display score.  when user clicks on go back, restart quiz. clear high score clears the score from local storage
    quizEl.innerHTML = "<h2 class='score-header'>High Scores!</h2>" +
        "<div class='score-list'>1) " + savedScores.name + " &ndash; " + savedScores.score + "</div>" +
        "<div class='score-buttons'>" +
        "<button class='btn' onclick='location.reload()'>Go Back</button>" +
        "<button class='btn' onclick='localStorage.clear()'>Clear High Scores</button>" +
        "</div>";
}

startBtn.onclick = timer;
formEl.addEventListener("submit", recordHighScores);