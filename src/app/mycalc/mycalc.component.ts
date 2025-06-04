import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Component({
  selector: 'app-mycalc',
  imports: [ReactiveFormsModule, NgFor, NgClass],
  templateUrl: './mycalc.component.html',
  styleUrl: './mycalc.component.css',
})
export class MycalcComponent implements OnInit {
  operators = new Set([0, 1, 2, 3, 7, 11, 15]);
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

    displayControl?.setValue(currentValue + buttonElement);
    return;
  }

  getButtonClasses(i: number) {
    // return [
    //   this.operators.has(i) ? 'bg-red-500' : 'bg-green-500',
    //   i === 15 ? 'row-span-2' : 'row-span-1',
    // ];
    const operators = this.operators.has(i) ? 'bg-red-500' : 'bg-green-500';
    const equalSign = i === 15 ? 'row-span-2' : 'row-span-1';
    const base = 'rounded-2xl cursor-pointer';

    return `${base} ${operators} ${equalSign}`;
  }

  evaluateOps(tokens: string[], ops: string[]): string[] {
    while (ops.some((op) => tokens.includes(op))) {
      const op = ops.find((o) => tokens.includes(o));
      const i = tokens.findIndex((t) => t === op);
      const a = Number(tokens[i - 1]);
      const b = Number(tokens[i + 1]);
      let result;
      switch (op) {
        case '*':
          result = a * b;
          break;
        case '÷':
          result = a / b;
          break;
        case ' +':
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

    this.evaluateOps(tokens, ops1);
    this.evaluateOps(tokens, ops2);
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
}
