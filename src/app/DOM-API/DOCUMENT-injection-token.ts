import {Component, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-document-example',
  template: `
    <button (click)="changeTitle()">Change Title</button>`,
  standalone: true
})
export class DocumentExampleComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  changeTitle() {
    this.document.title = 'New Document Title';
  }
}
