import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Validators} from '@angular/forms';
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  standalone: true,
  selector: 'app-yearly-consumption-calculator',
  templateUrl: './yearly-consumption-calculator.component.html',
  imports: [NgIf, ReactiveFormsModule, JsonPipe, MatInputModule, MatCardModule, TranslateModule, NgForOf],
  styleUrls: ['./yearly-consumption-calculator.component.css']
})

export class YearlyConsumptionCalculatorComponent implements OnInit {
  private readonly DAYS_PER_YEAR = 365;
  calculatorForm: FormGroup = this.formBuilder.group({
    daysPerYear: [this.DAYS_PER_YEAR, [Validators.required, Validators.min(0), Validators.max(this.DAYS_PER_YEAR)]],
    wattsPerDay: [null, [Validators.required, Validators.min(0)]],
  });
  consumptionPerYear: number = -1;

  constructor(private formBuilder: FormBuilder, public translate: TranslateService) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|de/) ? browserLang : 'en');
  }


  ngOnInit(): void {
    // Subscribe to form value changes
    this.calculatorForm.valueChanges.subscribe(() => {
      this.calculateConsumptionPerYear();
    });
  }

  calculateConsumptionPerYear() {
    const daysPerYear = this.calculatorForm.get('daysPerYear')?.value;
    const kiloWattsPerDay = this.calculatorForm.get('wattsPerDay')?.value;

    // Calculate the product
    this.consumptionPerYear = daysPerYear * kiloWattsPerDay;
  }

  get daysPerYearControl() {
    return this.calculatorForm.get('daysPerYear');
  }

  get wattsPerDayControl() {
    return this.calculatorForm.get('wattsPerDay');
  }
}
