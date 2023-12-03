import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Validators} from '@angular/forms';
import {JsonPipe, NgIf} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-yearly-consumption-calculator',
  templateUrl: './yearly-consumption-calculator.component.html',
  imports: [NgIf, ReactiveFormsModule, JsonPipe],
  styleUrls: ['./yearly-consumption-calculator.component.css']
})

export class YearlyConsumptionCalculatorComponent implements OnInit {
  calculatorForm: FormGroup = this.formBuilder.group({
    daysPerYear: ["365", [Validators.required, Validators.min(0), Validators.max(365)]],
    kiloWattsPerDay: [null, [Validators.required, Validators.min(0)]],
  });
  consumptionPerYear: number = -1;

  constructor(private formBuilder: FormBuilder) {
  }


  ngOnInit(): void {
    // Subscribe to form value changes
    this.calculatorForm.valueChanges.subscribe(() => {
      this.calculateConsumptionPerYear();
    });
  }

  calculateConsumptionPerYear() {
    const daysPerYear = this.calculatorForm.get('daysPerYear')?.value;
    const kiloWattsPerDay = this.calculatorForm.get('kiloWattsPerDay')?.value;

    // Calculate the product
    this.consumptionPerYear = daysPerYear * kiloWattsPerDay;
  }

  get daysPerYearControl() {
    return this.calculatorForm.get('daysPerYear');
  }

  get kiloWattsPerDayControl() {
    return this.calculatorForm.get('kiloWattsPerDay');
  }
}
