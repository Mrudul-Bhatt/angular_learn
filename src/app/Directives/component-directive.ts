/*
TODO:
  In Angular, directives are classes that let you add behavior to elements in the DOM. There are three main types of
  directives:
    Component Directives - Custom elements with templates, styles, and logic.
    Structural Directives - Modify the DOM layout by adding or removing elements (e.g., *ngIf, *ngFor).
    Attribute Directives - Change the appearance or behavior of an element, component, or another directive (e.g., ngClass, ngStyle).

 */


/*
TODO:
  1. Component Directives : Components are the most common type of directive in Angular. They have a selector, template,
   and optionally styles. Components use the @Component decorator, which extends the @Directive decorator.
 */


import {Component} from '@angular/core';

@Component({
  selector: 'app-hello',
  template: `<h1>Hello, Angular!</h1>`,
  standalone: true,
  styles: [`h1 {
    color: blue;
  }`]
})
export class HelloComponent {
}
