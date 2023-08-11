function factor (num){
    let factorArray = [];
    if(!Number(num) || Math.abs(Number(num)) % 1 !== 0){
        clear();
        document.querySelector('.js-solution').innerHTML = 'Invalid!';
        return;
    }
    let count = 1;
    for(let i = 1; i<=Math.floor(num**0.5); i++){
        if(num % i == 0){
            factorArray.splice(count-1, 0, i);
            if(i !== num/i){
                factorArray.splice(factorArray.length-count+1, 0, num/i);
            }
            count++;
        }
    }

    clear();
    document.querySelector('.js-solution').innerHTML = factorArray.join(', ');
}

document.querySelector('.js-factor').addEventListener("click", () =>{
    let num = computeNumbers();
    //let num = Number(document.querySelector('.js-calculation-line').innerText);
    factor(num);
})



function primeFactor (num){
    let primes = new Map;
    if(!Number(num) || Math.abs(Number(num)) % 1 !== 0){
        clear();
        document.querySelector('.js-solution').innerHTML = 'Invalid!';
        return;
    }
    
    let i = 2;
    while(num > 1){
        if(num % i === 0){
            if(primes.has(`${i}`)){
                primes.set(`${i}`, primes.get(`${i}`) + 1);
            } else {
                primes.set(`${i}`, 1);
            }
            num/= i;
            continue;
        }
        i++;
    }
    console.log(primes);
    let result = ``;

    primes.forEach((value, key) => {
        result += `, ${key}^${value}`;
    })

    result = result.slice(2, result.length);

    console.log(result);
    clear();
    document.querySelector('.js-solution').innerHTML = result;
}

document.querySelector('.js-prime-factor').addEventListener("click", () =>{
    let num = computeNumbers();
    //let num = Number(document.querySelector('.js-calculation-line').innerText);
    primeFactor(num);
})



function gcd(num1, num2) {
    [num1, num2] = num2 > num1 ? [Math.abs(num2), Math.abs(num1)] : [Math.abs(num1), Math.abs(num2)];
    while(num1 && num2){
        let mod = num1 % num2;
        num1 = num2;
        num2 = mod;
    }
    return num1;
}
document.querySelector('.js-GCD').addEventListener("click", () =>{
    if(Math.abs(Number(solutionArray[solutionArray.length-1])) + 1){
        solutionArray.push('gcd');
        formingDecimal = false;
        removeDecimal();
        displayCalculationLine();
        document.querySelector('.js-solution').innerHTML = '';
    }
})


function lcm(num1, num2){
    return (num1*num2)/(gcd(num1, num2));
}
document.querySelector('.js-LCM').addEventListener("click", () =>{
    if(Math.abs(Number(solutionArray[solutionArray.length-1])) + 1){
        solutionArray.push('lcm');
        formingDecimal = false;
        removeDecimal();
        displayCalculationLine();
        document.querySelector('.js-solution').innerHTML = '';
    }
})
