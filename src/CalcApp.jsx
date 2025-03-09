import { useState, useRef, useEffect } from 'react'
import { FaChevronDown } from 'react-icons/fa';
import * as math from 'mathjs';
import './CalcApp.css';

function UTonyCalc() {
  const [inputVal, setInputVal] = useState('');
  const [cursorPos, setCursorPos] = useState(0);
  const [newResult, setNewResult] = useState(inputVal);
  const [isFirstExecution, setIsFirstExecution] = useState(true);
  const [activeButton, setActiveButton] = useState(null);
  const historyTabRef = useRef(null);
  const contRef = useRef(null);

  const Buttons = [  
  { label: 'H', value: 'history' },
  { label: '←', value: '←' },
  { label: '→', value: '→' },
  { label: <FaChevronDown />, value: 'expand' },

  { label: 'AC', value: 'AC' },
  { label: 'π', value: 'π' },
  { label: '%', value: '%' },
  { label: '÷', value: '÷' },

  { label: '(', value: '(' },
  { label: ')', value: ')' },
  { label: '^', value: '^' },
  { label: 'x² ', value: '²' },

  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '×', value: '×' },
  

  { label: '!', value: '!' },
  { label: '√', value: '√' },
  { label: '∛', value: '∛' },
  { label: '10^x', value: '10^' },

  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '+', value: '+' },
  

  { label: 'e', value: 'e' },
  { label: 'ln', value: 'ln(' },
  { label: 'log', value: 'log(' },
  { label: 'INV', value: 'invert' },

  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '-', value: '-' },

  { label: '.', value: '.' },
  { label: '0', value: '0' },
  { label: 'C', value: 'clear' },
  { label: '=', value: '=' },

  { label: 'Sin', value: 'sin(' },
  { label: 'Cos', value: 'cos(' },
  { label: 'Tan', value: 'tan(' },
  { label: 'DEG', value: 'DEG' },

  { label: 'Sin⁻¹', value: 'sin⁻¹(' },
  { label: 'Cos⁻¹', value: 'cos⁻¹(' },
  { label: 'Tan⁻¹', value: 'tan⁻¹(' },  
  { label: 'RAD', value: 'RAD' },


  { label: 'Csc', value: 'csc(' },
  { label: 'Sec', value: 'sec(' },
  { label: 'Cot', value: 'cot(' },
  { label: 'hyp', value: 'Hyp' },

  { label: 'ans', value: 'ans' },

  { label: 'Sinh', value: 'sinh(' },
  { label: 'Cosh', value: 'cosh(' },
  { label: 'Tanh', value: 'tanh(' },

  { label: 'Csc⁻¹', value: 'csc⁻¹(' },
  { label: 'Sec⁻¹', value: 'sec⁻¹(' },
  { label: 'Cot⁻¹', value: 'cot⁻¹(' },

  { label: 'Csch', value: 'csch(' },
  { label: 'Sech', value: 'sech(' },
  { label: 'Coth', value: 'coth(' },
]; 

  window.addEventListener("DOMContentLoaded", function() {
    setTimeout( () => {
        const open = this.document.querySelectorAll(".hid");
        
        for (let i = 0; i < open.length; i++) {
            open[i].classList.replace("hid", "rev");
        }
    }, 0o0);
    
})

const handleMouseDown = (buttonId) => {
  setActiveButton(buttonId);
};

const handleMouseUp = () => {
  setActiveButton(null);
};

function hideHistoryTab() {
if (historyTabRef.current) {
  const classList = historyTabRef.current.classList;
  if (classList.contains('showHistory')) {
      console.log('Element has the class "showHistory"');
      classList.replace('showHistory', 'hideHistory');
  }
}
}

const onButtonClick = (e, val) => {
    e.preventDefault();

    const err = "math error";
    let preciseResult;
    let enteredExpression;
    let historyElement; 
    let butn =  document.querySelectorAll("#butns");
    let showAllButn = document.querySelector("#calccon");
    let chevButn = document.querySelector('.chevDown');

    function renderHistory(calculationHistory) {
      const historyContainer = document.getElementById('history');
      if (!historyContainer) {
        console.error('History container element not found.');
        return;
      }
      
      historyContainer.innerHTML = '';
    
      calculationHistory.forEach(item => {
        const historyItemDiv = document.createElement('div');
        historyItemDiv.classList.add('historyItem'); 
    
        const enteredExpressionP = document.createElement('p');
        enteredExpressionP.textContent = item.enteredExpression;
        enteredExpressionP.classList.add('entered-expression');

        enteredExpressionP.addEventListener('click', () => {
          let histExpression = item.enteredExpression; 
          console.log(histExpression);
          let currentValue = inputVal + histExpression;
          setCursorPos(currentValue.toString().length);
          setInputVal(currentValue);
        });
    
        // Create paragraph for preciseResult
        const preciseResultP = document.createElement('p');
        preciseResultP.textContent = item.preciseResult;
        preciseResultP.classList.add('precise-result');
        // Add click event listener to preciseResultP
        preciseResultP.addEventListener('click', () => {
          let histResult = preciseResultP.textContent; 
          console.log(histResult);
          let currentValue = inputVal + histResult;
          setCursorPos(currentValue.toString().length);
          setInputVal(currentValue);});
    
        const horizonLine = document.createElement('hr');
        horizonLine.classList.add('horizontal-Line'); 
    
        historyItemDiv.appendChild(enteredExpressionP);
        historyItemDiv.appendChild(preciseResultP);
        historyItemDiv.appendChild(horizonLine);
    
        historyContainer.appendChild(historyItemDiv);
      });
    }
    
    function showFunctKeys() {
      if (window.innerWidth <= 1000) {
        
        butn.forEach((button) => {
          if (button.classList.contains('butnHid')) {
            button.classList.replace("butnHid", "butnShow");
          } else {
            button.classList.replace("butnShow", "butnHid");
          }
        });

        if (showAllButn.classList.contains("cont")) {
          showAllButn.classList.replace("cont", "fullCont");
        } else {
          showAllButn.classList.replace("fullCont", "cont");
        }

      } else if (window.innerWidth >= 768) {
        showAllButn.classList.replace("fullCont", "cont");
      }
    }

    function rotateChev() {
          if (showAllButn.classList.contains("cont")) {
            chevButn.style.rotate = 'x 180deg';
          } else {
            chevButn.style.rotate = 'x 0deg';
          }
     }



    if (val === '=') {

      try {
      // converts the argument between radian and degree
      function parseExpression(expression) {
        const trigRegex = /(Math\.(sin|cos|tan|csc|sec|cot))\((\d*\.?\d+)\)/g; // Global match for trig functions
        const invrtInverseTrigRegex = /(Math\.(acsc|asec|acot))\((\d*\.?\d+)\)/g; // Global match for inverse trig functions
        const factorialRegex = /!/; // Factorial regex remains unchanged
        const parenthesisRegex = /\(.*\)/; // Parentheses regex remains unchanged
        const exponentRegex = /(\d*\.?\d+)\^(\d*\.?\d+)/g;
        const sqrExponentRegex = /(\w+)\²/g;
      
        const DegButn = document.querySelector('.butnDEG'); // Button to toggle DEG/RAD
        
        // Handle trigonometric functions (sin, cos, tan, etc.)
        expression = expression.replace(trigRegex, (match, func, trigFunc, degrees) => {
          const radians = DegButn.classList.contains('DegHide') 
            ? parseFloat(degrees) 
            : parseFloat(degrees) * Math.PI / 180;
          return `${func}(${radians})`;
        });
      
        // Handle inverse trigonometric functions (acsc, asec, acot)
        expression = expression.replace(invrtInverseTrigRegex, (match, func, invTrigFunc, degrees) => {
          const radians = DegButn.classList.contains('DegHide') 
            ? parseFloat(degrees) 
            : parseFloat(degrees) * Math.PI / 180;
          return `${func}(${radians})`;
        });
      
        // Handle factorials (currently just logs)
        if (factorialRegex.test(expression)) {
          console.log('factorial and bracket expression clicked');
        }
      
        // Handle general parentheses expressions (like (2+3) or (5*6))
        if (parenthesisRegex.test(expression)) {
          const modexpression = parseTimesSign(expression); // Call to handle multiplication signs (if needed)
          console.log('bracket expression');
          console.log(modexpression);
          expression = modexpression;
        }

        const tenExponentRegex = /10\^(\w+)/g; // Matches "10^" followed by any variable (e.g., x)
        expression = expression.replace(tenExponentRegex, (match, variable) => {
          return `10^${variable}`; // Replace 10^x with 10*x
        });

        expression = expression.replace(sqrExponentRegex, (match, variable) => {
          return `${variable}**2`; // Replace x² with x**2
        });
        // Handle exponentiation (x^y)
        expression = expression.replace(exponentRegex, (match, base, exponent) => {
        const result = Math.pow(parseFloat(base), parseFloat(exponent)); // Evaluate x^y
        return result;

        
  });
      
        // Return the processed expression
        return expression;
      }
            
      // Adds the symbol (*) between a number preceding a Math. function.
        function pushTimesSign(expression) {
        // Regex to match a number followed by a Math expression
        const regex = /(\d)(Math\.\w+)/g;
        // Replace matches with the number followed by * and the Math expression
        const correctedExpression = expression.replace(regex, '$1*$2');
        console.log(correctedExpression);
      
        return correctedExpression;
        }
        function parseTimesSign(expression) {
          // First add multiplication between numbers/functions and opening parentheses
          expression = expression.replace(/(\d|\w+\([^)]*\))\(/g, '$1*(');

          // Then add multiplication between consecutive parentheses
          expression = expression.replace(/\)(?=\()/g, ')*');
          console.log(expression);

          return expression;
        }
      // Adds closing parenthesis
        function addClosingParentheses(expression) {
          const openCount = (expression.match(/\(/g) || []).length;
          const closeCount = (expression.match(/\)/g) || []).length;
          if (openCount > closeCount) {
            return expression + ')';
          }
          return expression;      
        }
      // rounds result appropriately 
        function adjustPrecision(result, precision = 10, tolerance = 1e-10) {
          const roundedResult = Math.round(result * 10 ** precision) / 10 ** precision;
          if (Math.abs(result - roundedResult) < tolerance) {

            return roundedResult; // Return rounded value
          }
          return parseFloat(result.toFixed(precision));        
        }

        function evaluateExpression(expression) {
          const DegButn = document.querySelector('.butnDEG');

          const arcTrigRegex = /Math\.(asin|acos|atan|asinh|acosh|atanh)\(/;
          const invrTrigRegex = /Math\.(csc|sec|cot)\(/;
          const invrtInverseTrigRegex = /Math\.(acsc|asec|acot)\(/;
          const invrtHypbolic = /Math\.(csch|sech|coth)\(/;
          const rootRegex = /Math\.(sqrt|cbrt)\(/;
          const eulerRegex = /\be\b/;
          const factorialRegex = /!/;

          if (arcTrigRegex.test(expression)) {
            const degrees = eval(expression);
            const value = DegButn.classList.contains('DegHide') 
            ? degrees : degrees *  180 / Math.PI;
            const result = adjustPrecision(value);
            console.log(value);
            console.log(result);
            return result;

          } else if (invrTrigRegex.test(expression)) {
            console.log('inverse of trig');
            const modExpr = expression
              .replace(/\bcsc\b/g, 'sin')
              .replace(/\bsec\b/g, 'cos') 
              .replace(/\bcot\b/g, 'tan'); 

            const value = eval(modExpr);
            const inversedResult = 1 / value;
            const result = inversedResult
            console.log(value);
            return result;

          } else if (invrtInverseTrigRegex.test(expression)) {
            const modExpr = expression
              .replace(/\bacsc\b/g, 'asin')
              .replace(/\basec\b/g, 'acos') 
              .replace(/\bacot\b/g, 'atan'); 

              const degrees = eval(modExpr);
              const result = DegButn.classList.contains('DegHide') 
              ? degrees : degrees *  180 / Math.PI;;
              console.log(result);
              return result;

          } else if (invrtHypbolic.test(expression)) {
            const modExpr = expression
            .replace(/\bcsch\b/g, 'sinh')
            .replace(/\bsech\b/g, 'cosh') 
            .replace(/\bcoth\b/g, 'tanh'); 

            const value = eval(modExpr); 
            const result = 1 / value;
            console.log(result);
            return result;

          } else if (rootRegex.test(expression)) {
            const closeExpr = expression + ')';
            const result = eval(closeExpr);
            console.log(result);
            return result;
          } else if (eulerRegex.test(expression)) {
            const modExpr = expression
              .replace(/\be\b/g, 'Math.E');
            const result = eval(modExpr);
            return result;

          } else if (factorialRegex.test(expression)) {
            const result = math.evaluate(expression);
            console.log(result);
            return result;
          }  else {
            const result = eval(expression);
            console.log(result);
            return result;
          }
        }
      let calculationHistory = JSON.parse(localStorage.getItem('calculationHistory'))
        || [];
      // Logs the expression and result into the array.
      function logHistory(enteredExpression, preciseResult) {
        const historyItem = { enteredExpression, preciseResult };
    
        function addUnique(newItem) {
            const isDuplicateOfFirstItem = 
                calculationHistory.length > 0 && 
                calculationHistory[0].enteredExpression === newItem.enteredExpression &&
                calculationHistory[0].preciseResult === newItem.preciseResult;
    
            if (!isDuplicateOfFirstItem) {
                calculationHistory.unshift(newItem); // Add the item to the beginning
            }
        }
    
        addUnique(historyItem);
    
        if (calculationHistory.length > 30) {
            console.log('That\'s enough');
            calculationHistory.pop(); // Remove the oldest item if history exceeds 30 items
        }
    
        localStorage.setItem('calculationHistory', JSON.stringify(calculationHistory));
        console.log('Calculation History:', calculationHistory);
      }

      const storedHistory = JSON.parse(localStorage.getItem('calculationHistory')) || [];
      renderHistory(storedHistory);

      const mathOperations = {
        trig: {
          'sin(': 'Math.sin(',
          'cos(': 'Math.cos(',
          'tan(': 'Math.tan(',
        },
        inverseTrig: {
          'sin⁻¹(': 'Math.asin(',
          'cos⁻¹(': 'Math.acos(',
          'tan⁻¹(': 'Math.atan(',
        },
        invertedTrig : {
          'csc(' : 'Math.csc(',
          'sec(' : 'Math.sec(',
          'cot(' : 'Math.cot(',
        },
        invertedInverseTrig: {
          'csc⁻¹(': 'Math.acsc(',
          'sec⁻¹(': 'Math.asec(',
          'cot⁻¹(': 'Math.acot(',
        },
        hyperbolic: {
          'sinh(': 'Math.sinh(',
          'cosh(': 'Math.cosh(',
          'tanh(': 'Math.tanh(',
        },
        invertedHyp: {
          'csch(': 'Math.csch(',
          'sech(': 'Math.sech(',
          'cot(': 'Math.coth(',
        },
        log: {
          'log(': 'Math.log10(',
          'ln(': 'Math.log(',
        },
        constants: {
          'π': 'Math.PI',
        },
        misc: {
          '√': 'Math.sqrt(',
          '∛': 'Math.cbrt(',
          '×' : '*',
          '÷' : '/',
          'x²': '^2',
        },
      };

      function replaceSymbols(input) {
        let modifiedInput = input;
      
        // Iterate over each operation group
        Object.values(mathOperations).forEach((operationGroup) => {
          Object.entries(operationGroup).forEach(([symbol, func]) => {
            const regex = new RegExp(symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'); // Escape special characters in symbols
            modifiedInput = modifiedInput.replace(regex, func);
          });
        });
      
        return modifiedInput;
      }

      const closedInputVal = addClosingParentheses(inputVal);
      console.log(closedInputVal);
      const processedInput = replaceSymbols(closedInputVal);
      console.log(processedInput);

      let convertExprArg = pushTimesSign(parseExpression(processedInput));
          // converts argument to either degree or radians     
      console.log(convertExprArg);
      const result = evaluateExpression(convertExprArg);
      const preciseResult = adjustPrecision(result);
      console.log(preciseResult);
      localStorage.setItem('question', closedInputVal);
      localStorage.setItem('answer', preciseResult);
      logHistory(closedInputVal, preciseResult);

      const handleInputDisplay = async (expression, result) => {
        const setInputValue = () => {
          return new Promise(resolve => {
            setInputVal(expression.toString());
            setNewResult(result.toString());
            setCursorPos(expression.toString().length);
            resolve();
          });
        };
    
        const newInputValue = () => {
          setInputVal(result.toString());
          setNewResult("");
          setCursorPos(result.toString().length);
        };
    
        if (isFirstExecution) {
          await setInputValue();
          setIsFirstExecution(false);
        } else {
          newInputValue();
          setIsFirstExecution(true);
        }
      };
      handleInputDisplay(closedInputVal, preciseResult);

      } catch {
        setInputVal(err);
        setCursorPos(cursorPos + 9);
      }

    } else if (val === 'clear') {
      if (cursorPos > 0) {
        const newInput = inputVal.slice(0, cursorPos - 1) + inputVal.slice(cursorPos);
        setInputVal(newInput);
        setCursorPos(cursorPos - 1);
      }
    } else if (val === '←') {
      if (cursorPos > 0) {
        const newInput = inputVal.slice(0, cursorPos) + val + inputVal.slice(cursorPos);
        const valueLength = newInput.length;
        console.log(newInput);

        if (inputVal.includes('sin(') || inputVal.includes('cos(') ||
         inputVal.includes('tan(') || inputVal.includes('csc(') ||
         inputVal.includes('sec(') || inputVal.includes('cot(') ) {
          setCursorPos(cursorPos - 4);
        } else if (inputVal.includes('sinh(')) {
          setCursorPos(cursorPos - 5);
        } else {
          setCursorPos(cursorPos - 1);
        }
      } 
      console.log(cursorPos);
    }
    else if (val === '→') {
      if (cursorPos < inputVal.length) {
        const newInput = inputVal.slice(0, cursorPos) + val + inputVal.slice(cursorPos);
        const valueLength = newInput.length;
        console.log(newInput);

        if (inputVal.includes('sin(') || inputVal.includes('cos(') ||
         inputVal.includes('tan(') || inputVal.includes('csc(') ||
         inputVal.includes('sec(') || inputVal.includes('cot(')) {
          setCursorPos(cursorPos + 4);
        } else if (inputVal.includes('sinh(')) {
          setCursorPos(cursorPos + 5); 
        } else {
          setCursorPos(cursorPos + 1);
        }      }       
      console.log(cursorPos);
    }
    else if (val === 'AC') {
      setInputVal('');
      setNewResult('')
      setCursorPos(0, cursorPos);
      console.log(cursorPos);
    } else if (val === "expand") {
    showFunctKeys();
    rotateChev();
    hideHistoryTab();
  } else if (val === 'DEG') {
      const RadButn = document.querySelector('.butnRAD');
      const DegButn = document.querySelector('.butnDEG');
      DegButn.classList.toggle('DegHide');     
      RadButn.classList.toggle('RadShow');
    }
     else if (val === 'RAD') {
      const RadButn = document.querySelector('.butnRAD');
      const DegButn = document.querySelector('.butnDEG');
      DegButn.classList.toggle('DegHide');     
      RadButn.classList.toggle('RadShow');
    } 
    else if (val === 'invert') {
      const hiddenButns = document.querySelectorAll('.invButns');
      const TrigButns = document.querySelectorAll('.trigButns');
      const InvButn = document.querySelector('.butnInvert');
      InvButn.classList.toggle('invClr');

      for (let i = 0; i < hiddenButns.length; i++ ) {
        hiddenButns[i].classList.toggle('invsButnShow');
        TrigButns[i].classList.toggle('trigButnsHide');
      }
    } 
    else if (val === 'Hyp') {
      const hiddenButns = document.querySelectorAll('.invHyp');
      const HypButns = document.querySelector('.butnHyp');
      HypButns.classList.toggle('hypHighlgt');

      for (let i = 0; i < hiddenButns.length; i++ ) {
        hiddenButns[i].classList.toggle('hypShow');
      }
    } 
    else if (val === '10^') {
      const newInput = inputVal.slice(0, cursorPos) + val + inputVal.slice(cursorPos);
      console.log('exponent clicked');      
      setCursorPos(cursorPos + 4);
      setInputVal(newInput);
      console.log(cursorPos);    
    } else if (val === 'ans') {
      const storedResult = localStorage.getItem('answer');
      console.log('Retrieved Result:', storedResult);
      const newInput = inputVal.slice(0, cursorPos) + val + inputVal.slice(cursorPos);
      const valueLength = newInput.length;
      const resultLength = storedResult.length;
      setCursorPos(cursorPos + resultLength);
      setInputVal(storedResult);

    } else if (val === 'history') {
        // Display the history in an element 
        historyElement = document.getElementById('history');
        if (historyElement.classList.contains("hideHistory")) {
          historyElement.classList.replace('hideHistory', 'showHistory');
        } else {
          historyElement.classList.replace('showHistory', 'hideHistory');
        }
        const storedHistory = JSON.parse(localStorage.getItem('calculationHistory')) || [];
        renderHistory(storedHistory);
        
    } else  {
      const newInput = inputVal.slice(0, cursorPos) + val + inputVal.slice(cursorPos);
      const valueLength = newInput.length;
      if (
      (val === 'sin(') || (val === 'cos(') || (val === 'tan(') ||
      (val === 'csc(') || (val === 'sec(') || (val === 'cot(') ||
      (val === 'sin⁻¹(') || (val === 'cos⁻¹(') || (val === 'tan⁻¹(') ||
      (val === 'csc⁻¹(') || (val === 'sec⁻¹(') || (val === 'cot⁻¹(') ||
      (val === 'sinh(') || (val === 'cosh(') || (val === 'tanh(') ||
      (val === 'csch(') || (val === 'sech(') || (val === 'coth(') ||
      (val === 'log(') || (val === 'ln(') 
      ) {
        console.log(valueLength);      
        setCursorPos(cursorPos + valueLength);
        setInputVal(newInput);
        console.log(cursorPos);  
      } else {
        console.log(valueLength);      
        setCursorPos(cursorPos + 1);
        setInputVal(newInput);
        console.log(cursorPos);  
      }
    }
    clrField();
  };

  const clrField = () => {
    if (onButtonClick && inputVal === "math error") {
      setInputVal('');
    }
  };

  const calcFull = () => {
    if (contRef.current) {
      contRef.current.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  }

  useEffect(() => {calcFull()}, [window.load]);

  let left; 
  let right;
  const trackCursor = (inputVal) => {
    // Insert a vertical line to indicate cursor position.
    left = inputVal.slice(0, cursorPos);
    right = inputVal.slice(cursorPos);
    return `${left}|${right}`;
  };

  return (
    <>
    <div className="calcparent" id='target'>
    <form className='relative '> 
      <label> 
      <div className="calccont h-screen" ref={contRef}>
         <div id="history" className='hideHistory' ref={historyTabRef}> </div>
        <div className='cont' id='calccon'  > 
          <div className="inputParent">
            <div className="virtualInputField" >
              <p className="enteredExpressionInp">{trackCursor(inputVal )}</p>
              <p className="preciseResultInp">{newResult}</p>
            </div>
             <input type="text" name='calc' value={trackCursor(inputVal )} 
             className='inputField'  onClick={hideHistoryTab}
              readOnly/>
</div>
          {Buttons.map((buttons, index) => (
  <button
    key = {index} 
    id ="butns"
    className={` 
      ${
        index === 0 || index === 1
        || index === 2 || index === 3
        ? 'topKeys' : 'butns'
      }

      ${index === 0 ? 'butnHist' : ''}
      ${index === 1 ? 'shiftLeft' : ''}
      ${index === 2 ? 'shiftRight' : ''}
      ${index === 3 ? 'chevDown' : ''}

      ${index === 4 ? 'butnAC': '' }
      ${index === 5 ? 'butnPie': '' }
      ${index === 6 ? 'butnPercent': '' }
      ${index === 7 ? 'butnDivide' : ''}

      ${index === 8 ? 'bracOpen' : ''}
      ${index === 9 ? 'bracClose' : ''}
      ${index === 10 ? 'powerButn' : ''}
      ${index === 11 ? 'sqrButn': '' }

      ${index === 12 ? 'butn1': '' }
      ${index === 13 ? 'butn2': '' }
      ${index === 14 ? 'butn3': '' }
      ${index === 15 ? 'butnTimes' : ''}

      ${index === 16 ? 'butnFact': '' }
      ${index === 17 ? 'butnSqrt': '' }
      ${index === 18 ? 'butnCbrt': '' }
      ${index === 19 ? 'butnExp': '' }

      ${index === 20 ? 'butn4': ''}
      ${index === 21 ? 'butn5': ''}
      ${index === 22 ? 'butn6': ''}
      ${index === 23 ? 'butnPlus': ''}
        
      ${index === 24 ? 'butnEuler' : ''}
      ${index === 25 ? 'butnNatLog' : ''}
      ${index === 26 ? 'butnLog' : ''}
      ${index === 27 ? 'butnInvert' : ''}

      ${index === 28 ? 'butn7' : ''}
      ${index === 29 ? 'butn8' : ''}
      ${index === 30 ? 'butn9' : ''}
      ${index === 31 ? 'butnMinus' : ''} 

      ${index === 32 ? 'butnPoint' : ''}
      ${index === 33 ? 'butnZero' : ''}
      ${index === 34 ? 'butnClear' : ''}
      ${index === 35 ? 'butnEqual' : ''}

      ${index === 36 ? "butnSin trigButns" : ''}
      ${index === 37 ? "butnCos trigButns" : ''}
      ${index === 38 ? "butnTan trigButns" : ''}
      ${index === 39 ? "butnDEG " : ''}

      ${index === 40 ? "butnArcSin invButns" : ''}
      ${index === 41 ? "butnArcCos invButns" : ''}
      ${index === 42 ? "butnArcTan invButns" : ''}
      ${index === 43 ? "butnRAD RadHide" : ''}

      ${index === 44 ? "butnCsc trigButns" : ''}
      ${index === 45 ? "butnSec trigButns" : ''}
      ${index === 46 ? "butnCot trigButns" : ''}
      ${index === 47 ? "butnHyp " : ''}

      ${index === 48 ? "butnAns butnHid butnc" : ''}

      ${index === 49 ? "butnSinh butnHid invHyp hypHide" : ''}
      ${index === 50 ? "butnCosh butnHid invHyp hypHide" : ''}
      ${index === 51 ? "butnTanh butnHid invHyp hypHide" : ''}

      ${index === 52 ? "butnArcCsc butnHid invButns" : ''}
      ${index === 53 ? "butnArcSec butnHid invButns" : ''}
      ${index === 54 ? "butnArcCot butnHid invButns" : ''}

      ${index === 55 ? "butnCsch butnHid invHyp hypHide" : ''}
      ${index === 56 ? "butnSech butnHid invHyp hypHide" : ''}
      ${index === 57 ? "butnCoth butnHid invHyp hypHide" : ''}


      ${index === 5 || index === 6
        || index === 7 || index === 15
        || index === 23 || index === 31
        ? "butnc" : ""}

      ${index === 8 || index === 9 || index === 10 || index === 11
        || index === 16 || index === 17 || index === 18 || index === 19
        || index === 24 || index === 25 || index === 26 || index === 27
        || index === 36 || index === 37 || index === 38 || index === 39
        || index === 40 || index === 41 || index === 42 || index === 43
        || index === 44 || index === 45 || index === 46 || index === 47
        || index === 48 || index === 49

        ? 'butnHid': ''}

    `}
    onClick={(e) => onButtonClick(e, buttons.value)}
    onMouseDown={() => handleMouseDown(index)}
    onMouseUp={handleMouseUp}
    onMouseLeave={handleMouseUp} 
    onTouchStart={() => handleMouseDown(index)}
    onTouchEnd={handleMouseUp}

    style={{
      transform: `${activeButton === index ? 'scale(1.05)' : 'scale(1)'}`,
      padding: `${activeButton === index ? '4px' : '6px'}`,
      transition: `all 0.2s`
    }}  >
    {buttons.label}
  </button>
))}        </div>
</div>
      </label>
    </form>
    </div>    
    </>
  );
}

export default UTonyCalc

