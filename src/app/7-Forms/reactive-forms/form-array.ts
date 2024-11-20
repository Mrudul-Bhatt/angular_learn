/*

In Angular, FormArray is a way to handle an array of form controls, allowing you to dynamically add or remove controls
in a form. This is useful when you need to collect multiple values of the same type, like a list of phone numbers,
addresses, or skills.

Creating a Dynamic Form Using FormArray
Here’s how to use FormArray to build a dynamic form that allows adding or removing multiple items.

Example: Building a Form with a Dynamic List of Skills
Suppose we want a form where users can add multiple skills.

Step 1: Set Up the Form Group with FormArray in the Component
Import necessary classes from @angular/forms.
Define the form structure with a FormArray for skills.


Step 2: Bind the FormArray in the Template
In the HTML template, use formArrayName to bind the FormArray and create a list of form controls.


 */

import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    skills: new FormArray([])  // Initialize FormArray for skills
  });

  // Getter for easier access to the skills FormArray
  get skills(): FormArray {
    return this.profileForm.get('skills') as FormArray;
  }

  // Method to add a skill control
  addSkill() {
    this.skills.push(new FormControl('', Validators.required));
  }

  // Method to remove a skill control by index
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  // Submit method
  onSubmit() {
    console.log(this.profileForm.value);
  }
}


/*
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
  <label>
    Name:
    <input formControlName="name" placeholder="Your Name" />
  </label>

  <div formArrayName="skills">
    <h3>Skills</h3>
    <button type="button" (click)="addSkill()">Add Skill</button>

    <!-- Iterate over the skills FormArray -->
    <div *ngFor="let skill of skills.controls; let i = index">
      <label>
        Skill {{ i + 1 }}:
        <input [formControlName]="i" placeholder="Enter skill" />
        <button type="button" (click)="removeSkill(i)">Remove</button>
      </label>
    </div>
  </div>

  <button type="submit" [disabled]="profileForm.invalid">Submit</button>
</form>

 */
