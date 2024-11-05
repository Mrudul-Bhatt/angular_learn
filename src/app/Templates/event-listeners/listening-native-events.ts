import {Component} from "@angular/core";

@Component({
  selector: "app-native-events",
  template: `
    <input (keyup)="handleKeyUp($event)" placeholder="Type something"/>
  `,
  standalone: true,
})
export class ListeningNativeEventsComponent {
  handleKeyUp(event: KeyboardEvent) {
    console.log(`Key pressed: ${event.key}`);
  }
}
