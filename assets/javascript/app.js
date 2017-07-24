$(document).ready(function() {
    $("#introSection").hide();
    $("#messageSection").hide();
    $('#instructionModal').modal();
    $('.parallax').parallax(); // function for MaterializeCSS parallax componenet
    $('.tooltipped').tooltip({ // delay function for button tool tips
        delay: 50
    });


    $("#introSection").fadeIn(1000 * 5, function() { // fade in page elements
        // fadeIn function
    });

    $("#questionSpace").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;


    var congratsMessages = ['Great going', 'Wow fantastic job', "You really know your Game of Thrones"];

    function randomNum(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }

    function randomCongrats() {
        var messageRoll = randomNum(congratsMessages.length);
    }

    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function() {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 25
                }, 1000 * 5);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }

    var questions = [
        // question 1
        {
            "q": "Who is the youngest of Ned and Catelyn Stark's children?",
            "c": ["Rickon", "Bran", "Arya"],
            "answer": 0
        },
        // question 2
        {
            "q": "What is the name of Jon Snow's wolf?",
            "c": ["Ghost", "Fang", "Snow"],
            "answer": 0
        },
        // question 3
        {
            "q": "Who fights for Tyrion in his trial by combat in Season 1?",
            "c": ["Oberyn", "The Hound", "Bronn"],
            "answer": 2
        },
        // question 4
        {
            "q": "The phrase often used in conjunction with the Lannisters is A Lannister always...?",
            "c": ["Destroyes their opponents", "Comes out on top", "Pays His Debts"],
            "answer": 2
        },
        // question 5
        {
            "q": "Sir Gregor Clegane is nicknamed what?",
            "c": ["The Mountain", "Wildling", "Khal Drogo"],
            "answer": 0
        },
        // question 6
        {
            "q": "What is the name of the god that the Red Priestess worships?",
            "c": ["The Lord of Winter", "The Lord of Light", "The Lord of Decay"],
            "answer": 1
        },
        // question 7
        {
            "q": "What is the nickname of Jaime Lannister?",
            "c": ["Dothraki", "The Kingslayer", "Little Finger"],
            "answer": 1
        },
        // question 8
        {
            "q": "What is the name of the cowardly recruit of the Nights Watch that Jon Snow protects from bullying?",
            "c": ["Theon", "Ramsay", "Samwell"],
            "answer": 2
        },
        // question 9
        {
            "q": "Who is the ruler of the Eyrie?",
            "c": ["Lady Lysa Arryn", "Brienne of Tarth", "Jorah Mormont"],
            "answer": 0
        },
        // question 10
        {
            "q": "A Dothraki wedding without at least how many deaths is considered a dull affair?",
            "c": ["Four", "Three", "Eight"],
            "answer": 1
        }
    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame(); // the conditional successfully loops the game
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum'); // stored as a string not a number
            userChoice = parseInt(userChoice);

            // checks if user is correct and will tally accordingly
            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
                randomCongrats();

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the game!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 10);

    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();

        startTrivia();


    })


});