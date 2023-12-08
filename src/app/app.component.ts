import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {YearlyCostsCalculatorComponent} from "./yearly-costs-calculator/yearly-costs-calculator.component";
import {YearlyConsumptionCalculatorComponent} from "./yearly-consumption-calculator/yearly-consumption-calculator.component";
import {AkwDisplayComponent} from "./akw-display/akw-display.component";
import {FormsModule} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, YearlyCostsCalculatorComponent, YearlyConsumptionCalculatorComponent, AkwDisplayComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-calc';


  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|de/) ? browserLang : 'en');
  }
}
