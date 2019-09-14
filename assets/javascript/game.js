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

var timeLeft = 120;

$("#start-button").on("click", play);
$("#done-button").on("click", finish.bind("timeout", false));

$(document).on("click", ".poke-image", imageClick)

function play() {
    // hide start button, show finished button
    $("#start-button").css("display", "none");
    $("#done-button").css("display", "inline-block");
    $("#tip").css("display", "block");
    // start & write timer
    $("#time-left").text("You have 120 seconds left!");
    setInterval(countDown, 1000);
    // shuffle questions array - shuffle()
    shuffle(questions);
    // loop through questions array
    for (index in questions) {
        // display each question - display()
        display(questions[index]);
        // shuffle options array - shuffle()
        // inject using jquery including img
    }
};

function countDown() {
    // count down time
    timeLeft--;
    // display time on screen
    $("#time-left").text("You have " + timeLeft + " seconds left!")
    // if it's zero, they lose
    if (timeLeft === 0) {
        finish(true);
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

function display(question) {
     // shuffle options array - shuffle()
     shuffle(question.options);
    // inject using jquery including img
    $("#questions").append(toHTML(question));
};

// $("#question-image").attr("src", "assets/images/" + questions[index].apicture);
function toHTML(question) {
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
                        <label class="form-check-label" for="inlineRadio3">${question.options[3]}</label>
                    </div>
                </form>
            </div>
        </div>
    </div>`;
}

function calcScore() {
    var score = 0;
    // go through the questions array
    for (idx in questions) {
        // grab the correct answer and what they answered
        var correct = questions[idx].answer;
        var answer = $("#" + correct + " input:radio:checked").val();
        // if they match they get a point
        if (correct === answer) {
            score++;
        } 
    }
    
    return score;
}

function finish(timeout) {
    // check their answers - sub function?
    var score = calcScore();
    var container = $(".container")
    // clear questions
    container.empty();
    // if user ran out of time display time's up message
    if (timeout) {
        container.append("<h1>Time's Up!</h1>");
    }
    // display score and picture that goes along with score
    container.append($(`
    <h1>Your score was ${score} out of 8!</h1>
    <h2>${getPhrase(score)}</h2>
    <img src="assets/images/${score}.gif" height="400px">
    `));
        // play again button?   
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

