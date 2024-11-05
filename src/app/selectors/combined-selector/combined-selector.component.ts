import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'button[type="reset"]', // Combined selector
  template: ` <span>Reset</span> `,
  styles: [
    `
      button {
        background-color: #000;
        color: white;
        padding: 10px 20px;
      }
    `,
  ],
})
export class CombinedSelectorComponent {}
