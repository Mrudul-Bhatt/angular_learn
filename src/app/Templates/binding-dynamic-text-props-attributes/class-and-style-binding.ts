import {Component} from "@angular/core";

@Component({
  selector: "class-and-style-binding",
  template: `
    <!-- app.component.html -->
    <div [class.active]="isActive">This div is active</div>
    <div [style.background-color]="bgColor">This div has a dynamic background color</div>
  `,
  standalone: true
})
export class ClassAndStyleBindingComponent {
  isActive = true;
  bgColor = 'lightblue';
}
