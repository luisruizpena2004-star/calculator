let firstArgument;
let secondArgument;
let operator;

function operate(a, b, operator) {
    switch (operator) {
        case "add":
            add(a, b);
            break;
        case "substract":
            substract(a, b);
            break;
        case "multiply":
            multiply(a, b);
            break;
        case "divide":
            divide(a, b);
            break;
    }
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
    return a / b;
}
