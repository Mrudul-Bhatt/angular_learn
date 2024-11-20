import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {

  // Define the root FormGroup
  userProfileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),

    // Nested FormGroup for address
    address: new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{5}')])
    })
  });

  constructor(private _router: Router) {
    // Applying the validator to the nested 'address' group
    this.userProfileForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormGroup(
        {
          street: new FormControl('', Validators.required),
          city: new FormControl('', Validators.required),
          postalCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{5}')])
        },
        {validators: this.postalCodeValidator} // Validator applied at the group level
      )
    });

  }

  // Submit function
  onSubmit() {
    console.log(this.userProfileForm.value);
  }


  // Custom validator function
  postalCodeValidator(group: AbstractControl): ValidationErrors | null {
    const city = group.get('city')?.value;
    const postalCode = group.get('postalCode')?.value;

    // Example logic for matching city and postal code
    return city && postalCode && postalCode.startsWith(city.charAt(0))
      ? null
      : {postalCodeMismatch: true};
  }


}
