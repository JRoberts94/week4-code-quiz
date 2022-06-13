//when user clicks start button for the quiz
const startGameButton = document.getElementById('start-btn');

const timerEl = document.getElementById('timer');
const welcomeBg = document.getElementById('welcome');
const welcomeH3 = document.getElementById('heading-title');


const questionSectionEl = document.getElementById('section-question');
const correctH3 = document.getElementById('correct');
const wrongH3 = document.getElementById('wrong');
let questionTitleEl = document.getElementById('question-title');
let questionChoices = document.getElementById('question-choices');
let answerChoiceLi = document.getElementById('question-choice');


const scoreboardEl = document.getElementById('highscore');
const gameOverEl = document.getElementById('end-game');
const initialsInput = document.getElementById('initials-input');
const restartBtn = document.getElementById('restart-btn');
const saveButton = document.getElementById('save-button');
let userInput = document.getElementById("initials");

let finalScore = document.getElementById('score-span');
let timeRemaining = 0;
let score = 0;

    
//show timer, timer starts
startGameButton.addEventListener('click', function(event){
    timerEl.classList.remove('hide');
    startGameButton.classList.add('hide');
    questionTitleEl.classList.remove('hide');
    questionSectionEl.classList.remove('hide');
    

    
    startTimer();
});


function startTimer(){
    timeRemaining = 60;
    const timerId = setInterval(function(){
        timeRemaining = timeRemaining - 1;
    questionTitleEl.classList.remove('hide');
    // answerBtnsEl.classList.remove('hide');

        timerEl.textContent = timeRemaining;
        if (timeRemaining <= 0){
            clearInterval(timerId);
            timerEl.classList.add('hide');
        
            return gameOver();
            
        
        }
    }, 1000);

    renderQuestions(0);
    
};

function stopTimer(event){
    score = timeRemaining;

    clearInterval(timerId);

};


function renderQuestions(questionIndex){
    welcomeH3.classList.add('hide');
    // get the question
    const question = questions[questionIndex]
    // create the structure
    //set question title
    questionTitleEl.textContent = question.title;
    
    //set the choices
    const choices = question.choices;
    questionChoices.textContent = "";

    for (let index = 0; index < choices.length; index++) {
        const choice = choices[index];
        
        const li = document.createElement('li');
        
        const button = document.createElement('button');

        button.setAttribute('class', 'question-choice');
        button.textContent = choice.title;

        button.addEventListener('click', function(event){
            if(choice.isAnswer){
                score++
                // score = timeRemaining;
                console.log(score);
                correctH3.classList.remove('hide');
                wrongH3.classList.add('hide');
                // answerChoiceLi.setAttribute('class', 'green');
                // correct answer click moves to next question
                

            }else{
                // wrong answer click deducts 10 secons from timer
                timeRemaining = timeRemaining - 10;
                correctH3.classList.add('hide');
                wrongH3.classList.remove('hide');
                console.log(score);
            }

            const nextQuestionIndex = questionIndex + 1;

            if(nextQuestionIndex >= questions.length){
                return gameOver()
                stopTimer()
            }


            //move on to next question in index
            renderQuestions(nextQuestionIndex);


        });
        
        li.appendChild(button);
        
        questionChoices.appendChild(li);


            
    }
    
    

    
};



//when all questions answered, ends quiz, show end game screen, high scores
//or, if timer runs out first, ends quiz, show end game screen, high scores
function gameOver(event) {
    clearInterval(timeRemaining);
    gameOverEl.classList.remove('hide');
    questionTitleEl.classList.add('hide');
    questionSectionEl.classList.add('hide');
    welcomeH3.classList.add('hide');
    questionChoices.innerHTML = "";
    timerEl.classList.add("hide");
    
    finalScore.textContent = score;
    
 };



//when user clicks save button, store initials + score to local storage 
saveButton.addEventListener('click', function(event){
    event.preventDefault();
    const initials = userInput.value;
    correctH3.classList.add('hide');
    wrongH3.classList.add('hide');
        if (initials === null) {

            console.log("No value entered!");

        } else {
            const finalScore = {
                initials: initials,
                score: score,
            }
            console.log(finalScore);
            let allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            
            allScores.push(finalScore);
            
                        // limit to 10 records
            
                        // if allScores 's length is > 5 
                        // if (allScores.length >= 4){
                        //     // then get the latest 5 items in the array only 
                        //     let num = 4
                        //     const slicedScores = allScores.slice(0, num);
                        //     return slicedScores;
                        // }
                        

            const newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
        }
        saveButton.classList.add('hide');

        let prevScores = JSON.parse(localStorage.getItem('allScores'));
        let highScoresEl = document.getElementById('high-scores');

        for (let index = 0; index < prevScores.length; index++) {
            const score = prevScores[index];
            const pEl = document.createElement("p");

            
            pEl.textContent = score.initials + " = " + score.score + " points ";
            highScoresEl.appendChild(pEl)
        
        
        
        };

        
        
        // for (var i = 0, len = localStorage.length; i < len; ++i) {
        //     element.textContent = localStorage.getItem(localStorage.key(i))
        
        // const li = document.createElement('li');
        
        //     li.setAttribute('class', 'highscore-items');
        //     li.textContent = prevScores;
        //     document.body.append(li);
            // li.textContent = initialsInput;
    });



    // let initials = userInput.text;

    // const li = document.createElement('li');
        
    // li.setAttribute('class', 'highscore-items');
    // li.textContent = "";


    // let highscoreEl = document.getElementById("highscore-title")
    // let highscores = document.getElementById("highscore-items")

    // document.body.append(li);
    // li.textContent = userInput.value + " - " + score;

    // if(userInput.value === ""){
    //     console.log("No value entered");
    //     alert("Please enter your initials")
    

       
        

    // }
    
    // saveHighscore()
// })




// function saveHighscore(event){
//     const userScore = userInput + score;
//     window.localStorage.setItem('userInitials', 'timeScore');
//     const userSaves = {
//         userInitials: "",
//         timeScore: 0,
//     }
//     window.localStorage.setItem('users', JSON.stringify(userSaves));
    
    
// };


//on high score page, show previous scores + initials
//have button to return to quiz home page, restart





