import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  standalone: true,
  selector: 'app-root',
  template: ` <app-profile [name]="userName" [age]="userAge"></app-profile> `,
  styles: [],
  imports: [ChildComponent],
})
export class ParentComponent {
  userName = 'Alice';
  userAge = 30;
}
