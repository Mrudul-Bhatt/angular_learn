import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { noSpecialCharacters } from './custom-validator';
import { usernameExists } from './async-validators';

@Component({
  selector: 'app-validate-reactive-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './validate-reactive-forms.component.html',
  styleUrl: './validate-reactive-forms.component.css',
})
export class ValidateReactiveFormsComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          noSpecialCharacters,
          usernameExists,
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }
}

/**
Reactive Forms use FormGroup, FormControl, and FormArray to model and manage forms.

Built-in Validators
Angular provides several built-in validators:

Validators.required: Ensures the field is not empty.
Validators.email: Checks for a valid email format.
Validators.min(length): Minimum numeric value.
Validators.max(length): Maximum numeric value.
Validators.minLength(length): Minimum string length.
Validators.maxLength(length): Maximum string length.
Validators.pattern(regex): Matches a specific regex pattern.
 */
