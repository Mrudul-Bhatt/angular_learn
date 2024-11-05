import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  template: `
    <app-child
      #child
      (dataSent)="handleData($event)"
      (clicked)="handleClicked($event)"
      (boxClicked)="onBoxClick()"
    ></app-child>
  `,
  imports: [ChildComponent],
})
export class ParentComponent implements AfterViewInit {
  /*********** */

  handleData(data: string) {
    console.log(data); // Output: 'Hello from Child'
  }

  /*********** */

  handleClicked(data: string) {
    console.log(data); // Output: 'Hello from Child'
  }

  /*********** */

  @ViewChild('child') childComponent!: ChildComponent;

  ngAfterViewInit() {
    this.childComponent.message.subscribe((msg: string) => {
      console.log(msg); // Output: 'Hello Observable'
    });
  }

  /*********** */

  onBoxClick() {
    console.log('Box was clicked!');
  }
}
