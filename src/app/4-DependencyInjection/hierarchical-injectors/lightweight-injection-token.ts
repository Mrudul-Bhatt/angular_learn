/*
The lightweight injection token design pattern in Angular helps reduce client application bundle sizes by ensuring that
only necessary parts of a library are included in the final output. This approach is particularly valuable for library
developers who want to keep the library modular and prevent unused components or services from increasing the size of
the client’s application.

Key Concepts of Lightweight Injection Tokens

Tree-Shakable Providers:

Tree-shaking is a bundling optimization that removes unused code from the final bundle.
When a service, component, or any other dependency is unused in an application, Angular’s tree-shaking mechanism can
remove it, provided it is registered in a way that is tree-shakable.

Why Unused Code Can Persist:

Angular stores injection tokens in a way that can sometimes prevent unused dependencies from being fully removed.
Without using lightweight injection tokens, unused services or components may still end up in the bundle, increasing the client application’s size unnecessarily.

The Role of Lightweight Injection Tokens:

By designing your library with lightweight injection tokens, you ensure that only the parts of the library actively used by the client application are included in the final bundle.
This is achieved by minimizing dependencies and structuring tokens so that they are independent and easily removable by the compiler if they aren’t referenced in the application code.
 */

// services/auth.service.ts
import {Injectable, InjectionToken, NgModule} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // ... authentication logic
}

// services/logger.service.ts
@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  // ... logging logic
}

// Injection Tokens for optional services
export const AUTH_SERVICE_TOKEN = new InjectionToken<AuthService>('AuthService');
export const LOGGER_SERVICE_TOKEN = new InjectionToken<LoggerService>('LoggerService');

// lightweight configuration in module
@NgModule({
  providers: [
    {provide: AUTH_SERVICE_TOKEN, useClass: AuthService},
    {provide: LOGGER_SERVICE_TOKEN, useClass: LoggerService}
  ]
})
export class UtilityModule {
}


/*
Each service has its own injection token (AUTH_SERVICE_TOKEN and LOGGER_SERVICE_TOKEN), allowing the client application
to inject only the services it needs.

If the client application imports UtilityModule but doesn’t reference AuthService or LoggerService, tree-shaking can
remove them from the final bundle, reducing the bundle size.
*/

/*

Benefits of Lightweight Injection Tokens

Reduced Bundle Size: Ensures that only essential services are bundled in the final application, optimizing load times.

Enhanced Modularity: Allows applications to selectively include services, making the library more flexible and efficient.

Better User Experience: Smaller bundles improve application performance, especially important in mobile and
low-bandwidth scenarios.

 */



