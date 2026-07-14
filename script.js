let keyboardElem = document.querySelector(".keyboard");
let output = document.querySelector("output");
let firstArgumentElem = document.querySelector("#firstArgument");
let operatorElem = document.querySelector("#operator");

let isResult = false;
let firstArgument = null;
let secondArgument = null;
let operator = null;

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
