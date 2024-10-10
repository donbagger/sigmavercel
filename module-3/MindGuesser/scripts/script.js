document.addEventListener("DOMContentLoaded", function () {
    let randomPattern = [];

    function chooseDifficulty (){
        document.getElementById('start-button').style.display = "flex" ;
        // document.getElementById('diffDiv').style.display = "none" ;

    }
    document.getElementById('diffNormal').addEventListener('click', chooseDifficulty);
    document.getElementById('diffHard').addEventListener('click', chooseDifficulty);
    document.getElementById('diffImpossible').addEventListener('click', chooseDifficulty);

    const options = document.querySelectorAll('.diff');


    options.forEach(option => {
        option.addEventListener('click', (e) => {
            const parent = e.target.closest('.difficulty'); // Get the question container
            // Remove active class from all buttons in the same question
            parent.querySelectorAll('.diff').forEach(btn => btn.classList.remove('selected'));
    
            // Add selected class to the clicked button
            e.target.classList.add('selected');
        });
    });

    // Function to place hidden cars in the pattern row
    function startGame() {

        const selectedButton = document.querySelector('.difficulty .selected');
        const selectedDifficulty = selectedButton.id;
        console.log("Selected Difficulty ID:", selectedDifficulty);
        document.getElementById('diffDiv').style.display = "none" ;



        document.getElementById('pattern-container').style.display = 'flex'; 
        document.getElementById('attempt-1').classList.add('show'); // Show the first attempt
        document.getElementById('start-button').style.display = 'none'; 
        document.getElementById('guess-button').style.display = 'flex'; 
        const patternRow = document.getElementById('pattern'); // Select the pattern row container
        patternRow.innerHTML = ''; // Clear any existing content in the pattern row
        randomPattern = createRandomPattern(selectedDifficulty);
        adjustDropdownsForDifficulty(selectedDifficulty);
        

        // Add 4 hidden cars to the pattern row
        for (let i = 0; i < 4; i++) {
            const hiddenCar = document.createElement('img');
            hiddenCar.src = 'img/hidden_car.png'; // Path to the hidden car image
            hiddenCar.alt = 'Hidden car';
            hiddenCar.classList.add('car-image-hidden'); // Optional: Apply styling to the car image
            patternRow.appendChild(hiddenCar); // Add the hidden car image to the pattern row
        }
    }

    // Event listener for the Start button
    document.getElementById('start-button').addEventListener('click', startGame);

    function adjustDropdownsForDifficulty(selectedDifficulty) {
        const dropdowns = document.querySelectorAll(".car-dropdown");

        dropdowns.forEach(dropdown => {
            const limeOption = dropdown.querySelector("option[value='lime']");
            const purpleOption = dropdown.querySelector("option[value='purple']");

            if (selectedDifficulty === 'diffNormal') {
                // Hide both lime and purple
                if (limeOption) limeOption.style.display = 'none';
                if (purpleOption) purpleOption.style.display = 'none';
            } else if (selectedDifficulty === 'diffHard') {
                // Hide only purple
                if (limeOption) limeOption.style.display = 'block'; // Ensure lime is visible
                if (purpleOption) purpleOption.style.display = 'none'; // Hide purple
            } else if (selectedDifficulty === 'diffImpossible') {
                // Show all options
                if (limeOption) limeOption.style.display = 'block';
                if (purpleOption) purpleOption.style.display = 'block';
            }
        });
    }

    // Function to handle dropdown change and replace dropdown with image
    function handleDropdownChange(event) {
        const selectedElement = event.target; // The dropdown element that triggered the event
        const selectedValue = selectedElement.value; // The selected color value (e.g., 'green', 'red')

        if (selectedValue) {
            // Create a new <img> element to represent the car
            const carImage = document.createElement('img');
            carImage.src = `img/${selectedValue}_car.png`; // Assuming car images are named like green_car.png
            carImage.alt = `${selectedValue} car`; // Set alt text for accessibility
            carImage.classList.add('car-image'); // Add class for styling the image

            // Replace the dropdown with the car image
            selectedElement.parentNode.replaceChild(carImage, selectedElement);
        }
    }

    // Adding event listeners to all dropdowns in your attempts section
    document.querySelectorAll(".car-dropdown").forEach(dropdown => {
        dropdown.addEventListener("change", handleDropdownChange);
    });

    function createRandomPattern(selectedDifficulty) {
        let carColors = [];
        let pattern = [];

      

        if (selectedDifficulty === 'diffNormal') {
            carColors = ["", "red", "green", "blue", "orange", "pink", "yellow"];
        } else if (selectedDifficulty === 'diffHard') {
            carColors = ["", "red", "green", "blue", "orange", "pink", "yellow", "lime"];
        } else if (selectedDifficulty === 'diffImpossible') {
            carColors = ["", "red", "green", "blue", "orange", "pink", "yellow", "lime", "purple"];
        }

        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * (carColors.length - 1)) + 1;
            pattern.push(carColors[randomIndex]);
        }

   

      //  console.log("Generated Pattern:", pattern); // <- this displays the pattern in console
        return pattern;
    } 
    
    

    let currentAttemptNumber = 1; // Track the current attempt (start from 1)

    function handleSubmitGuess() {
        // Get the current attempt by its unique ID (e.g., "attempt-1", "attempt-2", etc.)
        
        const currentAttempt = document.getElementById(`attempt-${currentAttemptNumber}`);
        console.log(currentAttempt); // Debug: Ensure the correct attempt container is found
    
        if (!currentAttempt) {
            console.error("No attempt found!");
            return;
        }
    
        const currentAttemptRow = currentAttempt.querySelector('.cars-row'); // Get the .cars-row within the current attempt
        console.log(currentAttemptRow); // Debug: Ensure the .cars-row is found
    
        if (!currentAttemptRow) {
            console.error("No cars-row found in the current attempt!");
            return;
        }
    
        const imagesInRow = currentAttemptRow.querySelectorAll('img'); // Get all images in the row
        console.log(imagesInRow); // Debug: Ensure images are found in the current attempt
    
        // 1. Check if all dropdowns have been replaced by images
        if (imagesInRow.length < 4) {
            alert("Please make sure all dropdowns are selected before submitting your guess.");
            return; // Prevent submission if not all cars are selected
        }
    
        // 2. Create an array of chosen car colors
        const chosenPattern = [];
        imagesInRow.forEach(img => {
            const color = img.src.split('/').pop().split('_')[0]; // Extract the color from the image filename (e.g., "green_car.png")
            chosenPattern.push(color);
        });
    
        console.log("Chosen Pattern:", chosenPattern);
    
        // Variables to track correct guesses
        let correctColorAndPosition = 0;
        let correctColor = 0;
    
        const tempPattern = [...randomPattern]; // Copy of the random pattern to prevent altering the original
        const usedIndexes = [];

        // First pass: Check for correct color and position
        chosenPattern.forEach((color, index) => {
            if (color === randomPattern[index]) {
                correctColorAndPosition++;
                tempPattern[index] = null; // Mark as checked to prevent double counting
                usedIndexes.push(index); // Track used index to prevent reuse in second pass
            }
        });
    
        // Second pass: Check for correct colors in wrong positions
        chosenPattern.forEach((color, index) => {
            if (color !== randomPattern[index] && tempPattern.includes(color)) {
                const availableIndex = tempPattern.indexOf(color);
                if (availableIndex !== -1 && !usedIndexes.includes(availableIndex)) {
                    correctColor++;
                    tempPattern[availableIndex] = null; // Mark as checked
                    usedIndexes.push(availableIndex); // Prevent double counting
                }
            }
        });
    
    
        console.log(`Correct Colors: ${correctColor}, Correct Colors & Positions: ${correctColorAndPosition}`);
    
        // Display the result in the current attempt row
        const pointsColor = currentAttempt.querySelector('.points-color');
        const pointsPosition = currentAttempt.querySelector('.points-position');
        pointsColor.textContent = `${correctColor +correctColorAndPosition}/4 in colors`;
        pointsPosition.textContent = `${correctColorAndPosition}/4 in positions`;
    
        // Check if the user won
        if (correctColorAndPosition === 4) {
            revealPattern();
            alert("Congratulations! You guessed the correct pattern!");
            document.getElementById('guess-button').style.display = 'none'; 
            document.getElementById('play-again-button').style.display = 'flex'; 
            return;
        }
    
        // Move to the next attempt
        currentAttemptNumber++;
        if (currentAttemptNumber > 10) {
            alert("Game Over! You've used all your attempts.");
            revealPattern();
            document.getElementById('guess-button').style.display = 'none'; 
            document.getElementById('play-again-button').style.display = 'flex'; 
            return;
        }
    
        // Show the next attempt
        const nextAttempt = document.getElementById(`attempt-${currentAttemptNumber}`);
        if (nextAttempt) {
            nextAttempt.classList.add('show'); // Reveal the next row
        }
    }
    
    // Add event listener to the submit button
    document.getElementById('guess-button').addEventListener('click', handleSubmitGuess);
    

    function revealPattern() {
        const patternRow = document.getElementById('pattern'); // Get the pattern container
        patternRow.innerHTML = ''; // Clear the current hidden cars
    
        // Loop through the randomPattern array and display the correct cars
        randomPattern.forEach(color => {
            const carImage = document.createElement('img');
            carImage.src = `img/${color}_car.png`; // Assuming car images are named like green_car.png
            carImage.alt = `${color} car`; // Set alt text for accessibility
            carImage.classList.add('car-image'); // Add class for styling the image
    
            patternRow.appendChild(carImage); // Add the car image to the pattern row
        });
    }

});
