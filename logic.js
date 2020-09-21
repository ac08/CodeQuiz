// Array of Quiz Questions
let questions = [
    {
        question: "Bootstrap and jQuery are types of what?",
        choices: ["Content Delivery Networks (CDN)", "Internet Browsers"],
        answer: "Content Delivery Networks (CDN)"
    },
    {
        question: "What is the best programming language?",
        choices: ["Java", "Python", "Ruby", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "Is CSS fun",
        choices: ["Yes", "No" ],
        answer: "Yes"
    },
    {
        question: "",
        choices: [],
        answer: ""
    }
]

// Global Variable Declaration
let userScore            = 0;
let yourScore            = $('.yourScore');
let timeRemaining        = $('.timeRemaining');
let currentQuestionIndex = 0;
let startScreenEl        = $('#start-screen');
let beginScreenEl        = $('#quiz-container');
let submitScoreEl        = $('#submitScore');
let scoreboardEl         = $('#scoreboard');
let questionChoices      = $('#question-choices');
let questionTitle        = $('#question-title');
let currentQuestion      = questions[currentQuestionIndex];
let currentChoices       = questions[currentQuestionIndex].choices;
let currentTitle         = questions[currentQuestionIndex].question;
let userName             = $('#userName');

// Event Listeners 
// Click event configured on 'Start Quiz' button (id=begin) to transition screen to quiz questions
$("#begin").on("click", function() {
    $(startScreenEl).addClass("d-none");
    $(beginScreenEl).removeClass("d-none");
    getQuestion();
    timer();
});

// Click event configured on 'selection' buttons (class=selection) to transition between questions and record user scores 
$(document).on("click", ".selection", function(){
    $('#feedback').empty();
    let selection = this.value;
    if (selection === questions[currentQuestionIndex].answer) {
        userScore = (userScore) + 5;
        $('#feedback').html("Correct!")
        currentQuestionIndex = currentQuestionIndex + 1;
        getQuestion();
    } else {
        userScore = (userScore) - 1;
        $('#feedback').html("Wrong!");
    };
});

// Click event configured on 'Submit' button (id=submit) to transition screen scoreboard el displaying scores 
$('#submit').on("click", function(){
    if (userName.val() === "") {
        $('#feedback').html("Please Enter a User Name!");
    } else {
        $(submitScoreEl).addClass("d-none");
        $(scoreboardEl).removeClass("d-none");
        $(yourScore).html("Your Score: " + userScore);
        // High Score is saved to local storage
        saveHighScore();
        // Scores in local storage are reconfigured so that high score displays on scoreboard el
        analyzeHighScores();
      }
});

// Click event configured on 'Try Again' button (id=tryAgain) to reload page for user to begin quiz again
$('#tryAgain').on("click", function () { 
    location.reload();
});

// Functions 
// function timer() {
//     let timer = parseInt(timeRemaining.html());
//     if (timer > 0) {
//         let interval = setInterval(function() {
//             timeRemaining.html(timer--);
//         }, 1000);
//     } else {
//         clearInterval(interval);
//         alert('YOUR TIME IS UP');
//     };
// };

function timer() {
    let timer = parseInt(timeRemaining.html());
    if (timer > 0) {
        setInterval(function() {
            timeRemaining.html(timer--);
            
        function timeCheck() {
            if (timer === 0) {
                alert('test');
            };
        };
            timeCheck();
        }, 1000);
    } 
};


// function timer() {
//     let timer = parseInt(timeRemaining.html());
//     do {
//         setInterval(function() {
//             timeRemaining.html(timer--);
//         }, 1000);
//     } while (timer > 0);
// };

// Function configured transition screen between different questions and appropriately display different choices as buttons with configured classes and attributes
function getQuestion() {
    if (currentQuestionIndex === questions.length -1) {
        $('#feedback').empty();
        $(beginScreenEl).addClass("d-none");
        $(submitScoreEl).removeClass("d-none");
        $(yourScore).html("Your Score: " + userScore);
    } else {
    $('#question-choices').empty();
    $('#question-title').empty();
    currentChoices = questions[currentQuestionIndex].choices;
    currentTitle   = questions[currentQuestionIndex].question;
    currentChoices.forEach(function(value, i){
        let choiceSelection = $('<button></button>'); 
        choiceSelection.html((i + 1) + '. ' + value)
        choiceSelection.addClass("selection btn-dark d-flex align-items-vertical m-3");
        choiceSelection.attr({
            type: "button",
            value: value});
        questionChoices.append(choiceSelection);
    });

    questionTitle.append(currentTitle);
    }
};

// Function configured to store new user score following completion of quiz
function saveHighScore() {
    // Retrieve saved topScore from localstorage, or if not any, set variable 'highScores to an empty array
    let highScores =
    JSON.parse(window.localStorage.getItem("topScore")) || [];
    // Format newScore object for current user
    let newScore = {
    score: userScore,
    name: userName.val()
    };
    // Save to localstorage
    highScores.push(newScore);
    window.localStorage.setItem("topScore", JSON.stringify(highScores));
};

// Function configured to analyze scores within local storage and display current highscore on scoreboard el
function analyzeHighScores() {
    let arrOfScores = [];
    let localStorageArr = JSON.parse(window.localStorage.getItem("topScore"));
    localStorageArr.forEach(function(el) {
        arrOfScores.push(el.score);
        arrOfScores.sort(function(a, b){return b-a});
    });
    $("#highScore").html("High Score: " + arrOfScores[0]);
};
