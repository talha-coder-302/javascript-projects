const lowerSet = "abcdefghijklmnopqrstuvwxyz";
const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberSet = "0123456789";
const symbolSet = "!@#$%^&*";

const generateButton = document.getElementById("generate-btn");
const passwordStatus = document.getElementById("password-status");
const passwordBox = document.getElementById("password");
const totalChar = document.getElementById("password-length");
const upperInput = document.getElementById("upperCase");
const lowerInput = document.getElementById("lowerCase");
const numberInput = document.getElementById("numbers");
const symbolInput = document.getElementById("symbols");
const copyPassword = document.getElementById("copy-password-btn");

const getRandomData = (dataSet) => {
    // return dataSet[Math.floor(Math.random() * dataSet.length)]

    const dataSetLength = dataSet.length; // Length of the dataset
    
    const randomIndex = Math.floor(Math.random() * dataSetLength); // Random index
    
    const randomData = dataSet[randomIndex]; // Data at the random index
    
    return randomData; // Return the random data
}


// console.log(getRandomData(upperSet));
// console.log(getRandomData(lowerSet));
// console.log(getRandomData(numberSet));
// console.log(getRandomData(symbolSet));

const generatePassword = (password = "") => {

    if(upperInput.checked) {
        password += getRandomData(upperSet);
    }

    if(lowerInput.checked) {
        password += getRandomData(lowerSet);
    }

    if(numberInput.checked) {
        password += getRandomData(numberSet);
    }

    if(symbolInput.checked) {
        password += getRandomData(symbolSet);
    }

    if (password.length < totalChar.value) {
        return generatePassword(password)
    }

    passwordBox.innerText = truncateString(password, totalChar.value);
    console.log("Password is: ", truncateString(password, totalChar.value));

    if (password.length <= 4) {
        passwordStatus.style.backgroundColor = "red";
        passwordStatus.innerText = "less";
    } else if (password.length >= 5 && password.length <= 8) {
        passwordStatus.style.backgroundColor = "grey";
        passwordStatus.innerText = "medium";

    } else if (password.length >= 9 && password.length <= 12) {
        passwordStatus.style.backgroundColor = "black";
        passwordStatus.innerText = "good";

    } else {
        passwordStatus.style.backgroundColor = "green";
        passwordStatus.innerText = "strong";

    }
}

function truncateString(str, num) {
    if (str.length > num) {
        let subStr = str.substring(0, num)
        return subStr;
    } else {
        return str;
    }
}


generateButton.addEventListener("click", function() {
    if (!upperInput.checked && !lowerInput.checked && !numberInput.checked && !symbolInput.checked) {
        console.log("Please choose an Input")
        alert("Please choose an Input")
    }
    generatePassword();
});

copyPassword.addEventListener("click", function copyPasswordValue() {
    const password = passwordBox.innerText; // Get the generated password from the passwordBox

    if (!password || password === "generated password") {
        alert("No password to copy! Please generate a password first.");
        return;
    }

    navigator.clipboard.writeText(password)
        .then(() => {
            alert("Password copied to clipboard!");
        })
        .catch((error) => {
            console.error("Failed to copy password: ", error);
        });
});


// Automatically generate password when length is changed
totalChar.addEventListener("input", function () {
    if (!upperInput.checked && !lowerInput.checked && !numberInput.checked && !symbolInput.checked) {
        alert("Please choose at least one character type");
        return;
    }
    generatePassword();
});