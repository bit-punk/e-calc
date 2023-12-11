import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Validators} from '@angular/forms';
import {DecimalPipe, JsonPipe, NgIf} from "@angular/common";
import {AkwDisplayComponent} from "../akw-display/akw-display.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  standalone: true,
  selector: 'app-calculator',
  templateUrl: './yearly-costs-calculator.component.html',
  imports: [NgIf, ReactiveFormsModule, JsonPipe, DecimalPipe, AkwDisplayComponent, MatFormFieldModule, MatInputModule, MatCardModule, TranslateModule],
  styleUrls: ['../app.component.css', './yearly-costs-calculator.component.css']
})

export class YearlyCostsCalculatorComponent implements OnInit {
  private readonly HOURS_PER_DAY = 24;

  yearlyCostsCalculatorForm: FormGroup = this.formBuilder.group({
    standbyDeviceConsumption: [null, [Validators.required, Validators.min(0)]],
    electricityPrice: [null, [Validators.required, Validators.min(0)]],
    standbyHoursPerDay: [this.HOURS_PER_DAY, [Validators.required, Validators.min(0), Validators.max(this.HOURS_PER_DAY)]]
  });
  consumptionInKiloWattsHoursPerYear: number = -1;
  costsPerYear: number = -1;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    // Subscribe to form value changes
    this.yearlyCostsCalculatorForm.valueChanges.subscribe(() => {
      this.calculateCostsPerYear();
    });
  }

  calculateYearlyPowerConsumptionInKiloWatts() {
    const standbyDeviceConsumption = this.yearlyCostsCalculatorForm.get('standbyDeviceConsumption')?.value;
    const standbyHoursPerDay = this.yearlyCostsCalculatorForm.get('standbyHoursPerDay')?.value;
    console.log("Consumption", standbyDeviceConsumption);
    console.log("Standby hours", standbyHoursPerDay);
    // Calculate the product
    this.consumptionInKiloWattsHoursPerYear = standbyDeviceConsumption * standbyHoursPerDay * 365 / 1000;
    return  this.consumptionInKiloWattsHoursPerYear;
  }

  calculateCostsPerYear() {
    const electricityPrice = this.yearlyCostsCalculatorForm.get('electricityPrice')?.value;

    console.log("Price", electricityPrice);
    // Calculate the product
    this.costsPerYear = this.calculateYearlyPowerConsumptionInKiloWatts() * electricityPrice ;
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
