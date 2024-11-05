import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <div class="header">
      <ng-content select="[header]"></ng-content>
      <!-- Project content marked with 'header' -->
    </div>
    <div class="body">
      <ng-content></ng-content>
      <!-- Project default content -->
    </div>
    <div class="footer">
      <ng-content select="[footer]"></ng-content>
      <!-- Project content marked with 'footer' -->
    </div>
  `,
})
export class ChildComponent {}
