/*
In Angular, TypeScript interfaces help enforce structure and typing during development, but they don’t carry over to
runtime due to how TypeScript works. When TypeScript transpiles to JavaScript, interfaces are removed since JavaScript
doesn’t natively support them. This causes two key limitations when using interfaces with Angular's Dependency Injection
(DI) system:

Interfaces Can't Serve as Provider Tokens: DI in Angular requires tokens that it can recognize and use at runtime to
identify and provide dependencies. Since TypeScript interfaces don’t exist at runtime, they can't be used as provider
tokens.

// This does NOT work because `AppConfig` is an interface
[{ provide: AppConfig, useValue: MY_APP_CONFIG_VARIABLE }]

Interfaces Can’t Be Injected: Because interfaces don’t exist at runtime, Angular cannot resolve them as dependencies
in a class constructor. Attempting to inject an interface directly will lead to errors.

export class AppComponent {
  // This will NOT work since `AppConfig` is an interface
  constructor(private config: AppConfig) {}
}


 */


/*
Workarounds
To make DI work with an interface-like structure, you can use one of the following approaches:

Injection Token: Use an InjectionToken to represent the interface at runtime. The InjectionToken can serve as a stand-in
for the interface and allows you to inject the dependency wherever needed.
 */


// Define the interface
export interface AppConfig {
  apiUrl: string;
  featureEnabled: boolean;
}

// Create an InjectionToken for the interface
import {Component, Inject, InjectionToken, NgModule} from '@angular/core';

export const APP_CONFIG = new InjectionToken<AppConfig>('AppConfig');

// Provide the token in a module or component
@NgModule({
  providers: [
    {provide: APP_CONFIG, useValue: {apiUrl: 'https://api.example.com', featureEnabled: true}}
  ]
})
export class AppModule {
}


@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h1>Welcome to the App</h1>`
})
export class AppComponent {
  constructor(@Inject(APP_CONFIG) private config: AppConfig) {
    console.log(this.config.apiUrl); // Outputs: 'https://api.example.com'
  }
}


/*
Abstract Class: If you want to enforce certain methods in addition to properties, consider using an abstract class
instead of an interface. Angular can recognize abstract classes as provider tokens because they have runtime
representations.
 */

export abstract class AppConfig2 {
  abstract apiUrl: string;
  abstract featureEnabled: boolean;
}

export class MyAppConfig implements AppConfig2 {
  apiUrl = 'https://api.example.com';
  featureEnabled = true;
}

@NgModule({
  providers: [{provide: AppConfig2, useClass: MyAppConfig}]
})
export class AppModule2 {
}
