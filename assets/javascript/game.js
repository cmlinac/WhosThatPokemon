var questions = [
    {
        answer: "Charizard",
        apicture: "acharizard.png",
        qpicture: "qcharizard.jpg",
        options: ["Charizard", "Charmeleon", "Firetail", "Fireflai"]
    },
    {
        answer: "Dratini",
        apicture: "adratini.png",
        qpicture: "qdratini.jpg",
        options: ["Dratini", "Dragontini", "Seviper", "Snek"]
    },
    {
        answer: "Eevee",
        apicture: "aeevee.png",
        qpicture: "qeevee.png",
        options: ["Eevee", "Jigglypuff", "Foxer", "Fluffpuff"]
    },
    {
        answer: "Gyarados",
        apicture: "agyarados.png",
        qpicture: "qgyarados.jpg",
        options: ["Gyarados", "Dragineon", "Seviper", "Kraken"]
    },
    {
        answer: "Hitmonlee",
        apicture: "ahitmonlee.jpg",
        qpicture: "qhitmonlee.png",
        options: ["Hitmonlee", "Hitmonchan", "Kikken", "Legger"]
    },
    {
        answer: "Jolteon",
        apicture: "ajolteon.png",
        qpicture: "qjolteon.png",
        options: ["Jolteon", "Electron", "Raikou", "Wattsin"]
    },
    {
        answer: "Pikachu",
        apicture: "apikachu.png",
        qpicture: "qpikachu.png",
        options: ["Pikachu", "Jigglypuff", "Electron", "Mowsen"]
    },
    {
        answer: "Shinx",
        apicture: "ashinx.png",
        qpicture: "qshinx.png",
        options: ["Shinx", "Shiner", "Kitter", "Shoxx"]
    }
]

var timeLeft = 30;
var index = 0;
var score = 0;
var timer;

$("#start-button").on("click", play);
$(document).on("click", ".poke-image", imageClick)
$(document).on("click", ".next-button", nextButtonClick);

function play() {
    // hide start button, show finished button and tip
    $("#start-button").css("display", "none");
    $("#tip").css("display", "block");
    // shuffle questions array - shuffle()
    shuffle(questions);
    // loop through questions array
    // display the first question
    display();
};

function countDown() {
    // count down time
    timeLeft--;
    // display time on screen
    $("#time-left").text("You have " + timeLeft + " seconds left!")
    // if it's zero, they lose
    if (timeLeft === 0) {
        wrongAnswer(true);
    }
}

// shuffles the given array in a random order
// note that this shuffles in place instead of creating a new array
function shuffle(array) {
    var random;
    var swap;
    for (var i = array.length - 1; i > 0; i--) {
        random = Math.floor(Math.random() * (i + 1));
        swap = array[i];
        array[i] = array[random];
        array[random] = swap;
    }
    return array;
};

function display() {
    if (index === questions.length) {
        finish();
    } else {
        clearInterval(timer);
        // start & write timer
        timeLeft = 30;
        $("#details").attr("style", "display:block");
        $("#feedback").empty();
        $("#time-left").text("You have 30 seconds left!");
        timer = setInterval(countDown, 1000);
        // get the question
        question = questions[index];
        // shuffle options array - shuffle()
        shuffle(question.options);
        // clear previous question
        $("#questions").empty();
        // inject using jquery including img
        $("#questions").append(toHTML(question));
        // increase index
        index++;

        // display the next question button

        $("#questions").append(`
        <button class="btn btn-danger next-button">Next</button>
        `);
    }
    
};

function toHTML(question) {
    // fill out the html for the question
    return `
    <div class="row">
        <div class="col-md-12"> 
            <div class="question" id="${question.answer}">
                <form>
                    <div class="image-div">
                        <img class="poke-image" src="assets/images/${question.qpicture}" hint="assets/images/${question.apicture}">
                    </div>
                    <div class="question-text">Which Pokémon is this?</div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="${question.options[0]}">
                        <label class="form-check-label" for="inlineRadio1">${question.options[0]}</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="${question.options[1]}">
                        <label class="form-check-label" for="inlineRadio2">${question.options[1]}</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="${question.options[2]}">
                        <label class="form-check-label" for="inlineRadio3">${question.options[2]}</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="${question.options[3]}">
                        <label class="form-check-label" for="inlineRadio4">${question.options[3]}</label>
                    </div>
                </form>
            </div>
        </div>
    </div>`;
}

function calcScoreAndDisplay() {
    // check if they got it right
    var correct = questions[index - 1].answer;
    var answer = $("#" + correct + " input:radio:checked").val();
    var answerIsRight = (answer === correct);
    // hide game details
    // check if right and display correct result
    if (answerIsRight) {
        score++;
        rightAnswer();
    } else {
        wrongAnswer(false);
    }
    
}

function nextButtonClick() {
    calcScoreAndDisplay();
}

function finish() {
    var container = $(".container")
    // clear questions
    container.empty();
    // display score and picture that goes along with score
    container.append($(`
    <h1>Your score was ${score} out of 8!</h1>
    <h2>${getPhrase(score)}</h2>
    <img src="assets/images/${score}.gif" height="400px" class="result-image">
    `));
        
};

function getPhrase(score) {
    var phrases = [
        "Pikachu is sad about your Pokémon knowledge.",
        "Squirtle is upset you missed so many!",
        "Mewtwo wishes you asked him for help.",
        "Pikachu isn't impressed by your score.",
        "Pikachu will help you look for the rest of the answers.",
        "Not bad, Horsea approves.",
        "Some of the questions got you like",
        "Pikachu is surprised you missed just one!",
        "You got them all right, very cool!"
    ]
    return phrases[score];
};

function imageClick() {
    var fullImage = $(this).attr("hint");
    $(this).attr("src", fullImage);
}

function rightAnswer() {
    $("#details").attr("style", "display:none");
    setTimeout(display, 1200);
    // setTimeout(showDetails, 1200);
    var questionsDiv = $("#questions");
    questionsDiv.empty();
    $("#feedback").text("You got it right!");
    var image = $("<img>");
    image.attr("src", "assets/images/right.gif");
    questionsDiv.append(image);
}

function wrongAnswer(timeout) {
    $("#details").attr("style", "display:none");
    setTimeout(display, 2000);
    // setTimeout(showDetails, 2000);
    var questionsDiv = $("#questions");
    questionsDiv.empty();
    if (timeout) {
        $("#feedback").text("Time's Up!");
    } else {
        $("#feedback").text("You got it wrong!");
    }
    var right = $("<h5>The right answer was <strong>" + questions[index - 1].answer + ".</strong><h5>");
    var image = $("<img>");
    image.attr("src", "assets/images/wrong.gif");
    questionsDiv.append(right, image);
}

function showDetails() {
    $("#details").attr("style", "display:block");
}