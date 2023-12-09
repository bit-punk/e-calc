import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {YearlyCostsCalculatorComponent} from "./yearly-costs-calculator/yearly-costs-calculator.component";
import {YearlyConsumptionCalculatorComponent} from "./yearly-consumption-calculator/yearly-consumption-calculator.component";
import {AkwDisplayComponent} from "./akw-display/akw-display.component";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import {LanguageSelectorComponent} from "./language-selector/language-selector.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    YearlyCostsCalculatorComponent,
    YearlyConsumptionCalculatorComponent,
    AkwDisplayComponent,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    HttpClientModule,
    LanguageSelectorComponent
  ],
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
