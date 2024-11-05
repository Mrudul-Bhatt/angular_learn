import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  template: `
    <app-child>
      <div header>Header Content</div>
      <!-- Projected to header -->
      <p>This is the body content.</p>
      <!-- Default content -->
      <div footer>Footer Content</div>
      <!-- Projected to footer -->
    </app-child>
  `,
  imports: [ChildComponent],
})
export class ParentComponent {}
