import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-profile',
  template: `
    <h2>User Profile</h2>
    <p>Name: {{ formattedName }}</p>
    <p>Age: {{ age }}</p>
  `,
  styles: [
    `
      h2 {
        color: #007bff;
      }
    `,
  ],
})
export class ChildComponent implements OnInit {
  formattedName: string = '';

  // @Input() name: string = ''; // Accepting name from parent
  @Input() age: number = 0; // Accepting age from parent

  @Input()
  set name(value: string) {
    this.formattedName = value.trim(); // Trimming any extra whitespace
  }

  get name(): string {
    return this.formattedName;
  }

  ngOnInit(): void {
    if (!this.age) {
      throw new Error('The "age" input is required for ChildComponent.');
    }
  }

  /**
   *
   * From Angular 16+
   *
   * @Input({ required: true }) value = 0; // Required input
   *
   * @Input({ transform: trimString }) label = ''; // Transformed input
   *
   *
   * function trimString(value: string | undefined) {
        return value?.trim() ?? '';
      }
   *
   * @Input({ transform: booleanAttribute }) disabled = false; // Transforms to boolean
   * @Input({ transform: numberAttribute }) number = 0; // Transforms to number
   *
   */
}
