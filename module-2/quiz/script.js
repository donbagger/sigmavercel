const runawayButton = document.getElementById('runaway-answer');
const trickyBox = document.getElementById('tricky-box');
const resetButton = document.getElementById('reset-button');
const submitButton = document.getElementById('submit-button');
const answersButton = document.getElementById('good-answers-button');
const answerButtons = document.querySelectorAll('.answer');
const questionContainers = document.querySelectorAll('.question');
const options = document.querySelectorAll('.answer');
const celebrationImage = document.getElementById('king');
const maxScoreClass = 'celebration';



options.forEach(option => {
    option.addEventListener('click', (e) => {
        const parent = e.target.closest('.question'); // Get the question container
        // Remove active class from all buttons in the same question
        parent.querySelectorAll('.answer').forEach(btn => btn.classList.remove('selected'));

        // Add selected class to the clicked button
        e.target.classList.add('selected');
    });
});

document.getElementById('submit-button').addEventListener('click', () => {
   
   // Step 1: Validation - Check if all questions are answered
   const allAnswered = validateQuiz(); // Call the validation function
   const resultElement = document.getElementById('result');
   const finishAlert = document.getElementById('finish-alert'); // Assume there's a hidden element for this

   if (!allAnswered) {
       // Show "Finish your quiz!" message and stop execution
       finishAlert.style.display = 'block'; // Show the hidden alert
       resultElement.style.display = 'none'; // Hide the result for now
       return; // Prevent further execution
   }
   
   let score = 0;
    const selectedOptions = document.querySelectorAll('.selected');

    selectedOptions.forEach(option => {
        if (option.getAttribute('data-correct') === "true") {
            score++;
        }
    });
    submitButton.disabled = true;
    resetButton.style.display = 'inline-block';
    answersButton.style.display = 'inline-block';
    document.getElementById('result').textContent = `Your score: ${score}/8 `;
    resultElement.style.display = 'inline'; // Show the result
    finishAlert.style.display = 'none'; // Hide the finish alert if it was shown earlier

    if (score === 8) {
        // Show the hidden image
        celebrationImage.style.width = '30%';
        celebrationImage.style.display = 'block';
        celebrationImage.style.margin = '0 auto';
        celebrationImage.style.position = 'relative';
        celebrationImage.style.marginTop = '20px';


        // Activate some CSS (e.g., background color change, animations)
        document.body.classList.add(maxScoreClass); 
    }
});

   



answersButton.addEventListener('click', function() {

    answerButtons.forEach(button => {
        if (button.getAttribute('data-correct') === 'true') {
            button.style.backgroundColor = 'green';
            button.style.color = 'white'; 
        }
    });
});


    runawayButton.addEventListener('mouseover', () => {
        const boxRect = trickyBox.getBoundingClientRect();
        const buttonRect = runawayButton.getBoundingClientRect();

    const maxX = boxRect.width - buttonRect.width;
    const maxY = boxRect.height - buttonRect.height;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    runawayButton.style.position = 'absolute';
        runawayButton.style.left = `${newX}px`;
        runawayButton.style.top = `${newY}px`;
});

function validateQuiz() {
    let allAnswered = true;
    questionContainers.forEach(question => {
        const selectedAnswer = question.querySelector('.answer.selected'); // Check if an answer is selected
        if (!selectedAnswer) {
            allAnswered = false; // If any question is unanswered, mark as false
        }
    });
    return allAnswered;
}
