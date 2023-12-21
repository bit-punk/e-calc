import {Component, OnInit} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {DecimalPipe, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {AkwDisplayComponent} from "../akw-display/akw-display.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import { TimePeriod } from './time-period.enum';
import { ConsumptionTimeUnit } from './consumption-time-unit.enum';

@Component({
  selector: 'app-consumption-calculator',
  standalone: true,
  imports: [TranslateModule, NgIf, MatInputModule, MatCardModule, AkwDisplayComponent, DecimalPipe, ReactiveFormsModule, MatOptionModule, MatSelectModule, MatIconModule, MatGridListModule, KeyValuePipe, NgForOf],
  templateUrl: './consumption-calculator.component.html',
  styleUrls: ['../app.component.css','./consumption-calculator.component.css']
})
export class ConsumptionCalculatorComponent implements OnInit {
  private readonly HOURS_PER_DAY = 24;

  yearlyCostsCalculatorForm: FormGroup = this.formBuilder.group({
    standbyDeviceConsumption: [null, [Validators.required, Validators.min(0)]],
    electricityPrice: [null, [Validators.required, Validators.min(0)]],
    standbyHoursPerDay: [this.HOURS_PER_DAY, [Validators.required, Validators.min(0), Validators.max(this.HOURS_PER_DAY)]]
  });
  consumptionInKiloWattsHoursPerYear: number = -1;
  costsPerYear: number = -1;
  timePeriod = TimePeriod;
  selectedValue: TimePeriod = this.timePeriod.StundenTag;

  consumptionTimeUnit = ConsumptionTimeUnit;
  selectedConsumptionTimeUnit: ConsumptionTimeUnit = this.consumptionTimeUnit.WattPerHour;

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

  onChangeTimeUnitChange($event: any) {

  }
}
