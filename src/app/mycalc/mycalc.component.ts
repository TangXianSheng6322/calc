import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mycalc',
  imports: [ReactiveFormsModule],
  templateUrl: './mycalc.component.html',
  styleUrl: './mycalc.component.css',
})
export class MycalcComponent implements OnInit {
  inputStr: any;
  ngOnInit(): void {
    this.inputStr = new FormGroup({ display: new FormControl() });
  }

  buttonDown(buttonElement: any) {
    let buttonText = buttonElement.textContent;
    if (this.inputStr.controls.text.value != '') {
      this.inputStr.controls.text.setValue(
        this.inputStr.controls.text.value + buttonText
      );
    } else {
      this.inputStr.controls.text.setValue(buttonText);
    }
  }

  clearDisplay() {
    this.inputStr.display = '';
  }
}
