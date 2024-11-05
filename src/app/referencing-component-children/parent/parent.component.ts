import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ChildComponent} from "../child/child.component";

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [
    ChildComponent
  ],
  template: `
    <h2>Parent Component</h2>
    <app-child></app-child>
    <button (click)="interactWithChild()">Interact with Child</button>
    <p>{{ childMessage }}</p>
  `
})
export class ParentComponent implements AfterViewInit {
  @ViewChild(ChildComponent) childComponent!: ChildComponent;
  childMessage = '';

  ngAfterViewInit() {
    // Access the child component after the view initializes
    this.childMessage = this.childComponent.greet();
  }

  interactWithChild() {
    alert(this.childComponent.greet());
  }
}
