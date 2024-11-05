/*
Declaring Template Variables

Template variables are declared using the # symbol, followed by the variable name. You can use these variables within
the scope of the template to access DOM elements, directive instances, or component properties.

<div #myDiv>Some content</div>
<button (click)="logElement(myDiv)">Log Element</button>

Types of Template Variables

  Referencing DOM Elements: Access a DOM element directly by creating a template variable on that element.

  Referencing Components: Access component instances by assigning a variable to a component tag.

  Referencing Directives: Access directive instances attached to elements.

 */


/*
Example 1: Accessing DOM Elements
 */

import {Component} from "@angular/core";

@Component({
  selector: "app-access-dom-elements",
  template: `
    <input #userInput type="text" placeholder="Enter your name">
    <button (click)="showInput(userInput.value)">Submit</button>
  `,
  standalone: true
})
export class AccessDomElementsComponent {

  showInput(value: string) {
    console.log("Input value:", value);
  }

  callFromParentUsingVariable() {
    console.log("callFromParentUsingVariable");
  }

}


/*
Example 2: Accessing Component Instances
 */

@Component({
  selector: "app-access-component-instances",
  template: `
    <app-access-dom-elements #childComp></app-access-dom-elements>
    <button (click)="childComp.callFromParentUsingVariable()">Call Child Method</button>
  `,
  imports: [
    AccessDomElementsComponent
  ],
  standalone: true
})
export class AccessComponentInstancesComponent {

}


/*
Example 3: Accessing Directive Instances

<div appHighlight #highlightDirective="appHighlight">Highlight this text</div>
<button (click)="highlightDirective.toggleHighlight()">Toggle Highlight</button>

 */

@Component({
  selector: "app-access-directive-instances",
  template: `
    <!--    <div appHighlight #highlightDirective="appHighlight">Highlight this text</div>-->
    <!--    <button (click)="highlightDirective.toggleHighlight()">Toggle Highlight</button>-->
  `,
  imports: [
    AccessDomElementsComponent
  ],
  standalone: true
})
export class AccessDirectiveInstancesComponent {

}


/*
Example 4: Local Variable with ngFor

<ul>
  <li *ngFor="let item of items; let i = index">
    {{ i + 1 }}. {{ item }}
  </li>
</ul>

 */
