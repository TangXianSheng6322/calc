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
  operatorsSigns = new Set(['+', '-', '*', '÷']);
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
    if (buttonElement === 'AC') {
      displayControl?.setValue('');
      return;
    }
    if (buttonElement === 'C' && currentValue > 0) {
      displayControl?.setValue(currentValue.slice(0, -1));
      return;
    }

    if (
      this.operatorsSigns.has(buttonElement) &&
      this.operatorsSigns.has(currentValue.slice(-1))
    ) {
      return;
    }
    displayControl?.setValue(currentValue + buttonElement);
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
}
