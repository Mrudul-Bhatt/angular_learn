/*

Deferred loading in Angular allows you to delay loading parts of your application until they’re actually needed, helping
improve initial load times and overall performance. It’s particularly useful for loading resources, components, or
modules only when they are required, especially in large applications where not all features are immediately used.

Key Techniques for Deferred Loading
Lazy Loading Modules
Defer Loading Components with ngIf or *ngIf
On-demand Component Loading with ViewContainerRef and ComponentFactoryResolver
The Defer Directive (Angular 16+)


1. Lazy Loading Modules


const routes: Routes = [
  {
    path: 'feature',
    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
  }
];

 */


/*

2. Deferred Loading of Components with *ngIf

Using Angular’s structural directives like *ngIf, you can conditionally load components based on specific conditions,
ensuring they are not part of the DOM until needed.


<button (click)="showComponent = true">Load Component</button>

<!-- Component will only load when showComponent is true -->
<app-expensive-component *ngIf="showComponent"></app-expensive-component>

 */


/*
3. On-demand Component Loading with ViewContainerRef

 */


import {Component, ComponentRef, ViewChild, ViewContainerRef} from '@angular/core';


@Component({
  selector: 'app-dynamic',
  template: ``,
  standalone: true,
})
export class DynamicComponent {

}

@Component({
  selector: 'app-parent-deferred-loading',
  template: `
    <ng-container #dynamicContainer></ng-container>
    <button (click)="loadComponent()">Load Dynamic Component</button>
  `,
  standalone: true,
})
export class ParentDeferredLoadingComponent {
  @ViewChild('dynamicContainer', {read: ViewContainerRef, static: true})
  container!: ViewContainerRef;

  private componentRef: ComponentRef<DynamicComponent> | null = null;

  loadComponent() {
    if (!this.componentRef) {
      this.componentRef = this.container.createComponent(DynamicComponent);
    }
  }
}
