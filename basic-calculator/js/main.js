let storedOperation = "";
let storedValue = "";
let displayValue = 0;

(function () {
    const buttonArray = document.getElementsByClassName("button");

    Array.from(buttonArray).forEach(element => {
        if (!isClass(element, "operation")) {
            element.addEventListener('click' , buildDisplayValue , false );
        } else {
            element.addEventListener('click' , calculateAnswer , false );
        }
    });
})();

function calculateAnswer() {
    let clickInnerText = this.innerText;
    let equals = isClass(this, 'equals');
    let clear = isClass(this, 'clear');
    
    if (clear) {
        storedValue = "";
        displayValue = 0;
        updateDisplay(displayValue);
    } else {
        if (storedValue !== "") {
            displayValue = calculateSum(storedOperation);
            storedOperation = clickInnerText;
            updateDisplay(displayValue);
        } else {
            storedOperation = clickInnerText;
        }
        if (!equals) {
            storedValue = displayValue;
            displayValue = 0;
        } else {
            storedValue = "";
        }
    } 
        
}

function buildDisplayValue() {
    let plusOrMinus = isClass(this, 'plus-or-minus');
    let clickInnerText = this.innerText;

    if (storedOperation === "=" && !plusOrMinus) {
        storedValue = displayValue;
        displayValue = 0;
        storedOperation = "";
    }

    if (plusOrMinus) {
        if (String(displayValue).charAt(0) === "-") {
            displayValue = String(displayValue).slice(1);
        } else if (displayValue != 0) {
            displayValue = "-" + displayValue;
        } else {
            
        }
    } else {
        if (displayValue == 0) {
            displayValue = clickInnerText;
        } else {
            displayValue += clickInnerText;
        }
    }
    
    updateDisplay(roundToFour(displayValue));
}

function calculateSum(string) {
    let displayValueAsFloat = parseFloat(displayValue);
    let storedValueAsFloat = parseFloat(storedValue);

    switch(string) {
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
    return roundToFour(storedValueAsFloat);
}

function roundToFour(num) { 
    if (isNaN(num)) {
        return num;
    }   
    return +(Math.round(num + "e+4")  + "e-4");
}

function isClass(element, string) {
    return element.classList.contains(string) ? true : false;
}

function updateDisplay(displayValue) {
    document.querySelector("h1").innerHTML = displayValue;
}