import {Component} from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `<p>Child component</p>`,
})
export class ChildComponent {
  greet() {
    return 'Hello from Child Component!';
  }
}
