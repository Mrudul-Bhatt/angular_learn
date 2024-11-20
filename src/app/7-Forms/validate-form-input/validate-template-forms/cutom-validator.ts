import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appForbiddenName]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenNameDirective,
      multi: true,
    },
  ],
})
export class ForbiddenNameDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const forbiddenName = 'admin';
    return control.value === forbiddenName ? { forbiddenName: true } : null;
  }
}
