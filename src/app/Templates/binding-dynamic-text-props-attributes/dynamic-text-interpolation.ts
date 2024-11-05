// app.component.ts
import {Component} from '@angular/core';

@Component({
  selector: 'app-dynamic-text-interpolation',
  standalone: true,
  template: `
    <h1>Welcome, {{ username }}!</h1>
  `
})
export class DynamicTextInterpolationComponent {
  username = 'John Doe';
}
