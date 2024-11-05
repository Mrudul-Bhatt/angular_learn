// card.component.ts
import {Component} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <ng-content select="[header]"></ng-content> <!-- Slot for header content -->
      <div class="card-body">
        <ng-content></ng-content> <!-- Slot for main content -->
      </div>
      <ng-content select="[footer]"></ng-content> <!-- Slot for footer content -->
    </div>
  `,
  standalone: true,
  styles: [`
    .card {
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 4px;
    }

    .card-body {
      margin-top: 0.5rem;
    }
  `]
})
export class CardComponent {
}


@Component({
  selector: 'app-card-parent',
  template: `
    <app-card>
      <div header>
        <h2>Card Header</h2>
      </div>

      <p>This is the main content of the card, dynamically projected from the parent component.</p>

      <div footer>
        <button>Submit</button>
      </div>
    </app-card>

  `,
  standalone: true,
  imports: [
    CardComponent
  ]
})
export class CardParentComponent {

}


/*
Output :

<div class="card">
  <div header>
    <h2>Card Header</h2>
  </div>
  <div class="card-body">
    <p>This is the main content of the card, dynamically projected from the parent component.</p>
  </div>
  <div footer>
    <button>Submit</button>
  </div>
</div>


 */
