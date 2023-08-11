let chars = document.querySelectorAll('.js-digit, .js-operator');
let solution =``;
let solutionArray = [];
let previousAnswer;
let formingDecimal = false;
let parenOpen = false;


//clear button
function clear(){
    solutionArray = [];
    document.querySelector('.js-solution').innerHTML = '';
    document.querySelector('.js-calculation-line').innerHTML = '';
    previousAnswer = Math.abs(Number(previousAnswer))+1 ? previousAnswer : "cleared";
    formingDecimal = false;
    parenOpen = false;
    console.clear();
}
document.querySelector('.js-clear').addEventListener("click", () => {
    clear();
    console.log(previousAnswer);
})

//insert previous answer
function previous(){
    if(Number(previousAnswer) || previousAnswer == 0){
        if(solutionArray[0] === previousAnswer && solutionArray.length === 1){
            solutionArray = [previousAnswer];
        }else if(!Math.abs(Number(solutionArray[solutionArray.length-1]) + 1)){
            solutionArray.push(previousAnswer);
        }
        document.querySelector('.js-solution').innerHTML = '';
        displayCalculationLine();
    }
}
document.querySelector('.js-previous').addEventListener("click", () => {
    previous();
})

//displaying calculations
function displayCalculationLine(){
    document.querySelector('.js-calculation-line').innerHTML = solutionArray.join(' ');
}

//creating negative numbers
function negativeNumber(){
    if(Number(solutionArray[solutionArray.length-1])){
        document.querySelector('.js-solution').innerHTML = '';
        solutionArray[solutionArray.length-1] *= -1;
        document.querySelector('.js-calculation-line').innerHTML = solutionArray.join(' ');
    } 
}
document.querySelector('.js-negative').addEventListener("click", () =>{
    negativeNumber();
})


//decimal numbers

function decimal(){
    document.querySelector('.js-solution').innerHTML = '';

    if(!formingDecimal){
        solutionArray.push('.');
        //console.log(solutionArray);
    }
    let len = solutionArray.length;

    if(Math.abs(Number(solutionArray[len-2]) + 1)){
        let decimalNumber = `${solutionArray[len-2]}.`;
        solutionArray.splice(len-2, 2);
        solutionArray.push(decimalNumber);
        formingDecimal = true;
    } else if(!Number(solutionArray[len-2]) && solutionArray[len-2] != 0 && !formingDecimal){
        solutionArray[len-1] = '0.';
        formingDecimal = true;
    }

    displayCalculationLine();


}
document.querySelector('.js-decimal').addEventListener("click", () =>{
    decimal();
})

function removeDecimal() {
    let len = solutionArray.length;
    if(Number(solutionArray[len-2]) || solutionArray[len-2] == 0){
        solutionArray[len-2] = Number(solutionArray[len-2]);
    }
}


function log(){
    if(Number(solutionArray[solutionArray.length-1]) || Number(solutionArray[solutionArray.length-1]) == 0){
        document.querySelector('.js-solution').innerHTML = '';
        solutionArray.splice(solutionArray.length-1, 0, 'log');
        console.log(solutionArray);
        document.querySelector('.js-calculation-line').innerHTML = solutionArray.join(' ');
    } 
}
document.querySelector('.js-log').addEventListener("click", () =>{
    log();
})



//keybinds
document.querySelector('body').addEventListener("keydown", (event) => {
    for(let i = 0; i<= 9; i++){
        if(event.key == i){
            const element = document.getElementById(`${i}`);
            element.classList.add('digit-click');
            calculate(i);
        }
    }

    switch (event.key) {
        case '*':
        case '/':
        case '+':
        case '-':
        case '=':
        case '^':
        case '%':
          document.getElementById(`${event.key}`).classList.add('operator-click');
          calculate(event.key);
          break;
        case 'l':
          document.getElementById(`l`).classList.add('operator-click');
          log();
          break;
        case 'Backspace':
          document.getElementById(`Backspace`).classList.add('function-click');
          clear();
          break;
        case '_':
          document.getElementById(`_`).classList.add('digit-click');
          negativeNumber();
          break;
        case '.':
          document.getElementById(`.`).classList.add('digit-click');
          decimal();
          break;
        case 'p':
          document.getElementById(`p`).classList.add('function-click');
          previous();
          break;
      }      
})

document.querySelector('body').addEventListener("keyup", (event) => {
    for(let i = 0; i<= 9; i++){
        if(event.key == i){
            const element = document.getElementById(`${i}`);
            element.classList.remove('digit-click');
        }
    }

    switch (event.key) {
        case '*':
        case '/':
        case '+':
        case '-':
        case '=':
        case '^':
        case '%':
          document.getElementById(`${event.key}`).classList.remove('operator-click');
          break;
        case 'l':
          document.getElementById(`l`).classList.remove('operator-click');
          break;
        case 'Backspace':
          document.getElementById(`Backspace`).classList.remove('function-click');
          break;
        case '_':
          document.getElementById(`_`).classList.remove('digit-click');
          break;
        case '.':
          document.getElementById(`.`).classList.remove('digit-click');
          break;
        case 'p':
          document.getElementById(`p`).classList.remove('function-click');
          break;
      }      
})

//creates event listeners for every digit and operator button
chars.forEach((button) => {
    button.addEventListener("click", () => {
        let char = button.textContent;
        calculate(char);
    })
});


function calculate(char) {
    console.log(solutionArray);
    document.querySelector('.js-solution').innerHTML = '';

    solutionArray.push(char);

    let len = solutionArray.length;

    //if a number is input after a solution, or if previous solution is invalid, it starts a new calculation. otherwise, it just adds onto previous solution.
    console.log("prev: " + previousAnswer);
    if(previousAnswer === 'Invalid!'){
        solutionArray = [char];
    } else if(solutionArray[0] === previousAnswer && solutionArray.length === 2 && Math.abs(Number(char) + 1)){
        solutionArray = [char];
    }


    //once an operator is chosen the decimal is no longer being made and can be changed
    if(!Number(char) && char != 0){
        formingDecimal = false;
        //removes decimal from cases like 5. into just 5 when an operator is chosen
        removeDecimal();
    }

    //merges numbers if operator is not pressed
    
    if(Math.abs(Number(solutionArray[len-1]) + 1) && Math.abs(Number(solutionArray[len-2]) + 1) && !formingDecimal){
        //console.log('lcm');
        let mergeNumber = Number(String(solutionArray[len-2]) + String(solutionArray[len-1])); 
        solutionArray.splice(len-2, 2);
        solutionArray.push(mergeNumber);
    } else if(Math.abs(solutionArray[len-1])+1 && formingDecimal){
        let mergeNumber = String(solutionArray[len-2]) + String(solutionArray[len-1]);
        solutionArray.splice(len-2, 2);
        solutionArray.push(mergeNumber);
        console.log(mergeNumber);
    } else if(Number(solutionArray[len-1]) + 1 && solutionArray[len-2] === ')'){
        solutionArray.pop();
    }

    
    //makes gcd and lcm format prettier
    if(solutionArray[len-2] === 'gcd' && Math.abs(Number(solutionArray[len-1])) + 1){
        solutionArray.splice(len-3, 3, 'gcd', '(', Number(solutionArray[len-3]) , ',', Number(solutionArray[len-1]), ')');     
    } else if(solutionArray[len-2] === 'lcm' && Math.abs(Number(solutionArray[len-1])) + 1){
        solutionArray.splice(len-3, 3, 'lcm', '(', Number(solutionArray[len-3]) , ',', Number(solutionArray[len-1]), ')');     
    }

    //displays calculation line
    console.log(solutionArray); 
    displayCalculationLine();
    

    //once equal is pressed, solution according to pemdas is computed
    if(solutionArray[len-1] == `=`){ 

        let computed = computeNumbers();
        //rounds to nearest 6 to avoid overflow error
        if(Number(computed)){
            computed = Math.round(computed*(10**10))/(10**10);
        }

        console.log(computed);
        document.querySelector('.js-solution').innerHTML = computed;
        solutionArray = [computed];
        previousAnswer = computed;
    }

    
}


function computeNumbers() {

    if(solutionArray[0] !== 'Invalid!' && solutionArray.length > 1){
        solutionArray.forEach((char, index) => {
            //catches invalid cases like '**' or '+8+'
            if(solutionArray[0] !== 'Invalid!'){
                
                if(char === 'gcd'){
                    let gcdResult;
                    if((Math.abs(Number(solutionArray[index+2]))+1) % 1 === 0 && (Math.abs(Number(solutionArray[index+4]))+1) % 1 === 0 && solutionArray[index+1] === '('){
                        gcdResult = gcd(Number(solutionArray[index+2]), Number(solutionArray[index+4]));
                        solutionArray.splice(index, 6, gcdResult);
                    } else {
                        solutionArray = ['Invalid!'];
                    }
                    
                    computeNumbers();
                }
                else if(char === 'lcm'){
                    let lcmResult;
                    if((Math.abs(Number(solutionArray[index+2]))+1) % 1 === 0 && (Math.abs(Number(solutionArray[index+4]))+1) % 1 === 0 && solutionArray[index+1] === '('){
                        lcmResult = lcm(Number(solutionArray[index+2]), Number(solutionArray[index+4])) || 0;
                        solutionArray.splice(index, 6, lcmResult);
                    } else {
                        solutionArray = ['Invalid!'];
                    }
                
                    computeNumbers();
                }
                
            }
        })
    }

    if(solutionArray[0] !== 'Invalid!' && solutionArray.length > 1){
        solutionArray.forEach((char, index) => {
            if(solutionArray[0] !== 'Invalid!'){

                if(!(Math.abs(Number(solutionArray[index]))+1) && !(Math.abs(Number(solutionArray[index+1]))+1) && !(Math.abs(Number(solutionArray[index-1]))+1)){
                    solutionArray = ['Invalid!'];
                }
                else if(char === '^'){
                    let expResult = Number(solutionArray[index-1]) ** Number(solutionArray[index+1]);
                    

                    if(!expResult){
                        expResult = expResult == 0 ? expResult : 'Invalid!';
                        if(expResult === 'Invalid!'){
                            solutionArray = ['Invalid!'];
                        }
                    }
                    

                    solutionArray.splice(index-1, 3, expResult);
                    computeNumbers();
                }
                else if(char === 'log'){
                    let logResult = Math.log10(Number(solutionArray[index+1]));
                    

                    if(!logResult){
                        logResult = logResult == 0 ? logResult : 'Invalid!';
                        if(logResult === 'Invalid!'){
                            solutionArray = ['Invalid!'];
                        }
                    }
                    

                    solutionArray.splice(index, 2, logResult);
                    computeNumbers();
                }
                
            }
        })
    }

    if(solutionArray[0] !== 'Invalid!' && solutionArray.length > 1){
        solutionArray.forEach((char, index) => {
            if(char === '*'){
                let multResult = Number(solutionArray[index-1]) * Number(solutionArray[index+1]);
                

                if(!multResult){
                    multResult = multResult == 0 ? multResult : 'Invalid!';
                    if(multResult === 'Invalid!'){
                        solutionArray = ['Invalid!'];
                    }
                }

                solutionArray.splice(index-1, 3, multResult);
                computeNumbers();
            
            } else if (char === '/'){
                let divResult = Number(solutionArray[index-1]) / Number(solutionArray[index+1]);

                if(!divResult){
                    divResult = divResult == 0 ? divResult : 'Invalid!';
                    if(divResult === 'Invalid!'){
                        solutionArray = ['Invalid!'];
                    }
                } 
                
                solutionArray.splice(index-1, 3, divResult);
                computeNumbers();
                
            } else if (char === '%'){
                let modResult = Number(solutionArray[index-1]) % Number(solutionArray[index+1]);
                
                modResult = modResult >= 0 ? modResult : modResult + Number(solutionArray[index+1]);
        
                
                if(!modResult){
                    modResult = modResult == 0 ? modResult : 'Invalid!';
                    if(modResult === 'Invalid!'){
                        solutionArray = ['Invalid!'];
                    }
                } 
                
                solutionArray.splice(index-1, 3, modResult);
                console.log(solutionArray);
                computeNumbers();
                
            } 
        })
    }

    if(solutionArray[0] !== 'Invalid!' && solutionArray.length > 1){

        solutionArray.forEach((char, index) => {
            if(char === '+'){
                let addResult = Number(solutionArray[index-1]) + Number(solutionArray[index+1]);

                if(!addResult){
                    addResult = addResult === 0 ? addResult : 'Invalid!';
                    if(addResult === 'Invalid!'){
                        solutionArray = ['Invalid!'];
                    }
                }
                
                solutionArray.splice(index-1, 3, addResult);
                computeNumbers();
                

                
            } else if (char === '-'){
                let subResult = Number(solutionArray[index-1]) - Number(solutionArray[index+1]);

                if(!subResult){
                    subResult = subResult == 0 ? subResult : 'Invalid!';
                    if(subResult === 'Invalid!'){
                        solutionArray = ['Invalid!'];
                    }
                }
                
                solutionArray.splice(index-1, 3, subResult);
                computeNumbers();
                
            }      
        })
    }

    console.log(solutionArray);
    formingDecimal = true;
    //returns first element which is either the solution or invalid
    return solutionArray[0];
}
