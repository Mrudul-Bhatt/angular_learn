/*
How *ngDefer Works

The *ngDefer directive provides options to control when content should load:

when: Defines the trigger for loading content, such as:
  'visible' - when the component comes into view.
  'interaction' - on user interaction.
  'timer' - after a set delay.
loading: Displays a temporary loading template while waiting for the component to load.
onLoad: Allows executing custom code after the deferred content loads

 */

/*
1. Load When Visible

This example loads content only when it scrolls into the viewport.

<div *ngDefer="let load; when: 'visible'; fallback: loadingTemplate">
  <app-heavy-component></app-heavy-component>
</div>

<ng-template #loadingTemplate>
  <p>Loading content...</p>
</ng-template>

 */


/*

2. Load on User Interaction

In this example, *ngDefer waits for the user to click a button before loading the component.


<button (click)="load()">Show Details</button>

<div *ngDefer="let load; when: 'interaction'; fallback: loadingTemplate">
  <app-details-component></app-details-component>
</div>

<ng-template #loadingTemplate>
  <p>Preparing details...</p>
</ng-template>

 */


/*

3. Load After a Delay (Timer)

This example uses a timer to defer loading the component by a set number of milliseconds.

<div *ngDefer="let load; when: 'timer'; delay: 2000; fallback: loadingTemplate">
  <app-delayed-component></app-delayed-component>
</div>

<ng-template #loadingTemplate>
  <p>Loading in 2 seconds...</p>
</ng-template>

 */


/*
4. Custom Action After Content Loads (Using onLoad)

In this example, onLoad is used to execute custom code once the component has finished loading.

 */

import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-defer-directive',
  template: `

    @defer (on hover) {

    }

    <div *ngDefer="let load; when: 'visible'; onLoad: afterLoad(); fallback: loadingTemplate">
      <app-analytics-component></app-analytics-component>
    </div>

    <ng-template #loadingTemplate>
      <p>Loading analytics...</p>
    </ng-template>

  `,
  standalone: true,
  imports: [CommonModule]
})
export class CustomActionAfterContentLoadedComponent {
  afterLoad() {
    console.log('Analytics component loaded');
  }
}
