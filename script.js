const keyboardElem = document.querySelector(".keyboard");
const output = document.querySelector("output");
const firstArgumentElem = document.querySelector("#firstArgument");
const operatorElem = document.querySelector("#operator");

const numberBtnElems = document.querySelectorAll("button[data-type='number']");
const operatorBtnElems = document.querySelectorAll(
    "button[data-type='operator']",
);
const clearBtnElem = document.querySelector("button[data-type='clear']");
const backspaceBtnElem = document.querySelector("button[data-type='backspace'");
const decimalBtnElem = document.querySelector("button[data-type='decimal'");

const sortedNumberBtnElems = [...numberBtnElems].sort(
    (a, b) => Number(a.textContent) - Number(b.textContent),
);

const allowedOperatorKeys = ["+", "-", "*", "/", "Enter"];

let isResult = false;
let firstArgument = null;
let secondArgument = null;
let operator = null;

document.addEventListener("keydown", (e) => {
    const keyName = event.key;
    document.activeElement.blur();

    if (!isNaN(keyName)) {
        if (keyName === " ") return;
        sortedNumberBtnElems
            .find((item) => item.textContent === keyName)
            .click();
    } else if (keyName === ".") {
        decimalBtnElem.click();
    } else if (keyName === "Backspace") {
        backspaceBtnElem.click();
    } else if (keyName === "Delete") {
        clearBtnElem.click();
    } else if (allowedOperatorKeys.includes(keyName)) {
        switch (keyName) {
            case "+":
                operatorBtnElems[0].click();
                break;
            case "-":
                operatorBtnElems[1].click();
                break;
            case "*":
                operatorBtnElems[2].click();
                break;
            case "/":
                operatorBtnElems[3].click();
                break;
            case "Enter":
                operatorBtnElems[4].click();
                break;
        }
    }
});

keyboardElem.addEventListener("click", (e) => {
    const elem = e.target;
    if (elem.nodeName !== "BUTTON") return;
    const elemType = elem.dataset.type;
    const isOperator = isNaN(output.textContent);

    switch (elemType) {
        case "number":
            if (isOperator) {
                operator = output.textContent;
                output.textContent = "";
            }
            if (isResult) {
                output.textContent = elem.textContent;
                isResult = false;
            } else {
                output.textContent += elem.textContent;
            }
            break;
        case "operator":
            if (
                elem.textContent === "=" &&
                (firstArgument === null || operator === null)
            ) {
                return;
            }
            if (output.textContent === "") return;
            if (isOperator) {
                if (elem.textContent !== "=") {
                    output.textContent = elem.textContent;
                }
            } else {
                if (firstArgument === null) {
                    firstArgument = Number(output.textContent);
                    if (elem.textContent !== "=") {
                        output.textContent = elem.textContent;
                    }
                } else {
                    let result;
                    secondArgument = Number(output.textContent);
                    result = operate(firstArgument, secondArgument, operator);
                    if (elem.textContent !== "=") {
                        firstArgument = result;
                        operator = elem.textContent;
                    }
                }
            }
            break;
        case "decimal":
            if (output.textContent.includes(".")) return;
            if (isOperator) return;
            if (output.textContent === "") return;
            output.textContent += ".";
            break;
        case "backspace":
            if (output.textContent !== "") {
                output.textContent = output.textContent.slice(0, -1);
            }
            break;
        case "clear":
            firstArgument = null;
            secondArgument = null;
            operator = null;
            isResult = false;
            output.textContent = "";
            break;
    }

    if (firstArgument === null) {
        firstArgumentElem.textContent = "";
    } else {
        firstArgumentElem.textContent = firstArgument;
    }
    if (operator === null) {
        operatorElem.textContent = "";
    } else {
        operatorElem.textContent = operator;
    }
});

function operate(a, b, op) {
    let result;
    switch (op) {
        case "+":
            result = add(a, b);
            break;
        case "−":
            result = substract(a, b);
            break;
        case "×":
            result = multiply(a, b);
            break;
        case "÷":
            result = divide(a, b);
            break;
    }
    if (result === "Error") return;
    result = +result.toFixed(4);
    isResult = true;
    firstArgument = null;
    secondArgument = null;
    operator = null;
    output.textContent = result;
    return result;
}

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        alert("Can't divide by 0!");
        secondArgument = null;
        output.textContent = "";
        return "Error";
    }
    return a / b;
}
