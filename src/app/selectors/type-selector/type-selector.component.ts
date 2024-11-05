import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'profile-photo', // Type selector
  template: `
    <div class="profile-photo">
      <img src="assets/profile.png" alt="Profile Photo" />
    </div>
  `,
  styles: [
    `
      .profile-photo img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    `,
  ],
})
export class TypeSelectorComponent {}
