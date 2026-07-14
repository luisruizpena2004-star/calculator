let keyboardElem = document.querySelector(".keyboard");
let output = document.querySelector("output");
let firstArgumentElem = document.querySelector("#firstArgument");
let operatorElem = document.querySelector("#operator");

let firstArgument = null;
let secondArgument = null;
let operator = null;

keyboardElem.addEventListener("click", (e) => {
    const elem = e.target;
    if (elem.nodeName !== "BUTTON") return;
    const elemType = elem.dataset.type;

    switch (elemType) {
        case "number":
            if (isNaN(output.textContent)) {
                operator = output.textContent;
                output.textContent = "";
            }
            output.textContent += elem.textContent;
            break;
        case "operator":
            break;
        case "decimal":
            if (output.textContent.includes(".")) return;
            if (isNaN(output.textContent)) return;
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
            output.textContent = "";
            break;
    }
    if (firstArgument !== null) {
        firstArgumentElem.textContent = firstArgument;
    }
    if (operator !== null) {
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
    firstArgument = null;
    secondArgument = null;
    operator = null;
    output.textContent = result;
    return;
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
