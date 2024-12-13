// script.js

// Selecting Elements
const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const acButton = document.getElementById('ac');
const equalsButton = document.getElementById('equals');
const decimalButton = document.getElementById('decimal');
const squareButton = document.getElementById('square');
const percentButton = document.getElementById('percent');

// Calculator State
let currentInput = '';
let operator = '';
let previousInput = '';

// Function to update the display
function updateDisplay() {
    display.value = currentInput;
}

// Function to handle number input
function handleNumber(number) {
    currentInput += number;
    updateDisplay();
}

// Function to handle operator input
function handleOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

// Function to handle decimal input
function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

// Function to handle square operation
function handleSquare() {
    if (currentInput === '') return;
    const squared = parseFloat(currentInput) ** 2;
    currentInput = squared.toString();
    updateDisplay();
}

// Function to handle percentage
function handlePercent() {
    if (currentInput === '') return;
    const percent = parseFloat(currentInput) / 100;
    currentInput = percent.toString();
    updateDisplay();
}

// Function to calculate result
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero');
                reset();
                return;
            }
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

// Function to reset calculator
function reset() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay();
}

// Event Listeners for Number Buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => handleNumber(button.getAttribute('data-value')));
});

// Event Listeners for Operator Buttons
operatorButtons.forEach(button => {
    button.addEventListener('click', () => handleOperator(button.getAttribute('data-value')));
});

// Event Listener for Decimal Button
decimalButton.addEventListener('click', handleDecimal);

// Event Listener for Square Button
squareButton.addEventListener('click', handleSquare);

// Event Listener for Percent Button
percentButton.addEventListener('click', handlePercent);

// Event Listener for AC Button
acButton.addEventListener('click', reset);

// Event Listener for Equals Button
equalsButton.addEventListener('click', calculate);

// Optional: Keyboard Support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key)) {
        handleNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperator(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Escape') {
        reset();
    } else if (key === '.') {
        handleDecimal();
    }
});
