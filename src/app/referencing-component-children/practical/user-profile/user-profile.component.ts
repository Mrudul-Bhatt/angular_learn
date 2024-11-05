import {Component} from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  template: `
    <div class="user-profile">
      <h3>User Profile</h3>
      <p>{{ profileInfo }}</p>
    </div>
  `
})
export class UserProfileComponent {
  profileInfo = 'User: John Doe';

  updateProfileInfo(newInfo: string) {
    this.profileInfo = newInfo;
  }
}
