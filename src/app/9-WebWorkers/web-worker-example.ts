/**
Web Workers in Angular
Web Workers are a browser feature that allows JavaScript code to run in a separate thread, parallel to the main thread. In Angular, Web Workers are used to handle heavy computations or background tasks without blocking the UI, leading to better performance and responsiveness.

1. Why Use Web Workers?
When a web application performs CPU-intensive tasks (like image processing or complex calculations), these tasks can block the main thread. As a result:

The UI becomes unresponsive.
Animations and interactions lag.
Web Workers solve this by offloading heavy computations to a separate thread, allowing the main thread to focus on rendering the UI.

2. Web Worker Architecture
Main Thread:

Runs the application's UI and handles DOM manipulation.
Communicates with the Web Worker by sending and receiving messages.
Web Worker Thread:

Runs independently of the main thread.
Cannot access the DOM or global objects like window or document.
Communicates back to the main thread using the postMessage API.


3. Setting Up Web Workers in Angular
Angular CLI makes it easy to add Web Workers.

Step 1: Create a Web Worker
Run the Angular CLI command to generate a Web Worker:

ng generate web-worker worker-name

This generates two files:

src/app/worker-name.worker.ts (Web Worker script)
Updates to the angular.json file to include Web Worker support in builds.


Step 2: Writing the Web Worker Code
The worker-name.worker.ts file contains the code that runs in the background thread. Example:


addEventListener: Listens for messages from the main thread.
postMessage: Sends results back to the main thread.

Communicating with the Web Worker
In the main Angular component or service, communicate with the Web Worker:

Key Characteristics of Web Workers
Thread Safety:

Web Workers do not share variables or objects with the main thread.
Communication is strictly via messages (e.g., postMessage and onmessage).
Limited Scope:

Cannot access the DOM, window, or document.
Can access Web APIs like XMLHttpRequest, fetch, WebSockets, and IndexedDB.
Lifecycle:

Web Workers start when created and terminate when no longer needed.
You can terminate a worker manually using worker.terminate().

Angular-Specific Considerations
a. Build Configuration
The Angular CLI automatically updates the angular.json file to enable Web Worker support during builds:
A tsconfig.worker.json file is also generated to handle Web Worker-specific TypeScript configurations.

b. Browser Compatibility
Ensure the target browsers support Web Workers. Use Angular's Browser Support Guide to confirm compatibility.

When to Use Web Workers in Angular
Heavy Computations:

Mathematical calculations, data transformations, or AI/ML model inference.
Image or Video Processing:

Manipulating media files without blocking the UI.
Large Data Handling:

Parsing large JSON files, sorting large datasets, or running algorithms like searching.
Real-Time Features:

Background data synchronization or WebRTC communication.
7. B
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>Web Worker Example</h1>
      <button (click)="startWorker()">Start Computation</button>
      <p>Result: {{ result }}</p>
    </div>
  `,
})
export class AppComponent {
  result: number | null = null;
  worker: Worker | null = null;

  startWorker() {
    if (typeof Worker !== 'undefined') {
      // Create a new Web Worker
      this.worker = new Worker(
        new URL('./worker-name.worker', import.meta.url)
      );

      // Send data to the worker
      this.worker.postMessage(42);

      // Listen for messages from the worker
      this.worker.onmessage = ({ data }) => {
        this.result = data;
      };

      // Handle errors
      this.worker.onerror = (error) => {
        console.error('Web Worker Error:', error);
      };
    } else {
      console.error('Web Workers are not supported in your browser.');
    }
  }
}
