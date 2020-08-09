// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const $viewHist = $("#hist");
const scoreBoard  = $('#scoreBoard')


// create our questions
let questions = [
    {
        question : "What does HTML stand for?",
        imgSrc : "../Asset/img/html.png",
        choiceA : "Correct",
        choiceB : "Wrong",
        choiceC : "Wrong",
        correct : "A"
    },{
        question : "What does CSS stand for?",
        imgSrc : "../Asset/img/css.png",
        choiceA : "Wrong",
        choiceB : "Correct",
        choiceC : "Wrong",
        correct : "B"
    },{
        question : "What does JS stand for?",
        imgSrc : "../Asset/img/js.png",
        choiceA : "Wrong",
        choiceB : "Wrong",
        choiceC : "Correct",
        correct : "C"
    },{
        question : "What does JS stand for?",
        imgSrc : "../Asset/img/js.png",
        choiceA : "Wrong",
        choiceB : "Wrong",
        choiceC : "Correct",
        correct : "C"
    },{
        question : "What does JS stand for?",
        imgSrc : "../Asset/img/js.png",
        choiceA : "Wrong",
        choiceB : "Wrong",
        choiceC : "Correct",
        correct : "C"
    },{
        question : "What does JS stand for?",
        imgSrc : "../Asset/img/js.png",
        choiceA : "Wrong",
        choiceB : "Wrong",
        choiceC : "Correct",
        correct : "C"
    },{
        question : "What does JS stand for?",
        imgSrc : "../Asset/img/js.png",
        choiceA : "Wrong",
        choiceB : "Wrong",
        choiceC : "Correct",
        correct : "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;


let count = 60;
const questionTime = 60; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;


let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);
$viewHist.on('click', function(){
    scoreBoard.html('');

    for (let i = 0; i < Object.entries(localStorage).length; i++){
        const name = Object.entries(localStorage)[i][0];
        const scores = Object.entries(localStorage)[i][1];
        const $li = $('<li>')
        $li.text(name + '\t' +  scores)
        scoreBoard.append($li)

    }






})


// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}


// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count > 0 ){
        count --;
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
    }else{

        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            count = 0;
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnswer

function checkAnswer(answer){
    if( answer === questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    if(runningQuestion < lastQuestion && count >= 0){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
    count -= 19 // for every question answered wrong, you are ducted 20s;
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "../Asset/img/5.png" :
        (scorePerCent >= 60) ? "../Asset/img/4.png" :
            (scorePerCent >= 40) ? "../Asset/img/3.png" :
                (scorePerCent >= 20) ? "../Asset/img/2.png" :
                    "../Asset/img/1.png";





    count = 0;
    let user_name = prompt('Game Finished \n what is your name? ')

    scoreDiv.innerHTML = "<img src="+ img +">";

    scoreDiv.innerHTML += "<p>" + user_name + "\n" +  scorePerCent +"%</p>";
    localStorage.setItem( user_name, JSON.stringify(scorePerCent))

}


