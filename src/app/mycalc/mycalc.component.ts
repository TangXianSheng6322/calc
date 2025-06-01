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
  inputStr: any;
  ngOnInit(): void {
    this.inputStr = new FormGroup({ display: new FormControl('') });
  }

  buttonDown(buttonElement: any) {
    let buttonText = buttonElement;
    if (this.inputStr.display != '') {
      this.inputStr.display.setValue(this.inputStr.display.value + buttonText);
    } else {
      this.inputStr.display.setValue(buttonText);
    }
  }

  clearDisplay() {
    this.inputStr.display = '';
  }
}
