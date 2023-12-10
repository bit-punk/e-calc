import {Component, Input} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {DecimalPipe, JsonPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-akw-display',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule, NgIf, NgOptimizedImage, NgForOf, DecimalPipe],
  templateUrl: './akw-display.component.html',
  styleUrls: ['./akw-display.component.css']
})
export class AkwDisplayComponent {
  @Input() set numberOfAkws(value: number) {
    this.totalNumberOfAkws = value;
  }

  // Create an array with 100 elements for the 10x10 grid
  akwArray = new Array(100).fill(0);
  totalNumberOfAkws: number = 0;
  filledIcons: number = 0;

  /**
   * Calculates the width and CSS name for an icon based on the given index.
   *
   * @param {number} index - The index of the icon.
   * @return {Object} - An object containing the calculated width and CSS name.
   *         - calculatedWidth: The width of the icon.
   *         - calculatedCssName: The CSS name of the icon.
   */
  calculateIconWidthAndCSSName(index: number): { calculatedWidth: number, calculatedCssName: string } {
    const MAX_CELL_WIDTH = 30;
    const EMPTY_CELL_CSS = "akw-icon";
    const FILLED_CELL_CSS = "partially-filled";
    const value = this.totalNumberOfAkws - index;

    let calculatedWidth: number = (value < 1 && value > 0 ) ? (value % 1) * MAX_CELL_WIDTH : MAX_CELL_WIDTH;
    let calculatedCssName: string = (value > 0 ) ? FILLED_CELL_CSS : EMPTY_CELL_CSS;

    return {calculatedWidth, calculatedCssName};
  }
}
