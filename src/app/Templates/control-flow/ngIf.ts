// app.component.ts
import {Component} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-ngIf',
  standalone: true,
  imports: [
    NgIf
  ],
  template: `
    <button (click)="toggleVisibility()">Toggle Message</button>
    <p *ngIf="isVisible">This message is conditionally visible.</p>
  `
})
export class NgIfComponent {
  isVisible: boolean = true;

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
}
