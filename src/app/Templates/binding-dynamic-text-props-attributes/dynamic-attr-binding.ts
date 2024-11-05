import {Component} from "@angular/core";

@Component({
  selector: "dynamic-attr-binding",
  template: `
    <!-- app.component.html -->
    <button [attr.aria-label]="tooltip" [attr.tabindex]="tabindex">Submit</button>
  `,
  standalone: true
})
export class DynamicAttrBindingComponent {
  tooltip = 'Submit your form';
  tabindex = 5;
}
