// custom-toggle.component.ts
import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'custom-toggle',
  template: `
    <button (click)="toggle()">{{ value ? 'ON' : 'OFF' }}</button>
  `,
  standalone: true
})
export class CustomToggleComponent {
  // Input property to receive the initial value
  @Input() value = false;

  // Output property to emit changes. The naming pattern 'valueChange' is essential for two-way binding.
  @Output() valueChange = new EventEmitter<boolean>();

  // Method to toggle the value and emit the new value to the parent
  toggle() {
    this.value = !this.value;
    this.valueChange.emit(this.value); // Notify parent component about the change
  }
}

@Component({
  selector: 'custom-toggle-parent',
  template: `
    <custom-toggle [(value)]="isToggled"></custom-toggle>
    <p>Toggle is {{ isToggled ? 'ON' : 'OFF' }}</p>
  `,
  imports: [
    CustomToggleComponent
  ],
  standalone: true
})
export class CustomToggleParentComponent {
  // Property in the parent component to bind with the child component
  isToggled = false;
}


/*

Explanation of How it Works

    @Input(): When the parent component sets [(value)]="isToggled", Angular binds the isToggled property in the parent component to the value property in CustomToggleComponent.

    @Output(): When CustomToggleComponent changes value (in this case, on button click), it emits the valueChange event, which Angular detects and uses to update the isToggled property in the parent component.

    This effectively synchronizes the isToggled property between the parent and child, achieving two-way data binding without [(ngModel)].

 */
