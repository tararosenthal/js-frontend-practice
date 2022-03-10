let empty = "";
let storedOperator = empty;
let storedValue = empty;
let displayValue = "0";

(function () {
    const buttonArray = document.getElementsByClassName("button");

    Array.from(buttonArray).forEach(element => {
        if (!isClass(element, "operator")) {
            element.addEventListener("click", buildDisplayValue);
        } else {
            element.addEventListener("click", processOperator);
        }
    });
})();

function processOperator() {
    let clickedOperator = this.innerText;
    let clickedClearOperator = isClass(this, "clear");
    
    if (clickedClearOperator) {
        clearCalculator();
    } else {
        if (storedValue !== empty) {
            solveExpressionWithStoredValueAndDisplayValueUsingStoredOperator(storedOperator);
        }
        storeDisplayValueAndClickedOperator(clickedOperator);
    }
}

function buildDisplayValue() {
    let clickedPlusOrMinus = isClass(this, "plus-or-minus");
    let clickedDecimalPoint = isClass(this, "decimal-point");
    let clickedValue = this.innerText;

    if (storedOperator === "=" && !clickedPlusOrMinus) {
        storeDisplayValue();
        storedOperator = empty;
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

function solveExpressionWithStoredValueAndDisplayValueUsingStoredOperator(storedOperator) {
    let displayValueAsFloat = parseFloat(displayValue);
    let storedValueAsFloat = parseFloat(storedValue);

    switch(storedOperator) {
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
    storedOperator = empty;
    storedValue = empty;
    displayValue = "0";
    updateDisplay(displayValue);
}

function storeDisplayValueAndClickedOperator(clickedOperator) {
    let equalsOperator = "=";

    storedOperator = clickedOperator;

    if (clickedOperator != equalsOperator) {
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