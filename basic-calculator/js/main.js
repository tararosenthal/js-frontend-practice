let empty = "";
let storedOperation = empty;
let storedValue = empty;
let displayValue = "0";

(function () {
    const buttonArray = document.getElementsByClassName("button");

    Array.from(buttonArray).forEach(element => {
        if (!isClass(element, "operation")) {
            element.addEventListener("click", buildDisplayValue);
        } else {
            element.addEventListener("click", processOperation);
        }
    });
})();

function processOperation() {
    let clickedOperation = this.innerText;
    let clickedClearOperation = isClass(this, "clear");
    
    if (clickedClearOperation) {
        clearCalculator();
    } else {
        if (storedValue !== empty) {
            solveEquationWithStoredValueAndDisplayValueUsingStoredOperation(storedOperation);
        }
        storeDisplayValueAndClickedOperation(clickedOperation);
    }
}

function buildDisplayValue() {
    let clickedPlusOrMinus = isClass(this, "plus-or-minus");
    let clickedDecimalPoint = isClass(this, "decimal-point");
    let clickedValue = this.innerText;

    if (storedOperation === "=" && !clickedPlusOrMinus) {
        storeDisplayValue();
        storedOperation = empty;
    }

    if (displayValue.length < 7) {
        if (clickedPlusOrMinus) {
            if (String(displayValue).charAt(0) === "-") {
                displayValue = String(displayValue).slice(1);
            } else if (displayValue != "0") {
                displayValue = "-" + displayValue;
            }
        } else {
            if (displayValue == "0") {
                if (!clickedDecimalPoint) {
                    displayValue = clickedValue;
                } else {
                    displayValue = "0.";
                }
            } else {
                if (!clickedDecimalPoint|| !String(displayValue).includes(".")) {
                    displayValue += clickedValue;
                }
            }
        }
    }
    updateDisplay(displayValue);
}

function solveEquationWithStoredValueAndDisplayValueUsingStoredOperation(storedOperation) {
    let displayValueAsFloat = parseFloat(displayValue);
    let storedValueAsFloat = parseFloat(storedValue);

    switch(storedOperation) {
        case "+" :
            storedValueAsFloat += displayValueAsFloat;
            break;
        case "-" :
            storedValueAsFloat -= displayValueAsFloat;
            break;
        case "*" :
            storedValueAsFloat *= displayValueAsFloat;
            break;
        case "/" :
            storedValueAsFloat /= displayValueAsFloat;
            break;
        default :
            return roundToFour(displayValueAsFloat);                
    }

    displayValue = roundToFourDecimals(storedValueAsFloat);
    updateDisplay(displayValue);
}

function roundToFourDecimals(num) { 
    //limit to 7 chars?
    if (isNaN(num)) {
        return num;
    }   
    return +(Math.round(num + "e+4")  + "e-4");
}

function clearCalculator() {
    storedOperation = empty;
    storedValue = empty;
    displayValue = "0";
    updateDisplay(displayValue);
}

function storeDisplayValueAndClickedOperation(clickedOperation) {
    let equalsOperation = "=";

    storedOperation = clickedOperation;

    if (clickedOperation != equalsOperation) {
        storeDisplayValue();
    } else {
        storedValue = empty;
    }
}

function storeDisplayValue() {
    storedValue = displayValue;
    displayValue = "0";
}

function isClass(element, string) {
    return element.classList.contains(string) ? true : false;
}

function updateDisplay(displayValue) {
    document.querySelector("h1").innerHTML = displayValue;
}