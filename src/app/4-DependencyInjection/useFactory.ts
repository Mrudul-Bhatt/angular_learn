/*
Why Use useFactory
useFactory is beneficial in situations where:

The dependency requires dynamic configuration at runtime.
You need to create a service instance based on specific logic or conditions.
Dependencies rely on asynchronous values or need additional services to be injected.
 */


interface User {
  isAuthorized: boolean;
}

export class UserService {
  user: User = {isAuthorized: false}; // Default, but might be updated on login

  // Example method to simulate user login and authorization update
  loginUser(isAuthorized: boolean) {
    this.user.isAuthorized = isAuthorized;
  }
}

export class Logger {
  log(message: string) {
    console.log(`Logger: ${message}`);
  }
}

const heroServiceFactory = (logger: Logger, userService: UserService) =>
  new HeroService(logger, userService.user.isAuthorized);


export class HeroService {
  constructor(
    private logger: Logger,
    private isAuthorized: boolean
  ) {
  }

  getHeroes() {
    const authStatus = this.isAuthorized ? 'authorized' : 'unauthorized';
    this.logger.log(`Getting heroes for ${authStatus} user.`);
  }
}


@NgModule({
  providers: [
    {provide: HeroService, useFactory: heroServiceFactory, deps: [Logger, UserService]},
    Logger,
    UserService
  ]
})
export class AppModule {
}

/*
Example 1 : Simple Example
In this example, useFactory is used to return a message string based on some condition.
 */

import {APP_INITIALIZER, Component, Inject, InjectionToken, NgModule} from '@angular/core';

export function messageFactory(): string {
  return Math.random() > 0.5 ? 'Hello World!' : 'Goodbye World!';
}

// [{provide: 'Message', useFactory: messageFactory}]

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<p>{{ message }}</p>`
})
export class AppComponent {
  constructor(@Inject('Message') public message: string) {
  }
}


/*
Example 2: Providing a Service Configured with Dependencies
In real-world applications, you may have services that require specific configurations. For example, a LoggerService
that needs configuration details like log level.
 */


export class LoggerService {
  constructor(private level: string) {
  }

  log(message: string) {
    console.log(`[${this.level}] ${message}`);
  }
}

export interface LoggerConfig {
  level: string;
}

export function loggerFactory(config: LoggerConfig): LoggerService {
  return new LoggerService(config.level);
}

const config: LoggerConfig = {level: 'DEBUG'};

export const LOGGER_CONFIG = new InjectionToken<LoggerConfig>('LOGGER_CONFIG');

@NgModule({
  providers: [
    // {provide: LoggerConfig, useValue: config},
    {provide: LOGGER_CONFIG, useValue: config},
    {provide: LoggerService, useFactory: loggerFactory, deps: [LOGGER_CONFIG]}
  ]
})
export class AppModule3 {
}

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <button (click)="logMessage()">Log</button>`
})
export class AppComponent3 {
  constructor(private loggerService: LoggerService) {
  }

  logMessage() {
    this.loggerService.log('This is a log message.');
  }
}


/*
Example 3: Asynchronous Initialization with useFactory
Suppose you have a service that relies on data retrieved from an API on initialization. You can achieve this using an
asynchronous useFactory.
 */

export class ConfigService {
  public configData: any;

  constructor() {
  }

  loadConfig() {
    return fetch('/api/config')
      .then(response => response.json())
      .then(data => {
        this.configData = data;
        return this;
      });
  }
}

export function configServiceFactory(configService: ConfigService): Promise<ConfigService> {
  return configService.loadConfig();
}

@NgModule({
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigService],
      multi: true
    }
  ]
})
export class AppModule4 {
}


/*
Advanced useFactory Options

Multiple Dependencies: useFactory allows specifying multiple dependencies in deps, making it versatile for complex
services.

Asynchronous Initialization: By using APP_INITIALIZER with useFactory, you can ensure asynchronous tasks complete before
the application initializes.

Conditional Services: Services can vary depending on environment configurations, user roles, or application states by
using useFactory logic.
 */
