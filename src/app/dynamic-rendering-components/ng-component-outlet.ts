import {Component} from '@angular/core';
import {NgComponentOutlet} from "@angular/common";

@Component({
  selector: 'app-message-one',
  template: `<p>Message One Component</p>`,
  standalone: true
})
export class MessageOneComponent {
}

@Component({
  selector: 'app-message-two',
  template: `<p>Message Two Component</p>`,
  standalone: true
})
export class MessageTwoComponent {
}

@Component({
  selector: 'app-message-three',
  template: `<p>Message Three Component</p>`,
  standalone: true
})
export class MessageThreeComponent {
}

@Component({
  selector: 'app-dynamic-loader',
  standalone: true,
  imports: [
    NgComponentOutlet
  ],
  template: `
    <div>
      <button (click)="loadComponent('one')">Load Message One</button>
      <button (click)="loadComponent('two')">Load Message Two</button>
      <button (click)="loadComponent('three')">Load Message Three</button>
    </div>
    <ng-container *ngComponentOutlet="currentComponent"></ng-container>
  `
})
export class DynamicLoaderComponent {
  currentComponent: any;

  loadComponent(type: string) {
    switch (type) {
      case 'one':
        this.currentComponent = MessageOneComponent;
        break;
      case 'two':
        this.currentComponent = MessageTwoComponent;
        break;
      case 'three':
        this.currentComponent = MessageThreeComponent;
        break;
      default:
        this.currentComponent = null;
    }
  }
}


/*

ngComponentOutlet is a built-in Angular directive that allows you to render components dynamically in your templates without having to use ViewContainerRef and createComponent.

Summary of Key Points
Declarative Dynamic Component Loading: ngComponentOutlet allows you to dynamically insert components in the template based on variables.
Data and Dependency Injection: You can also pass data to dynamically loaded components by using Angular’s Injector or ngComponentOutletInjector.
Simplified Code: With ngComponentOutlet, you don’t need to manage ViewContainerRef or ComponentFactoryResolver manually, making the code more readable and maintainable.

 */
