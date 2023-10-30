
let firstOperand= "";  //first number in a operation couple: (a in a+b)
let secondOperand= ""; //second number in a operation couple: (b in a+b)
let currentOperator= null; //operator in a operation couple: (+ in a+b)
let shouldResetScreen= false; 
const allButtons= document.querySelectorAll("button");

const numberButtons= document.querySelectorAll(".digit");
const operatorButtons= document.querySelectorAll(".operator");
const resultButton= document.querySelector("#result");
const allClearButton= document.querySelector("#allClear");
const deleteButton= document.querySelector("#delete");
const dotButton= document.querySelector("#dot");
const lastOperationScreen= document.querySelector("#lastOperationScreen");
const currentOperationScreen= document.querySelector("#currentOperationScreen");

/////

numberButtons.forEach( button => 
    button.addEventListener("click",() => appendNumber(button.textContent))
)
operatorButtons.forEach( button =>
    button.addEventListener("click",() => setOperation(button.textContent))
)

resultButton.addEventListener("click",evaluate);
allClearButton.addEventListener("click",allClear);
deleteButton.addEventListener("click",deleteLast);
dotButton.addEventListener("click",appendDot);

/////

function appendNumber(number){
    if(currentOperationScreen.innerText==="" || shouldResetScreen)
        resetScreen();

    let currentNumber = parseFloat(currentOperationScreen.innerText);
    const largeNumberThreshold = 1e15; 
    if (Math.abs(currentNumber) >= largeNumberThreshold) {
        currentOperationScreen.innerText = "Infinity";
        return;
    }  
    
    currentOperationScreen.innerText += number;
}


function resetScreen(){ //clear the currentOperationScreen
    currentOperationScreen.innerText="";
    shouldResetScreen=false;
}

function setOperation(operator){ 
    if(currentOperator!==null) //everytime after 1st time
        evaluate();
    firstOperand= currentOperationScreen.innerText;
    currentOperator= operator;  //1st time
    lastOperationScreen.textContent= `${firstOperand} ${currentOperator}`;
    shouldResetScreen= true; //call resetScreen() just before next number is being appended
}

function evaluate(){
    if(currentOperator===null || shouldResetScreen)
        return;
    if(currentOperator==="÷" && currentOperationScreen.innerText==="0"){ //division by 0
        currentOperationScreen.innerText= "Infinity";
        return;
    }
    secondOperand= currentOperationScreen.innerText;
    currentOperationScreen.innerText=  roundOff( operate(firstOperand,secondOperand,currentOperator) ); 
    lastOperationScreen.innerText= `${firstOperand} ${currentOperator} ${secondOperand} =`;
    currentOperator= null;
}

function roundOff(number){
    return Math.round(number*1000)/1000;
}

function allClear(){
    currentOperationScreen.textContent= "";
    lastOperationScreen.textContent= "";
    firstOperand= "";
    secondOperand= "";
    currentOperator= null;
}

function deleteLast(){
    currentOperationScreen.innerText= currentOperationScreen.innerText.slice(0,-1);
}

function appendDot(){
    if(shouldResetScreen)
        resetScreen();
    if(currentOperationScreen.innerText==="")
        currentOperationScreen.innerText= "0";
    if(currentOperationScreen.innerText.includes("."))
        return;
    currentOperationScreen.innerText += ".";
}

/////

function operate(number1,number2,operator){
    number1= Number(number1);
    number2= Number(number2);
    switch(operator){ //break not needed as return used
        case "+":
            return number1 + number2;
        case "-":
            return number1 - number2;
        case "×":
            return number1 * number2;
        case "÷":
            if(number2===0)
                return null;
            else
                return number1 / number2;
        case "%":
            return number1 % number2;
        default:
            return null;
    }  
}

/////

allButtons.forEach( button => 
    button.addEventListener("click",() => {
        let audio= new Audio("keysound.mp3");
        audio.play();
    })
)

/////

window.addEventListener('keydown', handleKeyboardInput);
function handleKeyboardInput(e) {
    let audio= new Audio("keysound.mp3");
        audio.play();
    if (e.key >= 0 && e.key <= 9) 
        appendNumber(e.key);
    if (e.key === '.') 
        appendDot();
    if (e.key === '=' || e.key === 'Enter') 
        evaluate();
    if (e.key === 'Backspace') 
        deleteLast();
    if (e.key === 'Escape') 
        allClear();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        setOperation(convertOperator(e.key))
}
  
function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') 
        return '÷'
    if (keyboardOperator === '*') 
        return '×'
    if (keyboardOperator === '-') 
        return '-'
    if (keyboardOperator === '+') 
        return '+'
}