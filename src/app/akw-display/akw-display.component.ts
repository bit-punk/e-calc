import {Component, Input} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {JsonPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-akw-display',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule, NgIf, NgOptimizedImage, NgForOf],
  templateUrl: './akw-display.component.html',
  styleUrls: ['./akw-display.component.css']
})
export class AkwDisplayComponent {
  @Input() numberOfAkws: number = 0;

  // Create an array with 100 elements for the 10x10 grid
  akwArray = new Array(100).fill(0);

}
