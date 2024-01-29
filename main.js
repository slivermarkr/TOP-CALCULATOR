const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const clearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equals = document.querySelector('[data-equals]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');
const decimal = document.querySelector('[data-decimal]');

function addition(x , y) {
    return x + y;
}
function subtract(x , y) {
    return x - y;
}
function multiply(x , y) {
    return x * y;
}
function divide(x , y) {
    return x / y;
}

let currentOperand = "";
let previousOperand = "";
let operator = undefined;

function operate(previousOperand,currentOperand,operator) {
    if(currentOperand === 0 && operator === "÷"){
        currentOperandText.textContent = "Error" 
        return currentOperandText.textContent;
    };
    switch(operator){
        case "+": 
        return addition(previousOperand,currentOperand);
        break;

        case "-": 
        return subtract(previousOperand,currentOperand);
        break;

        case "*": 
        return multiply(previousOperand,currentOperand);
        break;

        case "÷": 
        return divide(previousOperand,currentOperand);
        break;

        default:
            return;
    } 
}

function appendNumber(event){
    let number = event.target.textContent;
    if(number === "." && currentOperandText.textContent.includes('.'))return;
    currentOperandText.textContent += number;
}
numberButtons.forEach(number => {
    number.addEventListener('click',appendNumber)
})

function chooseOperator(e) {   
            if(currentOperandText.textContent === "") return;
            if(currentOperandText.textContent != "" && previousOperandText.textContent != "") {
                calculate();
            }
            target = e.target;
            operator = target.textContent;
            previousOperand = currentOperandText.textContent;
            previousOperandText.textContent =`${ currentOperandText.textContent} ${operator}`;
            currentOperandText.textContent = ""; 
}

operatorButtons.forEach(operator => {
    operator.addEventListener('click',chooseOperator)
})

function clearAll() {
        currentOperandText.textContent = "";
        previousOperandText.textContent = "";
        operator = undefined;
}

equals.addEventListener('click',calculate)

function calculate(){
    if(previousOperand === "") return currentOperand;
    previousOperand = +previousOperand;
    currentOperand = +(currentOperandText.textContent);
    let result = operate(previousOperand, currentOperand, operator);
    currentOperandText.textContent = result;
    previousOperandText.textContent = "";
    operator = undefined;
}
clearButton.addEventListener('click',clearAll);

deleteButton.addEventListener('click',del)

function del(){
    currentOperandText.textContent = currentOperandText.textContent.slice(0,-1);
}
