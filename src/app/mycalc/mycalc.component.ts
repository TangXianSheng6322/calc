import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mycalc',
  imports: [ReactiveFormsModule, NgFor, NgClass],
  templateUrl: './mycalc.component.html',
  styleUrl: './mycalc.component.css',
})
export class MycalcComponent implements OnInit {
  operators = new Set([0, 1, 2, 3, 7, 11]);
  operatorsSigns = new Set(['+', '-', '*', '÷', '.']);
  inputStr: any;

  buttonValues: string[] = [
    'AC',
    '÷',
    '*',
    'C',
    '1',
    '2',
    '3',
    '-',
    '4',
    '5',
    '6',
    '+',
    '7',
    '8',
    '9',
    '=',
    '.',
    '0',
    '00',
  ];

  ngOnInit(): void {
    this.inputStr = new FormGroup({ display: new FormControl('') });
  }

  buttonDown(buttonElement: string): void {
    const displayControl = this.inputStr.get('display');
    const currentValue = displayControl?.value || '';

    if (currentValue === '' && this.operatorsSigns.has(buttonElement)) return;
    //AC
    if (buttonElement === 'AC') {
      displayControl?.setValue('');
      return;
    }
    //C
    if (buttonElement === 'C') {
      if (currentValue.length > 0) {
        displayControl?.setValue(currentValue.slice(0, -1));
      }
      return;
    }
    //Same operators and replacement
    const lastChar = currentValue.slice(-1);
    if (
      this.operatorsSigns.has(buttonElement) &&
      this.operatorsSigns.has(lastChar)
    ) {
      //Replaces element
      displayControl?.setValue(currentValue.slice(0, -1) + buttonElement);
      return;
    }

    //Evaluates

    if (buttonElement === '=') {
      this.calcEval();
      return;
    }

    if (buttonElement === '.') {
      const parts = currentValue.split(/[\+\-\*÷]/);
      const lastNum = parts[parts.length - 1];
      if (lastNum.includes('.')) return;
    }

    displayControl?.setValue(currentValue + buttonElement);
    return;
  }

  // getButtonClasses(i: number) {
  //   // return [
  //   //   this.operators.has(i) ? 'bg-red-500' : 'bg-green-500',
  //   //   i === 15 ? 'row-span-2' : 'row-span-1',
  //   // ];
  //   const operators = this.operators.has(i)
  //     ? 'bg-red-500 hover:bg-red-300 red-btn '
  //     : i === 15
  //     ? 'row-span-2 bg-red-500 hover:bg-red-300 '
  //     : 'bg-green-500 hover:bg-green-300 star ';
  //   // const equalSign =
  //   //   i === 15 ? 'row-span-2 bg-red-500 hover:bg-red-300' : 'row-span-1';
  //   const base = 'rounded-2xl cursor-pointer ';

  //   return ` ${base} ${operators} `;
  // }

  getButtonClasses(i: number) {
    const equalClass = 'row-span-2 bg-red-500 hover:bg-red-300 min-w-0 min-h-0';
    const numberClass = 'bg-green-500 hover:bg-green-300';
    const operatorClass = 'bg-red-500 hover:bg-red-300 red-btn ';
    const base = 'rounded-2xl cursor-pointer text-3xl';

    let specificClass = '';

    if (this.operators.has(i)) {
      specificClass = operatorClass;
    } else if (i === 15) {
      specificClass = equalClass;
    } else {
      specificClass = numberClass;
    }

    return ` ${base} ${specificClass} `;
  }

  evaluateOps(tokens: string[], ops: string[]): string[] | null {
    while (ops.some((op) => tokens.includes(op))) {
      const op = ops.find((o) => tokens.includes(o));
      const i = tokens.findIndex((t) => t === op);
      const a = Number(tokens[i - 1]);
      const b = Number(tokens[i + 1]);
      let result;
      if (op === '÷' && b === 0) {
        this.inputStr.get('display').setValue('Error: ÷0');
        return null;
      }
      switch (op) {
        case '*':
          result = a * b;
          break;
        case '÷':
          result = a / b;
          break;
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
      }
      tokens.splice(i - 1, 3, result!.toString());
    }
    return tokens;
  }

  calcEval() {
    const finalStr = this.inputStr.get('display').value.replace(/\s/g, '');
    const tokens = finalStr.match(/(\d+(\.\d+)?|\+|\-|\*|÷)/g);
    if (!tokens) return;

    const ops1 = ['*', '÷'];
    const ops2 = ['+', '-'];

    const res1 = this.evaluateOps(tokens, ops1);
    if (!res1) return;
    const res2 = this.evaluateOps(tokens, ops2);
    if (!res2) return;
    // for (const op of ops1) {
    //   while (tokens.includes(op)) {
    //     const firstOp = tokens.findIndex((x: string) => x === op);
    //     const firstNum = Number(tokens[firstOp - 1]);
    //     const secondNum = Number(tokens[firstOp + 1]);
    //     const result = op === '*' ? firstNum * secondNum : firstNum / secondNum;
    //     tokens.splice(firstOp - 1, 3, result.toString());
    //   }
    // }
    // for (const op of ops2) {
    //   while (tokens.includes(op)) {
    //     const firstOp = tokens.findIndex((x: string) => x === op);
    //     const firstNum = Number(tokens[firstOp - 1]);
    //     const secondNum = Number(tokens[firstOp + 1]);
    //     const result = op === '+' ? firstNum + secondNum : firstNum - secondNum;
    //     tokens.splice(firstOp - 1, 3, result.toString());
    //   }
    // }
    this.inputStr.get('display').setValue(tokens[0]);
  }
  bounce(event: MouseEvent) {
    const btn = event.target as HTMLElement;
    if (btn.innerText != '=') {
      btn.classList.add('bouncy', 'star');
      //remove class
      btn.addEventListener(
        'animationend',
        () => {
          btn.classList.remove('bouncy', 'star');
        },
        { once: true }
      );
    } else {
      btn.classList.add('bouncy');
      //remove class
      btn.addEventListener(
        'animationend',
        () => {
          btn.classList.remove('bouncy');
        },
        { once: true }
      );
    }
  }
}
