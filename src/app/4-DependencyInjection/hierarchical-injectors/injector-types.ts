/*
You're correct! In Angular, the injector hierarchy is further segmented into four primary types:

Platform Injector
Environment Injector
Module Injector
Element Injector
Each of these plays a distinct role in managing dependency injection (DI) within Angular.
 */


/*
1. Platform Injector

The Platform Injector is the highest-level injector in Angular’s hierarchy.
It is created when Angular’s platform is bootstrapped, which typically happens once per application
(e.g., using platformBrowserDynamic()).

It provides dependencies that are shared across multiple applications running on the same platform. For example, if
there are multiple Angular apps running on a single page, they can share some dependencies through the platform injector.
This injector typically includes low-level services and dependencies specific to the Angular platform, like PlatformRef,
which manages the application’s lifecycle at the platform level.

If you configure an app-wide provider in the ApplicationConfig of bootstrapApplication, it overrides one configured for
root in the @Injectable() metadata. You can do this to configure a non-default provider of a service that is shared with
 multiple applications.

Here is an example of the case where the component router configuration includes a non-default location strategy by
listing its provider in the providers list of the ApplicationConfig.

providers: [
  { provide: LocationStrategy, useClass: HashLocationStrategy }
]

For NgModule based applications, configure app-wide providers in the AppModule providers.

 */


import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {Component, EnvironmentInjector, inject, Injectable, NgModule, runInInjectionContext} from "@angular/core";


@NgModule({
  declarations: [],
  imports: []
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);


/*
2. Environment Injector
The Environment Injector was introduced to provide a mechanism to inject services into components, directives, and
pipes, especially for dynamic components and standalone components.

It’s commonly used with standalone components or when using the runInInjectionContext function.
This injector can exist separately from the module hierarchy, making it useful for specific scenarios such as lazy
loading or dynamically rendered components.

Using the @Injectable() providedIn property is preferable to using the ApplicationConfig providers array. With
@Injectable() providedIn, optimization tools can perform tree-shaking, which removes services that your application
isn't using. This results in smaller bundle sizes.

Tree-shaking is especially useful for a library because the application which uses the library may not have a need to
inject it.

The @Injectable() decorator identifies a service class. The providedIn property configures a specific
EnvironmentInjector, here root, which makes the service available in the root EnvironmentInjector.

EnvironmentInjector is configured by the ApplicationConfig.providers.

 */


export class SomeService {

}

@Injectable({
  providedIn: 'root',
})
export class DynamicService {
  constructor(private envInjector: EnvironmentInjector) {
  }

  someMethod() {
    runInInjectionContext(this.envInjector, () => {
      inject(SomeService); // Injection within environment context
    });
  }
}


/*
3. Module Injector
The Module Injector manages service instances at the Angular module level.
When you provide a service in an NgModule, it’s registered in the module injector. If the service has
providedIn: 'root', it goes to the root module injector, ensuring a singleton instance across the entire application.
Each module injector can manage its own scope, especially useful for services declared in lazy-loaded modules, where a
new instance is created in that specific module.

In the case of NgModule based applications, the ModuleInjector can be configured in one of two ways by using:
  The @Injectable() providedIn property to refer to root or platform
  The @NgModule() providers array

ModuleInjector is configured by the @NgModule.providers and NgModule.imports property. ModuleInjector is a flattening
of all the providers arrays that can be reached by following the NgModule.imports recursively.
 */


@Injectable({
  providedIn: 'root' // Singleton service available globally
})
export class GlobalService {
}


/*
4. Element Injector
The Element Injector is associated with each Angular component and directive.
This allows for a component-specific scope where services can be injected and accessed only within that component
and its child components.
This is achieved by specifying services in the providers array in the @Component decorator, enabling instances specific
to the component and its hierarchy.

Providing a service in the @Component() decorator using its providers or viewProviders property configures an
ElementInjector
 */


export class LocalService {
}

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  standalone: true,
  providers: [LocalService] // Localized to this component and its children
})
export class ChildComponent {
  constructor(private localService: LocalService) {
  }
}
