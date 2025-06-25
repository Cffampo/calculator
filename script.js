
// Setting our global variables
let currentDisplayValue = '';
let firstNumber = '';
let secondNumber = '';
let operator = null;
let resultDisplayed = false;


function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1-num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    if(num2 === 0){
        return "ERROR!";
    }

    return parseFloat((num1 / num2).toFixed(5));
}


function operate(operator, num1, num2){

    if(operator == "+"){
        return add(num1, num2);
    } else if (operator == "-"){
        return subtract(num1, num2);
    } else if (operator == "*"){
        return multiply(num1, num2)
    } else if (operator == "/"){
        return divide(num1, num2);
    }
}

// Grab our elements

const display = document.querySelector('.display');

const digits = document.querySelectorAll('.digit');

const operators = document.querySelectorAll('.operator');

const clear = document.querySelector('#clear');

digits.forEach(function(button) {
    button.addEventListener('click', function() {

        if(resultDisplayed && operator === null){
            firstNumber = '';
            secondNumber = '';
            display.textContent = '';
            resultDisplayed = false;
        }

        if(operator === null){
            firstNumber += button.textContent;
            display.textContent = firstNumber;
        } else {
            secondNumber += button.textContent
            display.textContent = firstNumber + " " + operator + " " + secondNumber;
        }
    });
});


operators.forEach(function(button){
    button.addEventListener('click', function(){

        if(button.textContent == "="){
            // Grab the two numbers
            const num1 = parseFloat(firstNumber);
            const num2 = parseFloat(secondNumber);

            // Call the operate function
            const result = operate(operator, num1, num2)
            display.textContent = result

            // Update display and numbers
            firstNumber = result.toString();
            secondNumber = '';
            operator = null;
            resultDisplayed = true;
            
        } else {
            if(operator !== null && secondNumber === ''){
                // User pressed a new operator before entering second number
                operator = button.textContent;
            } else if (firstNumber !== '' && operator !== null && secondNumber !== ''){
                // Both numbers and operator present, do calculation then chain
                const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
                display.textContent = result;
                firstNumber = result.toString();
                secondNumber = '';
                operator = button.textContent;
            } else {
                // No operator yet, just set it
                operator = button.textContent;
                display.textContent = firstNumber + " " + operator;
            }

        }
    })
})

// Clears the display and resets the numbers
clear.addEventListener('click', function(){
    firstNumber = '';
    secondNumber = '';
    operator = null;
    display.textContent = '';
})