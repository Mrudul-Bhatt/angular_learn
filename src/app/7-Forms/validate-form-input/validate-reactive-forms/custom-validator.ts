import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noSpecialCharacters(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value || '';
  const hasSpecialCharacters = /[^a-zA-Z0-9 ]/.test(value);
  return hasSpecialCharacters ? { specialCharacters: true } : null;
}
