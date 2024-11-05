import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: '.menu-item', // Class selector
  template: `
    <li class="menu-item">
      <a href="#">Menu Item</a>
    </li>
  `,
  styles: [
    `
      .menu-item {
        list-style: none;
      }
      .menu-item a {
        text-decoration: none;
        color: blue;
      }
    `,
  ],
})
export class ClassSelectorComponent {}
