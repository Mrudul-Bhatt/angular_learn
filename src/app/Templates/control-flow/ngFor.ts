// app.component.ts
import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-ngFor',
  standalone: true,
  imports: [
    NgForOf
  ],
  template: `
    <ul>
      <li *ngFor="let item of items; let i = index">Item {{ i + 1 }}: {{ item }}</li>
    </ul>
  `
})
export class NgForComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];
}
