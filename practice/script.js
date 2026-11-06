
const display = document.getElementById("display");

let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

function appendNumber(number) {

    if (waitingForSecondNumber) {
        display.value = number === "." ? "0." : number;
        waitingForSecondNumber = false;
        return;
    }

    if (number === "." && display.value.includes(".")) {
        return;
    }

    if (display.value === "0" && number !== ".") {
        display.value = number;
    } else {
        display.value += number;
    }
}

function chooseOperator(op) {

    if (operator && !waitingForSecondNumber) {
        calculate();
    }

    firstNumber = parseFloat(display.value);
    operator = op;
    waitingForSecondNumber = true;
}

function calculate() {

    if (operator === null || waitingForSecondNumber) {
        return;
    }

    const secondNumber = parseFloat(display.value);
    let result;

    switch (operator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":
            if (secondNumber === 0) {
                display.value = "Error";
                firstNumber = null;
                operator = null;
                waitingForSecondNumber = true;
                return;
            }
            result = firstNumber / secondNumber;
            break;
    }

    display.value = Number(result.toPrecision(12)).toString();

    firstNumber = null;
    operator = null;
    waitingForSecondNumber = true;
}

function clearDisplay() {
    display.value = "0";
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
}

function deleteLast() {

    if (waitingForSecondNumber) return;

    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = "0";
    }
}

function percentage() {
    if (display.value !== "Error") {
        display.value = (
            parseFloat(display.value) / 100
        ).toString();
    }
}

