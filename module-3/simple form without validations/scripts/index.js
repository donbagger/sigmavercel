const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const SubmitButton = document.getElementById('submit-button');


function isValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function setError(input, message) {
    const inputControl = input.parentElement; 
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.textContent = message; 
    errorDisplay.style.display = "inline"; 
    inputControl.classList.add('error');
    inputControl.classList.remove('success'); 
}

function setSuccess(input) {
    const inputControl = input.parentElement; 
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.style.display = "none"; 
    inputControl.classList.add('success'); 
    inputControl.classList.remove('error'); 
}

SubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
    validateInputs(); 
});

function validateInputs() {
    let isValid = true; 

    // Username validation
    let x = username.value.trim();
    if (x === "") {
        setError(username, "Username cannot be blank");
        isValid = false;
    } else {
        setSuccess(username);
    }

    // Email validation
    let y = email.value.trim();
    if (y === "") {
        setError(email, "Email cannot be blank");
        isValid = false;
    } else if (!isValidEmail(y)) {
        setError(email, "Invalid email format");
        isValid = false;
    } else {
        setSuccess(email);
    }

    // Password validation
    let z = password.value;
    if (z === "") {
        setError(password, "Password cannot be blank");
        isValid = false;
    } else if (z.length < 8) {
        setError(password, "Password must be at least 8 characters");
        isValid = false;
    } else {
        setSuccess(password);
    }

    // Confirm password validation
    let w = password2.value;
    if (w === "") {
        setError(password2, "Please confirm your password");
        isValid = false;
    } else if (w !== z) {
        setError(password2, "Passwords do not match");
        isValid = false;
    } else {
        setSuccess(password2);
    }

    if (isValid) {
        alert("Form is successfully validated!"); 
        location.reload(); 
    }
}
