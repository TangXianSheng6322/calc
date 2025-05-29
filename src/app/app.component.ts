import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MycalcComponent } from './mycalc/mycalc.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MycalcComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'calc';
}
