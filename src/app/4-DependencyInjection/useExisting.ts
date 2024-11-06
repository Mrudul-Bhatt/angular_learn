/*
When to Use useExisting

Alias Services: When you want multiple aliases or tokens to reference the same service, useExisting is useful. This can
help in situations where legacy code uses one token, but newer parts of the application use another.

Reuse Services Across Different Tokens: In cases where a service is complex or resource-intensive, useExisting allows
for reusability without unnecessary instantiation, saving memory and processing resources.

Dependency Injection for Interchangeable Interfaces: When you want different tokens to act as interfaces or types that
can be interchanged, useExisting allows you to inject one service through multiple identifiers.
 */

/*
Basic Syntax of useExisting

providers: [
  { provide: AliasToken, useExisting: ExistingService }
]

When Angular resolves AliasToken, it will inject the same instance as ExistingService.

 */


/*

Example 1: Creating an Alias for a Service

Imagine you have a LoggerService that handles application logging. You want to create an alias, AppLogger, that points
to the same LoggerService instance. This is useful if parts of your application refer to LoggerService while others
refer to AppLogger.

 */

import {Component, Inject, InjectionToken, NgModule} from '@angular/core';

export class LoggerService {
  log(message: string) {
    console.log('LoggerService:', message);
  }
}

export const APP_LOGGER = new InjectionToken<LoggerService>('APP_LOGGER');

@NgModule({
  providers: [
    LoggerService,
    {provide: APP_LOGGER, useExisting: LoggerService}
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
export class AppComponent {
  constructor(
    private loggerService: LoggerService,
    @Inject(APP_LOGGER) private appLogger: LoggerService
  ) {
  }

  log() {
    this.loggerService.log('Message from LoggerService');
    this.appLogger.log('Message from APP_LOGGER');
    // Both log messages will use the same instance.
  }
}


/*

Example 2: Dependency Injection with Interchangeable Interfaces

In some scenarios, you may have different classes implementing the same interface. You can use useExisting to map
multiple tokens to a single implementation, allowing flexibility without creating extra instances.

 */

export interface ILogger {
  log(message: string): void;
}

export class ConsoleLogger implements ILogger {
  log(message: string) {
    console.log('ConsoleLogger:', message);
  }
}

export const ILoggerToken = new InjectionToken<ILogger>('ILogger');
export const AppLoggerToken = new InjectionToken<ILogger>('AppLogger');

@NgModule({
  providers: [
    ConsoleLogger,
    {provide: ILoggerToken, useExisting: ConsoleLogger},
    {provide: AppLoggerToken, useExisting: ILoggerToken}
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
  constructor(
    @Inject(ILoggerToken) private logger: ILogger,
    @Inject(AppLoggerToken) private appLogger: ILogger
  ) {
  }

  log() {
    this.logger.log('Message from ILoggerToken');
    this.appLogger.log('Message from AppLoggerToken');
    // Both use the same instance of ConsoleLogger.
  }
}


/*
Example 3: Reusing a Common Service for Shared State

Suppose you have a user service that should be accessible by two distinct tokens, UserService and AuthService. Using
useExisting allows both tokens to share the same user data without duplicating the service.

 */


export class UserService {
  user = {name: 'Alice', isAuthenticated: true};

  getUser() {
    return this.user;
  }
}

@NgModule({
  providers: [
    UserService,
    {provide: 'AuthService', useExisting: UserService}
  ]
})
export class AppModule3 {
}


@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <button (click)="getUser()">Get User</button>`
})
export class AppComponent3 {
  constructor(
    private userService: UserService,
    @Inject('AuthService') private authService: UserService
  ) {
  }

  getUser() {
    console.log(this.userService.getUser()); // { name: 'Alice', isAuthenticated: true }
    console.log(this.authService.getUser()); // Same instance, same result
  }
}
