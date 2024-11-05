/*

Attribute directives in Angular are used to change the appearance or behavior of an element, component, or another
directive without altering the DOM structure

Common Attribute Directives
Angular comes with several built-in attribute directives that can be used right away:

  ngClass: Dynamically applies or removes CSS classes based on an expression.
  ngStyle: Dynamically sets inline styles based on an expression.
  ngModel: Binds data to form controls (used for two-way data binding)

*/


import {Component, Directive, ElementRef, HostListener, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: "app-attribute-directive",
  template: `
    <div [ngClass]="{ 'active': isActive, 'highlight': isHighlighted }">
      This div is conditionally styled.
    </div>

    <div [ngStyle]="{ 'color': textColor, 'font-size': fontSize + 'px' }">
      This text has dynamic color and font size.
    </div>

    <input [(ngModel)]="username" placeholder="Enter your username">
    <p>Your username is: {{ username }}</p>

  `,
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AttributeDirective {
  isActive = false;
  isHighlighted = false;

  textColor: string = '';
  fontSize: number = 0;

  username: string = '';
}


/*

Custom Attribute Directive : This section walks you through creating a highlight directive that sets the background
color of the host element to yellow.

 */

@Directive({
  standalone: true,
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
}

@Component({
  selector: "app-highlight-parent",
  template: `
    <p appHighlight>Highlight me!</p>
  `,
  standalone: true,
  imports: [
    HighlightDirective
  ]
})
export class HighlightParentComponent {
}


/*

Custom Attribute Directive : This section shows you how to detect when a user mouses into or out of the element and to
respond by setting or clearing the highlight color.

In this example we will see :
  1. How to handle user events
  2. Pass value into attribute directive
  3. Binding to a second variable property
  4. Deactivating angular processing with ngNonBindable : To prevent expression evaluation in the browser, add
  ngNonBindable to the host element. ngNonBindable deactivates interpolation, directives, and binding in templates.
 */

@Directive({
  standalone: true,
  selector: '[appHighlightV2]',
})
export class HighlightDirectiveV2 {
  @Input() defaultColor = '';
  @Input() appHighlightV2 = '';

  constructor(private el: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlightV2 || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}

@Component({
  selector: "app-highlight-parentV2",
  template: `
    <p [appHighlightV2]="color">Highlight me!</p>
    <p [appHighlightV2]="color" defaultColor="violet">
      Highlight me too!
    </p>

    <div ngNonBindable [appHighlightV2]="'yellow'">
      This should not evaluate: {{ 1 +1 }} , but will highlight yellow.
    </div>
  `,
  standalone: true,
  imports: [
    HighlightDirectiveV2
  ]
})
export class HighlightParentComponentV2 {
  color: string = 'yellow';
}
