import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'button[yt-upload]', // Attribute selector
  template: ` <span>Upload</span> `,
  styles: [
    `
      button {
        background-color: #ff0000;
        color: white;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
      }
    `,
  ],
})
export class AttributeSelectorComponent {}
