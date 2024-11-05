import {Component} from "@angular/core";

@Component({
  selector: "dynamic-props",
  template: `
    <button [disabled]="isButtonDisabled">Submit</button>
    <img [src]="imageUrl" alt="Dynamic Image">
  `,
  standalone: true,
})
export class DynamicPropsBindingComponent {
  isButtonDisabled = true;
  imageUrl = 'https://example.com/logo.png';
}
