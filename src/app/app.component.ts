import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {YearlyCostsCalculatorComponent} from "./yearly-costs-calculator/yearly-costs-calculator.component";
import {YearlyConsumptionCalculatorComponent} from "./yearly-consumption-calculator/yearly-consumption-calculator.component";
import {AkwDisplayComponent} from "./akw-display/akw-display.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, YearlyCostsCalculatorComponent, YearlyConsumptionCalculatorComponent, AkwDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-calc';
}
