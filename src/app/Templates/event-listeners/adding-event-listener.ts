import {Component} from "@angular/core";

@Component({
  selector: "app-adding-event-listener",
  template: `
    <button (click)="handleClick($event)">Click me</button>
  `,
  standalone: true,
})
export class AddEventListenerComponent {
  handleClick(event: MouseEvent) {
    console.log('Clicked position:', event.clientX, event.clientY);
  }
}
