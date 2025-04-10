import { useState, useRef, useEffect } from 'react'
import * as math from 'mathjs';
import './CalcApp.css';

function UTonyCalc() {
  const [inputVal, setInputVal] = useState('');
  const [cursorPos, setCursorPos] = useState(inputVal.length);
  const [newResult, setNewResult] = useState(inputVal);
  const [inputLen, setInputLen] = useState(0);
  const [isFirstExecution, setIsFirstExecution] = useState(true);
  const [activeButton, setActiveButton] = useState(null);
  const prevInputVal = useRef(inputVal);
  const inputRef = useRef(null);
  const butnCountRef = useRef(true);
  const historyTabRef = useRef(null);
  const contRef = useRef(null);
  const cursorRef = useRef(0);
  const cursorChange = useRef(false);
  const clearRef = useRef(false);
  const valRef = useRef(0);

  const Buttons = [  
  { label: 'H', value: 'history' },
  { label: '←', value: '←' },
  { label: '→', value: '→' },
  { label: 'DEG', value: 'DEG' },
  { label: 'RAD', value: 'RAD' },

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
  { label: 'hyp', value: 'Hyp' },
  
  { label: 'Csc', value: 'csc(' },
  { label: 'Sec', value: 'sec(' },
  { label: 'Cot', value: 'cot(' },  
  
  { label: 'ans', value: 'ans' },

  { label: 'Sin⁻¹', value: 'sin⁻¹(' },
  { label: 'Cos⁻¹', value: 'cos⁻¹(' },
  { label: 'Tan⁻¹', value: 'tan⁻¹(' },  


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
    const butns = document.querySelectorAll('.butns');
    butns.forEach((butn) => {
      // Trim spaces and reassign a cleaned class list
      const cleanClasses = [...butn.classList].map(cls => cls.trim()).filter(cls => cls !== '');
      
      butn.className = cleanClasses.join(' '); // Reassign cleaned class list
    });
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

const setCursorPosition = (position) => {
  if (inputRef.current) {
    if (position > 0) {
      inputRef.current.focus();
      console.log('passed cursor position is', position)
      cursorRef.current = position;
      inputRef.current.setSelectionRange(position, position);
    } else if (position === 0) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(0, 0);
      console.log('the passed position was ZERO', position)
    } else {
      inputRef.current.focus();
      console.log('the cursor is at the beginning', position)
      inputRef.current.setSelectionRange(inputVal.length, inputVal.length);
    }
  }
}

const getCursorPosition = () => {
  if (inputRef.current) {
    if (inputRef.current.selectionStart === inputRef.current.value.length) {
      const cursorIsAt = inputRef.current.selectionStart;
      console.log('the selectionStart cursor is at DEFAULT position', cursorIsAt)
      console.log('from DEfault cursor REF is', cursorRef.current)
      return cursorIsAt;
    } else {
      const cursorIsAt = inputRef.current.selectionStart;
      console.log('the selectionStart cursor is at NEW Position', cursorIsAt) ;
      console.log('from NEW cursor REF is', cursorRef.current)
      return cursorIsAt;
    }
  }
}

useEffect(() => {
  if (inputRef.current) { 
    if (inputRef.current.selectionStart != inputRef.current.value.length) {
      const cursorPosition = getCursorPosition(); 
      setCursorPosition(cursorPosition);
      console.log('GOTTEN Cursor position is', cursorPosition);
      setInputLen(cursorPosition);
    } else if (cursorChange.current) {
      console.log('AUTO set to', cursorRef.current)
      if (clearRef.current) {
        setCursorPosition(cursorRef.current);
        console.log('clearREF set to NORMAL')
      } else {
        setCursorPosition(cursorRef.current + 1)
        console.log('clearREF set to NORMAL PLUS one')
      }
    } 
  }
}, [cursorPos, inputVal]);

const handleValueChange = (e) => {
  const newVal = e.target.value;
  console.log('val changed!');

  if (newVal !== inputVal) {
    butnCountRef.current = true;
    console.log('val no longer the same');
  }
}

const onButtonClick = (e, val) => {
    e.preventDefault();

    const err = "math error";
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
        function replaceRow() {
          const container = document.querySelector('.fullContainer');
          const currentGrid = getComputedStyle(container).gridTemplateAreas;
  
          console.log('this is the current grid layout', currentGrid);
          
          const gridRows = currentGrid.split('" "');
          console.log(gridRows);
          const filteredRows = gridRows.filter(gridRows => gridRows !== 'sine cosine tangent DEG' && gridRows !== 'cosec secant cotangent hyperbolic');
          console.log(filteredRows)
        }
        replaceRow();
        
        butn.forEach((button) => {
          if (button.classList.contains('butnHid')) {
            button.classList.replace("butnHid", "butnShow");
          } else {
            button.classList.replace("butnShow", "butnHid");
          }
        });

        if (showAllButn.classList.contains("fullContainer")) {
          showAllButn.classList.replace("container", "fullContainer");
        } else {
          showAllButn.classList.replace("fullContainer", "container");
        }

      } else if (window.innerWidth >= 768) {
        showAllButn.classList.replace("fullContainer", "cont");
      }
    }
    
     function replaceRow(newRow5, newRow6) {
      const container = document.querySelector('.fullContainer');
      const currentGrid = getComputedStyle(container).gridTemplateAreas;

      console.log('this is the current grid layout', currentGrid);
      
      const gridRows = currentGrid.split('" "').map((row) => row.replace(/"/g, ''));;
      console.log(gridRows);
      let rowIndex = gridRows.findIndex((row) => row.includes('sine cosine tangent hyperbolic'))
      console.log(rowIndex)

      if (rowIndex !== -1) {
        gridRows[rowIndex] = newRow5
        gridRows[6] = newRow6
        container.style.gridTemplateAreas = gridRows.map(row => `"${row}"`).join(' ');
        console.log('changed to arc');

      } else if (rowIndex === -1) {
        gridRows[5] = 'sine cosine tangent hyperbolic'
        gridRows[6] = 'cosec secant cotangent answer'
        container.style.gridTemplateAreas = gridRows.map(row => `"${row}"`).join(' ');
        console.log('return to default')
      }
    }

    const replaceTrigMode = (newTrigMode) => {
      const container = document.querySelector('.fullContainer');
      const currentGrid = getComputedStyle(container).gridTemplateAreas;

      const gridItems = currentGrid.split('" "').map((item) => item.replace('"', ''));
      console.log(gridItems[1]);
      const itemIndex = gridItems.findIndex((item) => item.includes('history left right DEG'));
      console.log(itemIndex);

      if (itemIndex !== -1) {
        gridItems[itemIndex] = newTrigMode;
        container.style.gridTemplateAreas = gridItems.map((item) => `"${item}"`).join(' ');
        console.log('convert to RAD');
        console.log(gridItems);
      } else if (itemIndex === -1) {
        gridItems[1] = 'history left right DEG';
        container.style.gridTemplateAreas = gridItems.map(item => `"${item}"`).join(' ');
        console.log('restore to DEG');
        console.log(gridItems);
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

            const isSameExpressionResult = (enteredExpression.toString() === preciseResult.toString());
            console.log(enteredExpression.toString());
            console.log(preciseResult.toString())
            console.log('both exprss & result are the same ?',isSameExpressionResult);
    
            if (!isDuplicateOfFirstItem && !isSameExpressionResult) {
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
            prevInputVal.current = result.toString();
            resolve();
          });
        };
    
        const newInputValue = () => {
          setInputVal(result.toString());
          setNewResult("");
          setCursorPos(result.toString().length);
          console.log(val === expression);
          console.log('expression removed, result moved up');
          console.log(prevInputVal.current);
        };
    
        if (isFirstExecution && butnCountRef.current) {
          await setInputValue();
          setIsFirstExecution(false);
          console.log(prevInputVal.current);
          console.log(`butn clicked ${butnCountRef.current = butnCountRef.current + 1} time and expression and result added`)
        } else {
          console.log(prevInputVal.current);
          newInputValue();
          setIsFirstExecution(true);
          butnCountRef.current = false;
          console.log(`butn count is `, butnCountRef.current);
        }
      };

      console.log('the butn ',butnCountRef.current)
      handleInputDisplay(closedInputVal, preciseResult);

      } catch {

        if (inputVal.length <= 0) {
          console.log('empty expression')
          const errMessage = 'Empty Expression'
          setInputVal(errMessage);
        } else {
          const errMessage = 'Invalid Expression'
          setInputVal(errMessage);
        }
        
      }

    } else if (val === 'clear') {
      if (cursorPos > 0 && inputRef.current.selectionStart === inputRef.current.value.length ) {
        const newInput = inputVal.slice(0, cursorPos - 1) + inputVal.slice(cursorPos);
        console.log("cursorPos whike CLEAR is",cursorPos)
        setInputVal(newInput);
        setCursorPos(cursorPos - 1);
        console.log('REMOVING val and SHIFTING cursor');
        cursorChange.current = false;
        setCursorPosition(cursorPos - 1);

      } else if (cursorPos > 0 && inputRef.current.selectionStart != inputRef.current.value.length) {
        console.log('REMOVING val AFTER cursor has been shifted, then SHIFT cursor')

        console.log('the 1ST input SELECTIO has exhaused ?', inputVal.slice(0, cursorRef.current - 1).length < 1 )
        const newInput = inputVal.slice(0, cursorRef.current - 1) + inputVal.slice(cursorRef.current);
        if (inputVal.slice(0, cursorRef.current - 1).length < 1 ) {
          console.log("cursorPos while CLEAR is",cursorPos)
          console.log('the 1ST input SELECTION has exhaused now RESET!!!')
          setInputVal(newInput);
          console.log('the CUT val is ', inputVal.slice(0, cursorRef.current - 1), 'and the REST of the Val is', inputVal.slice(cursorRef.current)) ;
          cursorChange.current = true; 
          clearRef.current = true;
          // Reset the cursor
          setCursorPos(cursorRef.current = inputRef.current.value.length);
          setCursorPosition(cursorRef.current);
        } else {
          console.log("cursorPos while CLEAR is",cursorPos)
          setInputVal(newInput);
          console.log('the CUT val is ', inputVal.slice(0, cursorRef.current - 1), 'and the REST of the Val is', inputVal.slice(cursorRef.current)) ;
          cursorChange.current = true; 
          clearRef.current = true;
          setCursorPos(cursorRef.current - 1);
          setCursorPosition(cursorRef.current - 1);
        }
                
      } else if (cursorPos > 0 && cursorRef.current != inputRef.current.value.length ) {
        console.log('REMOVING val AFTER cursor has been shifted and a NEW VALUE has been ADDED, then SHIFT cursor')
        const newInput = inputVal.slice(0, cursorRef.current - 1) + inputVal.slice(cursorRef.current);
        console.log("cursorPos while CLEAR is",cursorPos)
        setInputVal(newInput);
        console.log('the CUT val is ', inputVal.slice(0, cursorRef.current - 1), 'and the REST of the Val is', inputVal.slice(cursorRef.current))
        setCursorPos(cursorRef.current - 1);

        cursorChange.current = true;
        clearRef.current = true;
        setCursorPosition(cursorRef.current - 1);        
      } else if (cursorPos === 0 && inputRef.current.value.length) {
        const newInput = inputVal.slice(0, cursorRef.current - 1);
        console.log("cursorPos whike CLEAR is", cursorPos)
        setInputVal(newInput);
        setCursorPos(cursorPos);
        console.log('REMOVING val and SHIFTING cursor', inputVal.slice(0, cursorRef.current - 1));
        cursorChange.current = false;
        setCursorPosition(cursorPos);
      }
    } else if (val === '←') {

      let regex = /\w|[a-z+-×÷\∛\√\²!]|\(|\)+/g;
      let charex = inputVal.match(regex);
      console.log("the MATCHED chars are: ", charex);
      
      const indicesOfLegalChars = charex.map((char, index) => {
        if (
          char.match(/[\d)\+\-\÷\×\∛\√\²\!\^\x²]/) || 
          (index >= 0 && ((char.match(/c|s|t/)) || 
          (charex[index-1].match(/\d/) && char.match(/[cstel]/)) ||
        (charex[index-1].match(/[\+\-\×\÷\∛\√\²\!\^\x²]/) && char.match(/[cstel]/))
        ))) {

        if ((char.match(/c|s|t/) && charex[index + 1].match(/\(/)) || (char.match(/s/) && charex[index + 1].match(/c/))) {
       		return undefined;
        }
          return index;
        }});

      console.log("the indicies of the LEGAL chars GENERALLY are: ", indicesOfLegalChars);
      const nextLegalIndex = indicesOfLegalChars.map(indChar => {
        if (indChar !== undefined) {
            return indChar;
          };
      })
      const filteredNLI = nextLegalIndex.filter(nli => nli != undefined);

      if (cursorPos > 0 && inputRef.current.selectionStart != 0) {
        let legalCharacters = filteredNLI.length;
        const factor = charex.length - filteredNLI.length;
        console.log("out SUBTRACTION FACTOR for this expression is: ", factor);
        let filterIndex = cursorPos - factor;
        console.log("the new index to be used for the fltered array is: ", filterIndex - 1);
        
        console.log('the FIlTERED NEXT legal Chars should be', filteredNLI);
        console.log("the INPUTLENGTH ENTERED IS: ", inputVal.length)
        console.log("input CURSOR is at NORM")
        const expressionInput = document.querySelector('.enteredExpressionInp');

        if (legalCharacters >= 0) {
          setCursorPos(cursorPos - 1);
          console.log("the NEXT legal Char INDEX should be: ", filteredNLI.at(filterIndex - 1));
          setCursorPosition(filteredNLI.at(filterIndex - 1));
          console.log("the CUURENT cursor position From the ARRAY is: ", filteredNLI.at(filterIndex - 1))
          console.log('CursorPos REDUCED to', cursorPos - 1);
        } 

      } else {         
        setCursorPos(inputRef.current.value.length)
        setCursorPosition(inputRef.current.value.length);
        console.log('the input length is', inputRef.current.value.length)
        console.log("cursorPos is at the beginning at ZERO");
        console.log('after ZERO the selection start is', inputRef.current.selectionStart)
        // reset the cursor 
        console.log("the cursor WAS RESET to the input length", inputVal.length)
      }
    }
    else if (val === '→') {
      if (cursorPos >= 0 && inputRef.current.value.length != inputRef.current.selectionStart) {
        const expressionInput = document.querySelector('.enteredExpressionInp');

          setCursorPos(cursorPos + 1);
          console.log('the cursor state position is set to', cursorPos);

          const incrementCursor = () => {
            const cursorIncreased = cursorPos + 1;
            if (cursorIncreased <= inputRef.current.value.length) {
              return cursorIncreased
            } else {
              return inputRef.current.value.length
            }
          }
  
          setCursorPosition(incrementCursor());
          console.log('shifted cursor index', inputRef.current.selectionStart);
          console.log('is the cursor NOTthe same as the input length', inputRef.current.selectionStart != inputRef.current.value.length)
        
        const exprScrlWidth = expressionInput.scrollWidth;
        const exprActualWidth = expressionInput.clientWidth
        if (exprScrlWidth > exprActualWidth) {
          console.log('text exceeded')
          expressionInput.scrollLeft = 0;
        }
        /*
        if (inputVal.includes('sin(') || inputVal.includes('cos(') ||
         inputVal.includes('tan(') || inputVal.includes('csc(') ||
         inputVal.includes('sec(') || inputVal.includes('cot(') ) {
          setCursorPos(cursorPos - 4);
        } else if (inputVal.includes('sinh(')) {
          setCursorPos(cursorPos - 5);
        } else {
          setCursorPos(cursorPos - 1);
        }*/
  
      } else if (inputRef.current.selectionStart === inputRef.current.value.length) {
        console.log('cursor is at END so move to beginning');
        setCursorPosition(0);
        setCursorPos(0)
      }
    }
    else if (val === 'AC') {
      setInputVal('');
      setNewResult('')
      setCursorPos(0, cursorPos);
      setIsFirstExecution(true);
      console.log(cursorPos);
    } else if (val === "expand") {
    showFunctKeys();
    rotateChev();
    hideHistoryTab();
  } else if (val === 'DEG') {

    const switchtoRAD = 'history left right RAD';
    replaceTrigMode(switchtoRAD);
    
    const DegButn = document.querySelector('.butnDEG');
    DegButn.classList.toggle("hidden");

    const RadButn = document.querySelector('.butnRAD');
    RadButn.classList.toggle("hiddenButns");
  }
     else if (val === 'RAD') {
    replaceTrigMode();
    console.log('RAD clicked')
    const RadButn = document.querySelector('.butnRAD');
    RadButn.classList.toggle("hiddenButns");
    const DegButn = document.querySelector('.butnDEG');
    DegButn.classList.toggle("hidden");
    
    } 
    else if (val === 'invert') {
      const invertButn = document.querySelector('.butnInvert');
      invertButn.classList.add('highlytPink');
      console.log(invertButn)

      const notArcButns = document.querySelectorAll('.notArc');

      notArcButns.forEach((notArcButn) => {
        notArcButn.classList.toggle('hidden');
      })
      console.log(butn[45].classList);

      for (let b = 45; b < 54; b++) {
        if (b === 48 || b === 49 || b === 50 ) {
          continue;
        }
        // show button that were initially hidden 
        butn[b].classList.toggle('hiddenButns');
      }

      const newRow5 = 'arcSine arcCosine arcTangent hyperbolic'
      const newRow6 = 'arcCsc arcSec arcCot answer'
      replaceRow(newRow5, newRow6);

    } 
    else if (val === 'Hyp') {
      const hyperbolicButn = document.querySelector('.butnHyp');
      hyperbolicButn.classList.toggle('highlytLime');

      const notHypButns = document.querySelectorAll('.notHyp');
      notHypButns.forEach((notHypButn) => {
        notHypButn.classList.toggle('hidden');
      })
      console.log(butn[40].classList);
      for (let b = 48; b < 57; b++) {
        if (b === 51 || b === 52 || b === 53) {
          continue;
        }
        butn[b].classList.toggle('hiddenButns');
      }

      const newRow5 = 'sinh cosh tanh hyperbolic'
      const newRow6 = 'csch sech coth answer'
      replaceRow(newRow5, newRow6);

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
      const concactStoredResult = inputVal + storedResult;
      setCursorPos(cursorPos + resultLength);
      setInputVal(concactStoredResult);

      const expressionInput = document.querySelector('.enteredExpressionInp');

      
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
      const inputLength = inputRef.current.value.length;
      const newInput = inputVal.slice(0, cursorPos) + val + inputRef.current.value.slice(cursorPos);
      const valueLength = newInput.length;

      console.log('the button clicked was SINGLE : ', val, 'and its length is: ', val.length)

      console.log("the CURSORPOS STATE after input is: ", cursorPos);
      valRef.current = val.length;
      console.log('the clicked value length', valRef.current)

      /*
      if (valRef.current > 1) {
        console.log('a MULTIPLE CHAR button was Clicked!!')
      } else {
        console.log('a SINGLE CHAR button was Clicked!!')
      }
      */

      if (cursorPos >= 0 && inputRef.current.selectionStart === inputLength) {
        console.log('value ADDED at the end');
        if (
        (val === 'sin(') || (val === 'cos(') || (val === 'tan(') ||
        (val === 'csc(') || (val === 'sec(') || (val === 'cot(') ||
        (val === 'sin⁻¹(') || (val === 'cos⁻¹(') || (val === 'tan⁻¹(') ||
        (val === 'csc⁻¹(') || (val === 'sec⁻¹(') || (val === 'cot⁻¹(') ||
        (val === 'sinh(') || (val === 'cosh(') || (val === 'tanh(') ||
        (val === 'csch(') || (val === 'sech(') || (val === 'coth(') ||
        (val === 'log(') || (val === 'ln(') 
        ) {
          setCursorPos(cursorPos + valRef.current);
          setInputVal(newInput);
          cursorChange.current = false;
          console.log("FUNCT butns CLICKED and cursorPos is", cursorPos);
          console.log('selectionStart is at ', inputRef.current.selectionStart);
        } else {
          setCursorPos(cursorPos + valRef.current);
          setInputVal(newInput);
          cursorChange.current = false;
          console.log('NORMAL butn CLICKED and cursorPos is', cursorPos);
          console.log('selectionStart is at ', inputRef.current.selectionStart);
        }
        setCursorPosition(inputLength);

      }  else if (inputRef.current.selectionStart != inputLength) {
        console.log('the user entered a value while the cursor has been SHIFTED now place it in the new position');
        if (
          (val === 'sin(') || (val === 'cos(') || (val === 'tan(') ||
          (val === 'csc(') || (val === 'sec(') || (val === 'cot(') ||
          (val === 'sin⁻¹(') || (val === 'cos⁻¹(') || (val === 'tan⁻¹(') ||
          (val === 'csc⁻¹(') || (val === 'sec⁻¹(') || (val === 'cot⁻¹(') ||
          (val === 'sinh(') || (val === 'cosh(') || (val === 'tanh(') ||
          (val === 'csch(') || (val === 'sech(') || (val === 'coth(') ||
          (val === 'log(') || (val === 'ln(') 
          ) {
            setCursorPos(cursorPos + valRef.current);
            setInputVal(newInput);
            setCursorPosition(inputRef.current.selectionStart);
            cursorChange.current = true;
            clearRef.current = false;
          } else {
            setCursorPos(inputRef.current.selectionStart);
            setInputVal(newInput);
            setCursorPosition(cursorRef.current);
            cursorChange.current = true;
            clearRef.current = false;
            console.log('shifted the cursor by ', inputRef.current.selectionStart);
          }

      } else if (cursorPos != 0 && cursorPos === inputLength) {
        console.log('value ADDED  after reset, so RESET cursor')
        setCursorPosition(cursorPos);
      } else {
        if (
          (val === 'sin(') || (val === 'cos(') || (val === 'tan(') ||
          (val === 'csc(') || (val === 'sec(') || (val === 'cot(') ||
          (val === 'sin⁻¹(') || (val === 'cos⁻¹(') || (val === 'tan⁻¹(') ||
          (val === 'csc⁻¹(') || (val === 'sec⁻¹(') || (val === 'cot⁻¹(') ||
          (val === 'sinh(') || (val === 'cosh(') || (val === 'tanh(') ||
          (val === 'csch(') || (val === 'sech(') || (val === 'coth(') ||
          (val === 'log(') || (val === 'ln(') 
          ) {
            setCursorPos(cursorPos + valueLength);
            setInputVal(newInput);
          } else {
            setCursorPos(inputRef.current.selectionStart);
            setInputVal(newInput);
            console.log('shifted the cursor by DEFAULT', inputRef.current.selectionStart);
          }
      }

      // for preventing giving answer when double click of the same value
      if (inputLength !== valueLength) {
        butnCountRef.current = true;
      } else {
        butnCountRef.current = false;
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
 
  /*
  let left; 
  let right;
  const trackCursor = (inputVal) => {
    // Insert a vertical line to indicate cursor position.
    left = inputVal.slice(0, cursorPos);
    right = inputVal.slice(cursorPos);
    return `${left}|${right}`;
  };*/

  return (
    <>
    <form className='relative'> 
      <label> 
      <div className="calc-container" ref={contRef}>

         <div id="history" className='hideHistory' ref={historyTabRef}> </div>

        <div className='fullContainer max-w-full h-screen border overflow-hidden' id='calccon'> 

          <div className="inputParent">
            <div className="virtualInputField relative bg-neutral-200 h-full rounded-lg" 
                onClick={hideHistoryTab}
            >

              <input type="text" name='calc' value={inputVal} ref={inputRef}
             className='enteredExpressionInp absolute w-full h-1/2 text-2xl text-neutral-700 text-justify font-normal p-2 whitespace-nowrap overflow-x-auto focus:outline-none'
             onChange={(e) => handleValueChange()}
             inputMode="none" />

              <p className="preciseResultInp absolute top-1/2 w-full h-1/2 text-2xl text-green-500 text-justify font-normal p-2 ">{newResult}</p>
            </div>
             
          </div>

          {Buttons.map((buttons, index) => (
  <button
    key = {index} 
    id ="butns"
    className={` 
      ${
        index === 0 || index === 1
        || index === 2 || index === 3
        ? 'topFunctKeys' : 'butns'
      }

      ${index === 0 ? 'butnHist' : ''}
      ${index === 1 ? 'shiftLeft' : ''}
      ${index === 2 ? 'shiftRight' : ''}
      ${index === 3 ? "butnDEG " : ''}
      ${index === 4 ? "butnRAD RadButn butnHid notArc notHyp hiddenButns" : ''}
    
      ${index === 5 ? 'butnAC': '' }
      ${index === 6 ? 'butnPie': '' }
      ${index === 7 ? 'butnPercent': '' }
      ${index === 8 ? 'butnDivide' : ''}

      ${index === 9 ? 'bracOpen' : ''}
      ${index === 10 ? 'bracClose' : ''}
      ${index === 11 ? 'butnPower' : ''}
      ${index === 12 ? 'butnSqr': '' }

      ${index === 13 ? 'butn1': '' }
      ${index === 14 ? 'butn2': '' }
      ${index === 15 ? 'butn3': '' }
      ${index === 16 ? 'butnTimes' : ''}

      ${index === 17 ? 'butnFact': '' }
      ${index === 18 ? 'butnSqrt': '' }
      ${index === 19 ? 'butnCbrt': '' }
      ${index === 20 ? 'butnExp': '' }

      ${index === 21 ? 'butn4': ''}
      ${index === 22 ? 'butn5': ''}
      ${index === 23 ? 'butn6': ''}
      ${index === 24 ? 'butnPlus': ''}
        
      ${index === 25 ? 'butnEuler' : ''}
      ${index === 26 ? 'butnNatLog' : ''}
      ${index === 27 ? 'butnLog' : ''}
      ${index === 28 ? 'butnInvert' : ''}

      ${index === 29 ? 'butn7' : ''}
      ${index === 30 ? 'butn8' : ''}
      ${index === 31 ? 'butn9' : ''}
      ${index === 32 ? 'butnMinus' : ''} 

      ${index === 33 ? 'butnPoint' : ''}
      ${index === 34 ? 'butnZero' : ''}
      ${index === 35 ? 'butnClear' : ''}
      ${index === 36 ? 'butnEqual' : ''}

      ${index === 37 ? "butnSin trigButns notArc notHyp" : ''}
      ${index === 38 ? "butnCos trigButns notArc notHyp" : ''}
      ${index === 39 ? "butnTan trigButns notArc notHyp" : ''}
      ${index === 40 ? "butnHyp" : ''}
      
      ${index === 41 ? "butnCsc trigButns notArc notHyp" : ''}
      ${index === 42 ? "butnSec trigButns notArc notHyp" : ''}
      ${index === 43 ? "butnCot trigButns notArc notHyp" : ''}

      ${index === 44 ? "butnAns butnHid " : ''}

      ${index === 45 ? "butnArcSin invButns notHyp hiddenButns" : ''}
      ${index === 46 ? "butnArcCos invButns notHyp hiddenButns" : ''}
      ${index === 47 ? "butnArcTan invButns notHyp hiddenButns" : ''}

      ${index === 48 ? "butnSinh butnHid hypHide notArc hiddenButns" : ''}
      ${index === 49 ? "butnCosh butnHid hypHide notArc hiddenButns" : ''}
      ${index === 50 ? "butnTanh butnHid hypHide notArc hiddenButns" : ''}

      ${index === 51 ? "butnArcCsc butnHid invButns notHyp hiddenButns" : ''}
      ${index === 52 ? "butnArcSec butnHid invButns notHyp hiddenButns" : ''}
      ${index === 53 ? "butnArcCot butnHid invButns notHyp hiddenButns" : ''}

      ${index === 54 ? "butnCsch butnHid hypHide notArc hiddenButns" : ''}
      ${index === 55 ? "butnSech butnHid hypHide notArc hiddenButns" : ''}
      ${index === 56 ? "butnCoth butnHid hypHide notArc hiddenButns" : ''}


      ${index === 6 || index === 7
        || index === 8 || index === 16
        || index === 24 || index === 32
        ? "butnc" : ""}

      ${index === 9 || index === 10 || index === 11 || index === 12
        || index === 17 || index === 18 || index === 19 || index === 20
        || index === 25 || index === 26 || index === 27 || index === 28
        || index === 37 || index === 38 || index === 39 || index === 40
        || index === 41 || index === 42 || index === 43 || index === 44
        || index === 45 || index === 46 || index === 47 || index === 48
        || index === 49 || index === 50

        ? 'butnHid': ''}

    `}
    onClick={
      (e) => {
        onButtonClick(e, buttons.value);
      }
    }
    onMouseDown={() => handleMouseDown(index)}
    onMouseUp={handleMouseUp}
    onMouseLeave={handleMouseUp} 
    onTouchStart={() => handleMouseDown(index)}
    onTouchEnd={handleMouseUp}

    style={{
      transform: `${activeButton === index ? 'scale(1.05)' : 'scale(1)'}`,
      padding: `${activeButton === index ? '4px' : '6px'}`,
      transition: `all 0.2s`,
    }}  >
    {buttons.label}
  </button>
))}        </div>
</div>
      </label>
    </form>
    </>
  );
}

export default UTonyCalc
