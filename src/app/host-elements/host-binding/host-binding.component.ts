import {Component, HostBinding, HostListener} from '@angular/core';

@Component({
  selector: 'app-host-binding',
  standalone: true,
  template: `<p>Click to toggle the card's selected state!</p>`,
  styles: [`
    :host {
      display: block;
      padding: 20px;
      border: 2px solid #ddd;
      cursor: pointer;
      transition: background-color 0.3s, border-color 0.3s;
    }

    :host(.active) {
      border-color: #4CAF50;
    }
  `],
  host: {
    '[attr.role]': '"alert"', // Sets the ARIA role attribute
    '(click)': 'onHostClick()', // Adds a click event listener
  },
})
export class HostBindingComponent {
  private isSelected = false;

  // Dynamically apply the 'active' class when isSelected is true
  @HostBinding('class.active') get activeClass() {
    return this.isSelected;
  }

  // Dynamically bind the background color style based on isSelected
  @HostBinding('style.backgroundColor') get backgroundColor() {
    return this.isSelected ? '#e8f5e9' : '#ffffff';
  }

  // Toggle isSelected on click
  @HostListener('click')
  toggleSelected() {
    this.isSelected = !this.isSelected;
  }

  // Shows alert on console. This will only work if toggleSelected() is commented as both are listening on 'click'
  onHostClick() {
    console.log('Alert clicked!');
  }

  /*
  *
  * Explanation
  @HostBinding('class.active'): This binds the active CSS class to the host element whenever isSelected is true. The get activeClass() getter returns true or false based on isSelected, so Angular adds or removes the active class automatically.
  @HostBinding('style.backgroundColor'): This binds the backgroundColor style directly to the host element, setting it to #e8f5e9 when isSelected is true and to #ffffff (white) when isSelected is false.
  @HostListener('click'): Adds a click listener to the host element, toggling the isSelected state each time the element is clicked.
  *
  *
  * (click): 'onHostClick()': Sets up a click event listener on the host element, triggering onHostClick() when clicked.
  * */
}
