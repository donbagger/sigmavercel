const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const Errusername = document.getElementById('username-error');
const Erremail = document.getElementById('email-error');
const Errpassword = document.getElementById('password-error');
const Errpassword2 = document.getElementById('password2-error');
const SubmitButton = document.getElementById('submit-button');

function isValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  document.getElementById('submit-button').addEventListener('click', (e) => {
    e.preventDefault();
    validateInputs ();
  });
function validateInputs() {
    let isValid = true;

    Errusername.style.display = "none";
    Erremail.style.display = "none";
    Errpassword.style.display = "none";
    Errpassword2.style.display = "none";

    let x = username.value;
    if (x === "") {
        Errusername.style.display ="inline";
        isValid = false;
    } else { };

    let y = email.value;
    if (y === "") {
        Erremail.style.display ="inline";
        isValid = false;
    } else { if (isValidEmail(y) === true) {
        
    }else {alert("provided email is incorrect");
        isValid = false;
    }
};

    let z = password.value;
    if (z === "") {
        Errpassword.style.display ="inline";
        isValid = false;
    } else { if (z.length > 7) {
    } else {
alert ("Password must be at least 8 characters")
    }};

    let w = password2.value;
    if (w === "") {
        Errpassword2.style.display ="inline";
        isValid = false;
    } else { if (w === z) {
        
    } else {
alert ("Passwords dont match!");
isValid = false;
    }};

    if(isValid) {
        alert("Form succesfully submitted");
        location.reload();
    }
}

