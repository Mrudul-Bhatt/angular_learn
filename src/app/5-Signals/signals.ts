/*

Signals in Angular represent a new reactivity model introduced to streamline state management and change detection,
offering a different way to track and respond to state changes. Signals simplify how data flows in Angular applications
by enabling efficient, automatic updates to the UI based on reactive state without complex dependency tracking.
 */

/*
Key Concepts of Signals
Signal Creation: A signal is essentially a reactive, mutable value. Signals can be created and updated, and any changes
to them automatically propagate to any place where they are referenced, triggering UI updates.

Reactivity: Signals use an automatic reactivity model. When a signal's value changes, any part of the code or component
that depends on that signal will automatically update. Angular manages these dependencies transparently, reducing the
need for manual tracking and improving efficiency.

Data Consistency: Signals allow for fine-grained reactivity, where only the components that directly depend on a
specific signal will react to its changes, reducing unnecessary recalculations.

Predictable State Management: Signals work well with Angular's change detection by providing a clear and predictable
way to manage state in components, simplifying debugging and enhancing code readability.
 */

import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <div>
      <p>Count: {{ count() }}</p>
      <button (click)="increment()">Increment</button>
    </div>
  `
})
export class CounterComponent {
  count = signal(0); // Creates a signal with an initial value of 0

  increment() {
    this.count.set(this.count() + 1); // Updates the signal, triggering reactivity
  }
}

/*
Initialization: count = signal(0); creates a signal initialized to 0.

Reading the Signal: {{ count() }} in the template reads the signal. Angular registers the template’s dependency on
count, so any updates will automatically reflect in the UI.

Updating the Signal: this.count.set(this.count() + 1); updates the signal. When count is updated, Angular re-renders
any part of the component that depends on it.
 */


/*
Computed Signals: Derived or computed values based on other signals.
 */

//import { signal, computed } from '@angular/core';

//count = signal(10);
//doubleCount = computed(() => this.count() * 2); // Reactively computes based on count

// Using doubleCount in the template will reactively update when count changes

/*
Effects: Used to perform side effects when a signal changes, like logging or making a network call.

import { signal, effect } from '@angular/core';

count = signal(5);
effect(() => console.log(`Count has changed: ${this.count()}`));

 */
