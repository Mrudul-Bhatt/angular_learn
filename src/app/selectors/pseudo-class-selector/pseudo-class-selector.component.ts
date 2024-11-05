import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: '[dropzone]:not(textarea)', // :not pseudo-class
  template: ` <div class="dropzone">Drop files here</div> `,
  styles: [
    `
      .dropzone {
        border: 2px dashed #ccc;
        padding: 20px;
        text-align: center;
      }
    `,
  ],
})
export class PseudoClassSelectorComponent {}
