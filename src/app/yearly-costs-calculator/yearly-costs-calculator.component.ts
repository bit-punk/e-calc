import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Validators} from '@angular/forms';
import {JsonPipe, NgIf} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-calculator',
  templateUrl: './yearly-costs-calculator.component.html',
  imports: [NgIf, ReactiveFormsModule, JsonPipe],
  styleUrls: ['./yearly-costs-calculator.component.css']
})

export class YearlyCostsCalculatorComponent implements OnInit {
  yearlyCostsCalculatorForm: FormGroup = this.formBuilder.group({
    standbyDeviceConsumption: [null, [Validators.required, Validators.min(0)]],
    electricityPrice: [null, [Validators.required, Validators.min(0)]],
    standbyHoursPerDay: [24, [Validators.required, Validators.min(0)]]
  });
  costsPerYear: number = -1;

  constructor(private formBuilder: FormBuilder) {
  }


  ngOnInit(): void {
    // Subscribe to form value changes
    this.yearlyCostsCalculatorForm.valueChanges.subscribe(() => {
      this.calculateCostsPerYear();
    });
  }

  calculateCostsPerYear() {
    const standbyDeviceConsumption = this.yearlyCostsCalculatorForm.get('standbyDeviceConsumption')?.value;
    const electricityPrice = this.yearlyCostsCalculatorForm.get('electricityPrice')?.value;
    const standbyHoursPerDay = this.yearlyCostsCalculatorForm.get('standbyHoursPerDay')?.value;

    // Calculate the product
    this.costsPerYear = standbyDeviceConsumption * electricityPrice * standbyHoursPerDay;
  }

  get standbyDeviceConsumptionControl() {
    return this.yearlyCostsCalculatorForm.get('standbyDeviceConsumption');
  }

  get electricityPriceControl() {
    return this.yearlyCostsCalculatorForm.get('electricityPrice');
  }

  get standbyHoursPerDayControl() {
    return this.yearlyCostsCalculatorForm.get('standbyHoursPerDay');
  }


}
