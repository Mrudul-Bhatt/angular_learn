import {Component} from "@angular/core";

@Component({
  selector: "app-key-modifiers",
  template: `
    <input (keyup.enter)="handleEnter()" placeholder="Press Enter Key"/>
  `,
  standalone: true,
})
export class KeyModifiersComponent {
  handleEnter() {
    console.log('Enter key pressed!');
  }
}
