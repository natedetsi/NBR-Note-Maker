/////////////////////////////////////toggles////////////////////////////////////////
let tog = true;
let tog2 = true;
let tog4 = true;
/////////////////////////////////template object////////////////////////////////////////
let template = {
  qm: ['QM:'],
  previous: [''],
  policy: [' ', ''],
  called:'',
  cost:'',
  sent: ['Sent: '],
  required: ['Required: '],
  i2:['']

}
////////////////////////////////////////////ncd template objects and arrays///////////////////

let ncdTemplate = {
  reg: 'Vehicle Reg: ',
  years: '',
  expire: '',
}

let ncdClaims = {
  type: [],
  date: [],
  name: [],
  fault: []
};
let ncdCon = {
  code: [],
  date: [],
  name: []
}

let newClaim = [];
let newCon = [];

//////////////////////////////questions list/////////////////////////////////////////
let qmList = [''];
const questions = {
  NCD: '<ul><li>How many years NCD do you have?</li><li>Who was you previous insurer?</li><li>When did it expire?</li><li>Who was the policy holder?</li></ul>',
  Claims: '<ul><li> how many incidents have you had in th past 5 years  </li><li>What happened? how was it resolved?  </liu><li>who was driving?  </li><li>what year? what month? </ul>',
  Occupation: '<ul><li> How many jobs do you have?  </li><li>what is your occupation?  </li><li>how many hours do you work?  </li><li>how long have you worked there?  </li><li>how are you supporting yourself?  </li><li> are you actively seeking work?</ul>',
  Ownership: '<ul><li>How long have you owned the vehicle?</li><li>Are you the registered keeper?</li></ul>',
  Licence: '<ul><li>  how long have you held your licence?  </li><li>what type of licence do you have?  </li><li>what restictions do you have on your licence?  </ul>',
  Address: '<ul><li> Where do you live?  </li><li>what is your current address  </li><li>how long have you lived there?  </li><li>how many addresses do you have?  </li><li>what other addresses are linked to this vehicle?  </ul>',
  HPI: '<ul><li>  who is the registered keeper?  </li><li>when was the vehicle purchased?  </li><li>how long have you owned the vehicle?  </li><li>how long have you been driving the vehicle?  </ul>',
  Mileage: '<ul><li>  what is your annual mileage?  </li><li>what would be the maximum amount of miles you would require for the year?  </li><li>how did you come to that amount?</li><li>how many miles do you do per month/week/day?</li><li>what is the vehicle used for?</li><li>how many places of work do you travel too?</li><ul />',
  Residency: '<ul><li>  how long have you been a resident in the UK?  </li><li>when did you move to the UK?  </li><li>how long did you live in...?  </ul>',
  Convictions: '<ul><li>how many points do you have on your licence?</li><li>  how many motoring convictions do you have?</li><li>What was the conviction for? </li><li>what year? what month?  </ul>'
}
/////////////////////////////////////statements list ////////////////////////////////////////////

let statements = {
  Honesty: '<span class="bold-span">Say:</span> By law insurance companies are required to ask relevant questions. Once the questions have been asked, the responsibilty is on the policyholder to disclose information, anwser the questions correctly and be careful not to make a misrepresentation. Is that okay?',
  Break: ' <span class="bold-span">Say:</span> Can you confirm there have been no accidents, incidents or police enquiries during the time there was no insurance? <br /><br />IF THEY SAY NO: Read verbal disclaimer and request Share My Licence <br /><br />IF THEY SAY YES: Ask for more information.',
  Real: '<span class="bold-span">Say:</span> Please be aware that any prices quoted for any changes made to your policy today will be inclusive of a £30 administation fee and may be subject to change if the amendment is not completed on this phone call',
  Price: '',
  Verbal: '<span class="bold-span">Say:</span> The information shown on your statement of insurance and the answers provided forms the basis of the contact of insurance. If any of the information shown is incorrect or has changed then you should contact us, if you fail to do so then your insurance cover may not protect you in the event of a claim.',
  DPA: '<span class="bold-span">Say:</span> The authorised party with have the same authority as you on this policy including registering and dealing with claims, any mid-term adjustments and policy cancellations. Is that okay?',
  Cardmid: `<span class="bold-span">For a mid term adjustment</span> <br />If its a new card confirm: <ul><li>You are speaking to the card holder</li><li>The payment amount</li></ul> <br /><span class="bold-span">Say:</span>Your card could be used for future payments, including your renewal premium, fees or any missed payments. You can cancel the continous payment authority at any time. Is that okay? <br /><br /> If they say no turn off CPA. <br /><br /> If they say yes and it is a third partys card <br /> <br /><span class="bold-span">Say:</span>It is the policy holders responsibilty to tell you about any premium changes and we will notify them before taking payment `,
  Cardcan: `<span class="bold-span">For a cancellation</span> <br />If it is a new card, confirm <ul><li>You are speaking to the card holder</li><li>The payment amount</li></ul> <br /><span class="bold-span">Say:</span> The card could be used for any outstanding balances after cancellation. You can cancel this continuous payment authority at any time. Is that okay? <br />
<br />  If they say no, turn off CPA <br /> <br /> If they say yes <br /><br /> <span class="bold-span">Say:</span> It is the policy holders responsibilty to tell you of any changes in premium and we will notify them before taking any payment.`


};

///////////////////// Keyboard shortcuts ////////////////////////////////////

document.addEventListener('keydown', (e) => {

  if (e.ctrlKey === true && e.keyCode === 37) {
    ncdClick('ncd-template');

  } else if (e.ctrlKey === true && e.keyCode == 40 ) {
    question();
  } else if (e.ctrlKey === true && e.keyCode == 39 ) {
    sideNotes();
  } else if (e.ctrlKey === true && e.keyCode == 38  ) {
    statementSlide();
  } else if (e.ctrlKey === true && e.keyCode == 191 ) {
    slideTools();
  } else if (e.ctrlKey === true && e.keyCode == 73 ) {
    e.preventDefault();

  } else if (e.ctrlKey === true && e.keyCode == 40) {
    question();
  } else if (e.ctrlKey === true && e.keyCode == 39) {
    sideNotes();
  } else if (e.ctrlKey === true && e.keyCode == 38) {
    statementSlide();
  } else if (e.ctrlKey === true && e.keyCode == 191) {
    slideTools();
  } else if (e.ctrlKey === true && e.keyCode == 73) {

    information();
  }
});




////////////////////On click get name value push name to template cat////////////////////
document.querySelectorAll('button').forEach((elem) => {

  elem.addEventListener('click', (e) => {
    const label = e.target.name;
    let cat = e.target.value;
    // if label is equal at cat array item filter item
    if (e.target.classList.contains('toggle')) {
      //filter out template data
      template[cat] = template[cat].filter(item => item !== label);
      document.querySelector(`.${cat}`).innerText = template[cat].join(' - ');
      e.target.classList.remove('toggle');
    }
    //////////////////////////////////////////toggle buttons down//////////////////////////
    else if (cat === 'called') {
      document.querySelectorAll('.call').forEach(elem => {
          elem.classList.remove('toggle');
        document.querySelector('.called').innerText = 'Called: ' +  label;
      });
      e.target.classList.add('toggle');
    }
      else if (cat === 'cost') {
        document.querySelectorAll('.cost-btn').forEach(elem => {
            elem.classList.remove('toggle');
            document.querySelector('.cost').innerText = 'Cost: ' + label;
        });
        e.target.classList.add('toggle');


    } else if( cat === 'received'){
      document.querySelectorAll('.mail').forEach(elem => {
          elem.classList.remove('toggle');
          document.querySelector('.received').innerText = label;
      });
      e.target.classList.add('toggle');
    }
     else if (cat !== 'copy' && cat !== 'clear' && cat !== 'further') {
        if(cat === 'qm' && template[cat].length > 4){return};
      e.target.classList.add('toggle');
      //get button name and value push name to array = to template.name
      template[cat].push(label);
      document.querySelector(`.${cat}`).innerText = template[cat].join(' - ');
    };
  });
});

////////////////////////////////// universal input handler //////////////////////////////
document.querySelectorAll('.handle').forEach( elem => {
  elem.addEventListener('keyup', (e) => {
    let cat = e.target.name;
    document.querySelector(`.${cat}`).innerText = `${cat}: ${e.target.value}`;
  })
})
/////////////////////////////////call input event handler ////////////////////////////////

document.querySelector('.call-input').addEventListener('keyup', (e) => {
  document.querySelector('.called').innerText = `Called: ${e.target.value}`;
});
////////////////////////////get questions for qm data/////////////////////////////

let questionsArr = [];
document.querySelectorAll('.top-container button').forEach(button => {
  button.addEventListener('click', () => {
    questionsArr = [];
    template.qm.map(elem => {
      questionsArr.push(questions[elem]);
      document.querySelector('.q-info').innerHTML = questionsArr.join('<hr />');
    });
  });
});

///////////policy information checker, monitors change in input value and displays inside .para//////////
document.querySelectorAll('.second').forEach((elem) => {
  elem.addEventListener('keyup', (e) => {
    let pcat = e.target.classList[1];
    if (pcat === 'previous') {
      template.previous.pop();
      template.previous.push(e.target.value);
    } else if (pcat === 'policy-number') {
      template.policy.pop();
      template.policy.push(e.target.value);
    };
    document.querySelectorAll('.prev').forEach((elem) => {
      elem.innerText = 'Previous Insurer: ' + template.previous.join('') + " - " + template.policy.join('');
    });

  });
});
/////////////////////////////////// extra notes section handlers//////////////////////////


document.querySelector('.extra-notes').addEventListener('keyup', (e) => {
  if (e.target.value === '') {
    document.querySelector('.extra').style.visibility = 'hidden';
    document.querySelector('.extra').style.height = '0';
  } else {
    document.querySelector('.extra').style.visibility = 'visible';
    document.querySelector('.extra').style.height = 'auto';
    document.querySelector('.extra-para').innerText = e.target.value;
  }
})


/////////////////////////select all inside .para and copy to clipboard/////////////////////
function copy(id) {
  let from = document.getElementById(id);
  let range = document.createRange();
  window.getSelection().removeAllRanges();
  range.selectNode(from);
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
};

function copyNotes(id) {
  document.querySelector('.copy-notes').focus()
  document.getElementById(id).select();
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
}

////////////////////////////////////slide in side notes////////////////////////////////


function sideNotes() {
  tog = !tog;
  if (tog === false) {
    document.querySelector('#further').focus();
    document.querySelector('.side-notes').style.left = '50%';
    document.querySelector('.btn-left span').innerText = 'X';
    document.querySelector('.ncd-template').style.right = "-100%";
    document.querySelector('.btn-right span').innerText = 'NCD';
  } else if (tog === true) {
    document.querySelector('.side-notes').style.left = "-100%";
    document.querySelector('.btn-left span').innerText = 'Notes';
  };
};


//////////////////////////////ncd template slide in///////////////////////////////////



function ncdClick(className) {
  const x = document.querySelector('.' + className);
  const btn = document.querySelector('.btn-right span');
  const y = document.querySelector('.side-notes');
  const yBtn = document.querySelector('.btn-left span');
  const check = document.querySelector('.previous');
  tog = !tog;
  if (tog === false) {
    if(check.value.length <= 0){
        document.querySelector('#focus-1').focus();
    } else {
      document.querySelector('#focus-2').focus();
    }
    x.style.right = '50%';
    btn.innerText = 'X';
    y.style.left = '-100%';
    yBtn.innerText = 'Notes'
  } else if (tog === true) {
    document.querySelector('.focus').focus();
    x.style.right = '-100%';
    btn.innerText = 'NCD';
  }
}
/////////////////////////////////////////slide in statement section ///////////////////////////
function statementSlide() {
  const x = document.querySelector('.statement');
  const btn = document.querySelector('.btn-bottom span');
  tog = !tog;
  if (tog === false) {
    document.querySelector('#statement-focus').focus();
    x.style.bottom = '0';
    document.querySelector('.side-notes').style.left = '-100%';
    document.querySelector('.ncd-template').style.right = '-100%';
    document.querySelector('.btn-left span').innerText = 'Notes';
    document.querySelector('.btn-right span').innerText = 'NCD';
    btn.innerText = 'X';
  } else if (tog === true) {
    x.style.bottom = '-100%';
    btn.innerText = 'Statements';
  }
};

/////////////////////////////////// ncd template event haddlers//////////////////////////

/////////////////////////////////////////////inputs section/////////////////////////
document.querySelectorAll('.inputs input').forEach(elem => {
  elem.addEventListener('keyup', (e) => {
    const cat = e.target.name;
    const prev = ncdTemplate[cat];
    ncdTemplate[cat] = e.target.value;
    document.querySelector(`.${cat}`).innerText = `${ncdTemplate[cat]}`;
  });

});


////////////////////////////////////////// claims ///////////////////////////
document.querySelectorAll('.claim').forEach(elem => {
  elem.addEventListener('keyup', (e) => {
    const cat = e.target.name;
    ncdClaims[cat].pop();
    ncdClaims[cat].push(e.target.value);
  });
});

document.querySelector('.claim-button').addEventListener('click', () => {
  document.querySelector('.claim-span').innerText = '';
  newClaim.push(ncdClaims.type.join());
  newClaim.push(ncdClaims.date.join());
  newClaim.push(ncdClaims.name.join());
  newClaim.push(ncdClaims.fault.join());

  let node = document.createElement('p');
  let nodeText = document.createTextNode(`${newClaim.join(' - ')}`)
  node.appendChild(nodeText);
  document.querySelector('.claims').appendChild(node);
  clearClaim()
});


document.querySelector('.default-claim').addEventListener('click', (e) => {
  let option = document.querySelector('.default-claim');
  option = option.options[option.selectedIndex].text;
  console.log(option)
  document.querySelector('.claim-span').innerText = option;
});


///////////////////////////////////covictions/////////////////////////////////////////
document.querySelectorAll('.conviction').forEach(elem => {
  elem.addEventListener('keyup', (e) => {
    const cat = e.target.name;
    ncdCon[cat].pop();
    ncdCon[cat].push(e.target.value);
  });
});
document.querySelector('.conviction-button').addEventListener('click', () => {
  document.querySelector('.conviction-span').innerText = '';
  newCon.push(ncdCon.code.join());
  newCon.push(ncdCon.date.join());
  newCon.push(ncdCon.name.join());

  let node = document.createElement('p');
  let nodeText = document.createTextNode(`${newCon.join(' - ')}`);
  node.appendChild(nodeText);
  document.querySelector('.convictions').appendChild(node);
  clearCons();

});
document.querySelector('.default-conviction').addEventListener('click', (e) => {
  let option = document.querySelector('.default-conviction');
  option = option.options[option.selectedIndex].text;
  document.querySelector('.conviction-span').innerText = option;
})
/////////////////////////////statement section /////////////////////////////////

///////////////////////////statement selector//////////////////////////////////
document.querySelector('.statement-dropdown').addEventListener('click', (e) => {
  let statement = document.querySelector('.statement-dropdown');
  statement = statement.options[statement.selectedIndex].value;


  document.querySelector('.statement-paragraph').innerHTML = statements[`${statement}`];


})



//////////////////////////clear claims Arrays and inputs///////////////////////////////

function clearClaim() {
  ncdClaims = {
    type: [],
    date: [],
    name: [],
    fault: []
  };
  newClaim = [];
  document.querySelectorAll('.claim').forEach(elem => {
    elem.value = '';
  })
}
/////////////////////////clear convictions input and arrays//////////////////////////////

function clearCons() {
  ncdCons = {
    code: [],
    date: [],
    name: []
  };
  newCon = [];
  document.querySelectorAll('.conviction').forEach(elem => {
    elem.value = '';
  })
}

////////////////////////////////slide in questions tab//////////////////////////////////

function question() {
  const q = document.querySelector('.questions');
  const btn = document.querySelector('.btn-top span');
  tog = !tog;
  if (tog === false) {
    q.style.top = '20px';
    btn.innerText = 'X';
    document.querySelector('.ncd-template').style.right = '-100%';
    document.querySelector('.btn-right span').innerText = 'NCD';
    document.querySelector('.side-notes').style.left = '-100%';
    document.querySelector('.btn-left span').innerText = 'Notes';
  } else {
    q.style.top = '-100%';
    btn.innerText = 'Questions';
  }
}
/////////////////////////////////////////slide tools/////////////////////////////

function slideTools() {
  tog = !tog
  if (tog === false) {
    document.querySelector('#tool-focus').focus();
    document.querySelector('.tool-box-holder').style.left = '0';
    document.querySelector('.tool-box-holder').style.transitionDelay = '0s';
    document.querySelector('.overlay').style.backgroundColor = 'rgba(0,0,0,0.4)';
  } else if (tog === true) {
    document.querySelector('.tool-box-holder').style.left = '-100%';
    document.querySelector('.tool-box-holder').style.transitionDelay = '0.25s';
    document.querySelector('.overlay').style.backgroundColor = 'rgba(0,0,0,0.0)';
  }
};

//////////////////////////////////clear template and .para//////////////////////////////
function clearTemplate() {
  const a = document;
  template = {
    qm: ['QM:'],
    previous: [''],
    policy: [' ', ''],
    called: '',
    sent: ['Sent: '],
    required: ['Required: ']
  };
  qmList = ['']
  a.querySelector('.qm').innerText = 'QM: ';
  a.querySelector('.prev').innerText = 'Previous insurer: ';
  a.querySelector('#prev').innerText = 'Previous Insurer: ';
  a.querySelector('.called').innerText = 'Called:   ';
  a.querySelector('.sent').innerText = 'Sent:   ';
  a.querySelector('.required').innerText = 'Required:   ';
  a.querySelector('.q-info').innerText = '';
  a.querySelectorAll('input').forEach((elem) => {
    elem.value = '';
  });
  a.querySelector('.extra-notes').value = '';
  a.querySelector('.extra-para').innerText = '';
  a.querySelector('.extra').style.height = '0';
  document.querySelectorAll('button').forEach((elem) => {
    elem.classList.remove('toggle');
  });
  document.querySelector('.focus').focus();
};
/////////////////////////////////// clear NCD template fields////////////////////////////

function clearNcd() {
  const a = document;
  a.querySelector('.conviction-span').innerText = 'Not Confirmed';
  a.querySelector('.claim-span').innerText = 'Not Confirmed';
  ncdTemplate = {
    reg: 'Vehicle Reg: ',
    years: '',
    expire: '',

  }

  ncdClaims = {
    type: [],
    date: [],
    name: [],
    fault: []
  }
  ncdCon = {
    code: [],
    date: [],
    name: []
  }

  newClaim = [];
  newCon = [];
  a.querySelectorAll('.ncd-template input').forEach(elem => {
    elem.value = '';
  });
  a.querySelector('.claims').innerHTML = '';
  a.querySelector('.convictions').innerHTML = '';
  a.querySelector('#prev').innerText = 'Previous Insurer: ';
  a.querySelector('.reg').innerText = '';
  a.querySelector('.expire').innerText = '';
  a.querySelector('.years').innerText = '';
  a.querySelector('#focus').focus();
}

// Clear element text by id
function clearText(id) {
  document.getElementById(id).value = '';
  document.getElementById(id).focus();
}


//// years between dates calculater//////////
function dateCalc() {

  let d1 = new Date(document.querySelector('.prev-date').valueAsNumber);
  let d2 = new Date(document.querySelector('.new-date').valueAsNumber);


  let diff = (d2 - d1) / 1000 / 60 / 60 / 24;

  if (diff < 365.25) {
    document.querySelector('.years-held span').innerText = `0 years`;
  } else {
    let years = Math.abs(Math.floor(diff / 365.25));
    document.querySelector('.years-held span').innerText = `${years} years`;
  }
}
/////////interest calculator ///////////////////
document.querySelector('.n2').addEventListener('change', (e) => {
  const n1 = document.querySelector('.n1').value;
  const n2 = document.querySelector('.n2').value;
  document.querySelector('.total').innerText = `Total diff: £${n1 - n2}`;
})

function interDiff() {
  const n1 = document.querySelector('.n1').value;
  const n2 = document.querySelector('.n2').value;
  const i1 = document.querySelector('.i1').value;

  let diff = n1 - n2;
  let amount = Math.round(diff / i1 * 100) / 100;

  let check = amount * i1;

  let modu = Math.round((diff - check) * 100) / 100;

  document.querySelector('.total').innerText = `Total diff: £${diff}`
  document.querySelector('.amount').innerText = `Installments:  £${amount}`;
  document.querySelector('.spread-diff').innerText = `Remainder:  £${modu}`;
};


/////////////////////////////////////// general calculator function///////////////////////

const calculatorWrapper = document.querySelector('.calculator-wrapper');

calculatorWrapper.addEventListener('focus', () => {

  class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }

    clear() {
      this.previousOperand = '';
      this.currentOperand = '';
      this.operation = undefined;
    }
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
      // first check for a pre existing decimal place
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''

    }

    compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(current)) return

      switch (this.operation) {
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

    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const intergerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let intergerDisplay
      if (isNaN(intergerDigits)) {
        intergerDisplay = ''
      } else {
        intergerDisplay = intergerDigits.toLocaleString('en', {
          maximumFractionDigits: 0
        })
      }
      if (decimalDigits != null) {
        return `${intergerDisplay}.${decimalDigits}`
      } else {
        return intergerDisplay
      }
    }
    updateDisplay() {
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand);
      if (this.operation != null) {
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
  calculatorWrapper.addEventListener('keydown', (e) => {
    //convert event key to a number
    let number = parseFloat(e.key);
    //filter out letters and un used keys
    if (e.key.length > 1 && e.key !== 'Enter' && e.key !== 'Backspace' && e.key !== 'Delete') {
      return
    };
    if (e.key == e.key.match(/[a-z]/i) || e.key === 'Space') {
      return
    }

    if (Number.isInteger(number)) {
      calculator.appendNumber(number);
      calculator.updateDisplay()
    } else if (e.key === '.') {
      calculator.appendNumber(e.key);
      calculator.updateDisplay()
    } else {
      if (e.key === 'Enter') {
        calculator.compute();
        calculator.updateDisplay();
      } else if (e.key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
      } else if (e.key === 'Delete') {
        calculator.clear();
        calculator.updateDisplay();
      } else {
        if (e.key === 'Enter') {
          return
        } else if (e.key === '*') {
          calculator.chooseOperation('×')
          calculator.updateDisplay();
        } else if (e.key === '/') {
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

});
/////////////////////////////////// Information page section //////////////////////////////

document.querySelector('.close-icon').addEventListener('click', (e) => {
  document.querySelector('.information').style.visibility = 'hidden';
})

document.querySelector('.info-button').addEventListener('click', (e) => {

  document.querySelector('.information').style.visibility = 'visible';
})

function information() {
  tog = !tog;
  if (tog === false) {
    document.querySelector('.information').style.visibility = 'hidden';
  } else {
    document.querySelector('.information').style.visibility = 'visible';
  }
}
/////////////////////////////////// save light choice /////////////////////////////////////
// var theme = localStorage.getItem('theme');
// var togglePosition = localStorage.getItem('togglePosition');
//
// if(theme) {
//   document.querySelector('body').classList.remove('light-mode');
//   document.querySelector('body').classList.add('dark-mode');
//   document.querySelector('body').classList.add(theme);
// }
// if(togglePosition) {
//   document.querySelector('.mode-switch').style.left = `${togglePosition}`;
// }

//////////////////////////////////// change light mode ////////////////////////////////////

document.querySelector('.mode').addEventListener('click', () => {
tog =!tog;
if(tog === false){
  document.querySelector('body').classList.replace('light-mode', 'dark-mode');
  document.querySelector('.mode-switch').style.left = '50%';
  localStorage.setItem('theme', 'dark-mode');
  localStorage.setItem('togglePosition', '50%');
} else {
  document.querySelector('body').classList.replace('dark-mode', 'light-mode');
  document.querySelector('.mode-switch').style.left = '0';
  localStorage.setItem('theme', 'light-mode');
  localStorage.setItem('togglePosition', '0');
}

});
