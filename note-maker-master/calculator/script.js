class Calculator{
  constructor(previousOperandTextElement, currentOperandTextElement){
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
}

clear(){
this.previousOperand = '';
this.currentOperand = '';
this.operation = undefined;
}
delete(){
this.currentOperand = this.currentOperand.toString().slice(0, -1);
}

appendNumber(number){
  if(number === '.' && this.currentOperand.includes('.')) return
this.currentOperand = this.currentOperand.toString() + number.toString();
}

chooseOperation(operation){
  if(this.currentOperand === '') return
  if(this.previousOperand !== ''){
    this.compute()
  }
this.operation = operation
this.previousOperand = this.currentOperand
this.currentOperand = ''

}

compute(){
let computation;
const prev = parseFloat(this.previousOperand);
const current = parseFloat(this.currentOperand);
if(isNaN(prev) || isNaN(current)) return

switch (this.operation){
  case '+':
    computation = prev + current;
    break;
  case '-':
    computation = prev - current;
    break;
  case '÷':
    computation = prev / current;
    break;
  case '×':
    computation = prev * current;
    break;
  default:
  return;
}
this.currentOperand = computation;
this.operation = undefined;
this.previousOperand = '';
}

getDisplayNumber(number){
  const stringNumber = number.toString()
  const intergerDigits = parseFloat(stringNumber.split('.')[0])
  const decimalDigits = stringNumber.split('.')[1]
  let intergerDisplay
  if(isNaN(intergerDigits)){
    intergerDisplay = ''
  } else {
    intergerDisplay = intergerDigits.toLocaleString('en', {
      maximumFractionDigits: 0
    })
  }
  if(decimalDigits != null){
    return `${intergerDisplay}.${decimalDigits}`
  } else {
    return intergerDisplay
  }
}
updateDisplay(){
this.currentOperandTextElement.innerText =
this.getDisplayNumber(this.currentOperand);
if(this.operation != null){
  this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
} else {
  this.previousOperandTextElement.innerText = '';
}

}
}



const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const delButton = document.querySelector('[data-delete]');
const acButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

//key press activation
document.addEventListener('keydown', (e) =>{
  //convert event key to a number
  let number = parseFloat(e.key);
  //filter out letters and un used keys
  if(e.key.length > 1 && e.key !== 'Enter' && e.key !== 'Backspace' && e.key !== 'Delete'){return};
  if(e.key == e.key.match(/[a-z]/i) || e.key === 'Space'){return}

  if(Number.isInteger(number)){
    calculator.appendNumber(number);
    calculator.updateDisplay()
  } else if(e.key === '.'){
    calculator.appendNumber(e.key);
    calculator.updateDisplay()
  } else {
    if(e.key === 'Enter'){
      calculator.compute();
      calculator.updateDisplay();
    } else if(e.key === 'Backspace'){
      calculator.delete();
      calculator.updateDisplay();
    } else if(e.key === 'Delete'){
      calculator.clear();
      calculator.updateDisplay();
    }  else {
      if(e.key === 'Enter'){return}
    else  if(e.key === '*'){
        calculator.chooseOperation('×')
        calculator.updateDisplay();
      } else if(e.key === '/'){
        calculator.chooseOperation('÷')
        calculator.updateDisplay();
      } else {
    calculator.chooseOperation(e.key)
    calculator.updateDisplay();
  }
  }
}
})
//click handlers

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})

acButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})
delButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})
