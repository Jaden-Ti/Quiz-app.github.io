// Create a data storage
// It is a LIST that holds multiple DICTIONARIES
// Each dictionary is a question set
// A dictionary holds data in key-value pair

const database = [
    {
        question : "what is 1+2+3+4+…+100",
        options : ["5050", "69" ,"2025" , "pikachu"],
        answer : "5050",
    },

    {
        question : "which statement is correct",
        options : ["(a+bi)(c+di)= ac+adi+cbi-bd", "37% of 100 is 100% of 73" , "98x92=100x90", "Hey look! A squirrel! 🐿️"],
        answer : "(a+bi)(c+di)= ac+adi+cbi-bd"
    },

    {
        question : "which number system uses base-20",
        options : ["Hindu-Arabic","Mayan","Roman","czech"],
        answer : "Mayan"
    },

    {
        question : "what are intergrals the opposite of",
        options : ["division", "distribution", "logarithams", "derivatives"],
        answer : "derivatives"
    },

    {
        question : "what are the sum of the numbers in the 15th row of pascal's triangle",
        options : ["32768", "16384", "nut", "20000"],
        answer : "32768"
    },
];

const startButton = document.getElementById('start-btn');
const questionLabel = document.getElementById('question');
const timerText = document.getElementById('timerLabel');
const timerComponent = document.getElementById('timer');
const progressBar = document.getElementById('progress-bar-container');
const progressBarFill = document.getElementById('progress-bar-fill');
const optionsContainer = document.getElementById('options-container');
const scoreLabel = document.getElementById('score');
const feedbackLabel = document.getElementById('feedback');

progressBarFill.style.width='0%';

let current_index = 0;
let timer;
let score = 0;

startButton.addEventListener('click', startQuiz);

function startQuiz()
{
    startButton.style.display = 'none';
    loadQuestion();
};

function loadQuestion()
{
    if(current_index < database.length)
    {
        // Update progress bar
        progressBarFill.style.width = `${((current_index + 1) / database.length) * 100}%`;

        const currentQuizSet = database[current_index];
        questionComponent = currentQuizSet.question;
        questionLabel.textContent = questionComponent;

        //set initial countdown value
        timerText.textContent = 20;

        //Remove all previous button clones
        optionsContainer.innerHTML = '';

        //clone option buttons for each question
        currentQuizSet.options.forEach((option) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            optionsContainer.appendChild(button);

            button.addEventListener('click', () => {
                disableOptionButtons(); //disable all option buttons
                checkAnswer(option);
            });
        });

        //re-enable option buttons when it loads the next question
        enableOptionButtons();

        // Start timer countdown
        timer = setInterval(() => {
            timerText.textContent = parseInt(timerText.textContent) - 1;

            if(parseInt(timerText.textContent) === 0 )
            {
                //reset timer
                clearInterval(timer);


                //disable all option buttons when the time runs out
                disableOptionButtons();

                // update current_index variable
                current_index++;

                loadQuestion();
            }

        }, 1000);
    } else
    {
        endQuiz();
    }
}

function endQuiz()
{
    questionLabel.textContent = "🎉Quiz has ended!🎉"
    timerComponent.style.display = 'none';
    optionsContainer.style.display = 'none';
}

function checkAnswer(option)
{
    const answer = database[current_index].answer;
    let feedback = '';

    if(option == answer)
    {
        score = score + 1;
        feedback = '✅Bravo! answer correct!👏👏👏'
    } else
    {
        feedback = 'Incorrect... Better luck next time...❌'
    }
    

    feedbackLabel.textContent = feedback;

    scoreLabel.textContent = `You scored ${score} points`
    clearInterval(timer);

    //hold for 2 seconds before loading the next question
    setTimeout(() => {
       //clear feedback
       feedbackLabel.textContent = '';
       current_index = current_index + 1;
       loadQuestion();
    }, 2000);    
}

function disableOptionButtons() {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(button => {
        button.disabled = true; // Disable the button
    });
}

function enableOptionButtons() {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(button => {
        button.disabled = false; // Enable the button
    });
}


