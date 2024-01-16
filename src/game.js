//counter clock
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};

const question =document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
var value = 0;

let questions = [
    {
        question:"What is the term for a data structure that follows the Last In, First Out (LIFO) order?",
        op1:"stack",
        op2:"1966",
        op3:"1969",
        op4:"1952",
        answer:1
    },
    {
        question:"In a binary search, what is the middle element compared to during each iteration?",
        op1:"Midpoint",
        op2:"25 deg cel",
        op3:"31.5 deg cel",
        op4:"29.5 deg cel",
        answer:1
    },
    {
        question:"Which algorithm is commonly used for finding the shortest path in a weighted graph?",
        op1:"ইরান",
        op2:"Dijkstra",
        op3:"কুয়েত",
        op4:"লিবিয়া",
        answer:2
    },
    {
        question:"What is the primary purpose of a queue data structure?",
        op1:"9",
        op2:"6",
        op3:"FIFO",
        op4:"11",
        answer:3
    },
    
]

const CORRECT_BONUS = 10;
const MAX_QUESTIONS =4;

startGame=()=>{
 questionCounter = 0;
 score = 0;
 availableQuestions = [...questions];
 getNewQuestion();
}

getNewQuestion = () =>{
    if(availableQuestions ==0 || questionCounter.length >= MAX_QUESTIONS){
        //sign off from the page
        return window.location.assign('end.html')
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter} / ${MAX_QUESTIONS}`;
    const currentIndex= Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[currentIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice =>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["op"+ number];
    });

    availableQuestions.splice(currentIndex, 1);
    acceptAnswers = true;
}

choices.forEach(choice =>{
    choice.addEventListener('click',function(e){
        if(!acceptAnswers) return;
        acceptAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const classToApply = selectedAnswer == currentQuestion.answer? 'correct':'incorrect';
     //   selectedAnswer == currentQuestion.answer? alert("Good Job Baby!!!",value):alert("hurry!!!!")
    
        if(classToApply == 'correct') incrementScore(CORRECT_BONUS)
        choice.parentElement.classList.add(classToApply);
        
        setTimeout(()=>{
        selectedAnswer == currentQuestion.answer? alert("Congratulations!!!"):alert("Sorry!!! Correct Answer : "+currentQuestion.answer)

        choice.parentElement.classList.remove(classToApply);
         getNewQuestion();
        },1000);
        
    });
    
});
incrementScore = num =>{
    score += num;
    scoreText.innerText = score;
}
startGame();