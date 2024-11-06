/*
Class providers: useClass
The useClass provider key lets you create and return a new instance of the specified class.

You can use this type of provider to substitute an alternative implementation for a common or default class. The
alternative implementation can, for example, implement a different strategy, extend the default class, or emulate the
behavior of the real class in a test case.

In the following example, BetterLogger would be instantiated when the Logger dependency is requested in a component or
any other class:


[{ provide: Logger, useClass: BetterLogger }]

 */

/*

Basic Syntax

The useClass option is specified in a providers array, associating a token with a class other than the original class:

providers: [
  { provide: OriginalClassToken, useClass: ReplacementClass }
]

When a dependency injection framework like Angular encounters a request for OriginalClassToken, it provides an instance
of ReplacementClass instead.


 */

/*
Practical Use Cases

Swapping Implementations
You might want to switch between different implementations of a service. For example, imagine two logging services: a
simple console logger for development and a more advanced one for production.

Extending or Customizing Functionality
Use useClass to extend a base class. This allows you to create custom classes with additional features while keeping
the original service intact.

Mocking for Testing
You can use useClass to provide mock services during testing, allowing for isolated testing without modifying the
application’s primary services.
 */


//Example 1: Switching Service Implementations

// Basic logger with minimal functionality
export class Logger {
  log(message: string) {
    console.log('Logger:', message);
  }
}

// Advanced logger with more complex logging
export class AdvancedLogger {
  log(message: string) {
    console.log('AdvancedLogger:', new Date(), message);
  }
}


import {Component, NgModule} from '@angular/core';

@NgModule({
  providers: [
    {provide: Logger, useClass: AdvancedLogger}  // Use AdvancedLogger instead of Logger
  ]
})
export class AppModule {
}


@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <button (click)="log()">Log Message</button>`
})
export class AppComponent1 {
  constructor(private logger: Logger) {
  }

  log() {
    this.logger.log('Message from AppComponent');
    // Output: AdvancedLogger: [Current Date] Message from AppComponent
  }
}


// Example 2: Extending a Class with Custom Functionality

// Extended logger with custom functionality
export class CustomLogger extends Logger {
  logWithTimestamp(message: string) {
    console.log('CustomLogger:', new Date(), message);
  }
}

@NgModule({
  providers: [
    {provide: Logger, useClass: CustomLogger}  // Use AdvancedLogger instead of Logger
  ]
})
export class AppModule2 {
}

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <button (click)="log()">Log Message</button>`
})
export class AppComponent2 {
  constructor(private logger: Logger) {
  }

  log() {
    if (this.logger instanceof CustomLogger) {
      (this.logger as CustomLogger).logWithTimestamp('Custom message');  // Calls logWithTimestamp
    } else {
      this.logger.log('Fallback message');
    }
  }
}
