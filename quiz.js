

var questions = [{
    question: "Which type of JavaScript language is __",
    choices: ["Object-Oriented", "Object-Based", "Assembly-language", "High-level"] ,
    correctAnswer: 1
}, {
    question:  "In JavaScript, what is a block of statement?",
    choices: ["Conditional block", "block that combines a number of statements into a single compound statement", "both conditional block and a single statement ", "block that contains a single statement"],
    correctAnswer: 1
}, {
    question: "The function and  var are known as:",
    choices: ["Keywords", "Data type", "Declaration statemet", "Prototypes"],
    correctAnswer: 0
}, {
    question: "Which of the following type of a variable is volatile?",
    choices: ["Mutable variable", "Dynamic variable", "Volatile variable", "Immutable variable"],
    correctAnswer: 2
}, {
    question: "Which of the following option is used as hexadecimal literal beginning?",
    choices: ["00", "0x", "0X", "Both 0x and 0X"],
    correctAnswer: 3
}, {
    question: "Which of the following number object function returns the value of the number?",
    choices: ["toString()", "valueOf()", "toLocaleString()", " toPrecision()"],
    correctAnswer: 1

}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an option");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Attempt Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}