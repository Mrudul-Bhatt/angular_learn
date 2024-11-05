/*

Dependency Injection (DI) in Angular is a core concept that enables components, directives, pipes, and
services (injectables) to define the dependencies they require.

DI has two main roles: dependency consumers and
providers.

Angular uses an Injector to manage dependencies, checking if instances exist and creating them if necessary.
The root injector, created at application startup, usually manages dependencies across the application, linking
providers and consumers seamlessly.

 */


/*
1. Using @Injectable with providedIn

The providedIn property of the @Injectable decorator allows services to specify where they should be provided in the
app, reducing the need to register services manually in NgModules.

providedIn: 'root': The service is registered with the root injector, making it a singleton throughout the app.

providedIn: 'platform': Registers the service at the platform level (for multiple Angular apps running on the same page).

providedIn: 'any': A new instance is created for each lazy-loaded module or component that injects it, improving modularity.

 */

import {ApplicationConfig, Component, Injectable, NgModule} from "@angular/core";
import {inject} from "@angular/core/";

@Injectable({
  providedIn: 'root' // or 'any', 'platform'
})
export class ExampleService {
}


/*
2. Registering in providers Array of NgModules

You can define providers in the providers array of an Angular module (e.g., AppModule). This method registers
the service with that module's injector, usually making it a singleton within the application.
 */

@NgModule({
  providers: [ExampleService]
})
export class AppModule {
}


/*
3. Providing in Component or Directive providers Array

Providing a service directly in the providers array of a component or directive creates a new instance of that service
specific to each instance of the component or directive.
 */

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  standalone: true,
  providers: [ExampleService]
})
export class SampleComponent {
}

/*
4. At application root level using ApplicationConfig

You can use the providers field of the ApplicationConfig (passed to the bootstrapApplication function) to provide a
service or other Injectable at the application level.
 */


export const appConfig: ApplicationConfig = {
  providers: [
    {provide: ExampleService},
  ]
};

// Then in main.ts
// bootstrapApplication(AppComponent, appConfig)

/*
5. Providing with useClass, useValue, useExisting, and useFactory

These options in the providers array give advanced ways of providing dependencies by controlling what is provided and
how instances are created:

useClass: Allows one token to provide a different class implementation.

{ provide: LoggerService, useClass: ConsoleLoggerService }

useValue: Provides a literal value instead of an instance. This is helpful for configuration values.

{ provide: APP_CONFIG, useValue: { apiUrl: 'https://api.example.com' } }

useExisting: Reuses an existing instance of another service.

{ provide: OldService, useExisting: NewService }

useFactory: Provides a service using a factory function, often with dependencies.

{
  provide: ApiService,
  useFactory: (http: HttpClient) => new ApiService(http),
  deps: [HttpClient]
}

 */


/*
6. Multi-Providers

Multi-providers allow multiple services to be registered under a single token, which can be useful for things like
plugin systems or multiple handlers.

{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
{ provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true }

 */


/*
Injecting/consuming a dependency

 Can be consumed using constructor
 Can be consumed using inject() function
 */


@Component({
  selector: 'app-di-consumption',
  templateUrl: './sample.component.html',
  standalone: true,
})
export class DIConsumptionComponent {
  private service1 = inject(ExampleService,);

  constructor(private service2: ExampleService) {
  }
}
