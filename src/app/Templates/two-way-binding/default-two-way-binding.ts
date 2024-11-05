// app.component.ts
import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-defaultTwoWayBinding',
  standalone: true,
  template: `
    <input [(ngModel)]="name" placeholder="Enter your name"/>
    <p>Hello, {{ name }}!</p>
  `,
  imports: [
    FormsModule
  ]
})
export class DefaultTwoWayBindingComponent {
  name: string = 'Angular User';
}

/*

How Two-Way Binding Works

In Angular, two-way binding is accomplished using [(ngModel)] directive, which combines:

    Property Binding ([property]) - Sends data from the component to the view.
    Event Binding ((event)) - Sends data from the view to the component.

The syntax for two-way binding in Angular is [()], which is commonly referred to as the banana in a box syntax.
 */
