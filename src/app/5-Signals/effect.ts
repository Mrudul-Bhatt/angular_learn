/*
What are Effects?
An effect in Angular is a function created using the effect function, which runs code in response to signal changes.
When any of the signals that an effect depends on are updated, the effect re-runs. This lets you react to state changes
without involving Angular’s change detection.

How Effects Work

Automatic Dependency Tracking: When you declare an effect, Angular automatically tracks any signals that are read within
the effect. This means you don’t need to specify dependencies explicitly; Angular infers them based on the signals
accessed in the effect.

Automatic Triggering: When any of the dependent signals change, the effect automatically re-runs, making it ideal for
handling tasks that should reactively respond to state changes.

Isolated Execution: Effects don’t directly update the UI. Instead, they’re used to perform side effects (e.g., logging,
calling APIs) that don’t need to be directly displayed.
 */


import {Component, effect, signal} from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <button (click)="increment()">Increment</button>
  `
})
export class CounterComponent {
  count = signal(0);

  constructor() {
    // Create an effect to log the current count whenever it changes
    effect(() => console.log(`Current count is: ${this.count()}`));
  }

  increment() {
    this.count.set(this.count() + 1); // This will trigger the effect
  }
}


/*
Performing Asynchronous Tasks in Effects

Effects can also trigger asynchronous tasks like API calls. While it’s possible to handle asynchronous logic within an
effect, it’s typically good practice to be cautious with side effects to avoid infinite loops or excessive network
calls. You may want to debounce or otherwise control the frequency of calls in more complex scenarios.

import { signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';

data = signal(null);
fetchData = signal('initial-query');

effect(() => {
  const query = this.fetchData();
  this.httpClient.get(`https://api.example.com/data?query=${query}`)
    .subscribe(result => this.data.set(result));
});

 */


/*
Best Practices for Using Effects

Use Effects for Side Effects Only: Effects are best suited for non-UI side effects, like logging, network requests, or
updating local storage. Avoid using effects to update UI-bound state directly.

Avoid Complex Logic: Keep the logic inside an effect as simple as possible to make it easier to debug and avoid
unintended re-execution.

Handle Cleanup When Necessary: If you set up resources (like subscriptions or intervals) within an effect, be sure to
handle cleanup to avoid memory leaks.

Prevent Excessive Triggering: If an effect is triggered frequently, consider debouncing or throttling to optimize
performance, especially when handling asynchronous operations.

Common Use Cases for Effects

Logging or Analytics: Use effects to track user behavior or application events without needing direct UI bindings.

API Requests on Signal Changes: When you need to make network calls based on signal values, effects can automatically
handle these requests and update application state.

Local Storage Syncing: Effects can save data to local storage or another persistent layer when certain signals change.

Background Tasks: Use effects for background tasks that don’t directly influence UI state, like checking server status
or polling for updates.
 */
