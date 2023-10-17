function add(a,b){
    return a+b;
}
function substract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}

function operate(number1,number2,operator){
    let result;
    switch(operator){
        case "+":
            result= add(number1,number2);
            break;
        case "-":
            result= substract(number1,number2);
            break;
        case "*":
            result= multiply(number1,number2);
            break;
        case "/":
            result= divide(number1,number2);
            break;
        default:
            result= "wrong choice of operator";
    }
    return result;
}
//console.log( operate(23,20) );



