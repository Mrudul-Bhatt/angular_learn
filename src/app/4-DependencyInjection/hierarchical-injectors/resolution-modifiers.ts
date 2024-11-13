/*
Angular’s resolution modifiers (@Optional(), @Self(), @SkipSelf(), and @Host()) give developers precise control over
how dependencies are resolved. These decorators modify the search path in Angular's DI hierarchy when injecting
dependencies, allowing you to specify where to look or skip for a dependency.
 */

/*
1. @Optional()
Purpose: Makes the dependency optional, so if Angular can’t find a provider, it will inject null instead of throwing an error.
Use Case: Useful when a service may or may not be available, and you don’t want the absence to break functionality.
 */

import {Component, Host, Injectable, Optional, Self, SkipSelf} from '@angular/core';

@Injectable()
export class OptionalService {
  getMessage() {
    return "Optional Service is available!";
  }
}

@Component({
  selector: 'app-example',
  standalone: true,
  template: `<p>{{ message }}</p>`
})
export class ExampleComponent {
  message: string;

  constructor(@Optional() private optionalService: OptionalService) {
    this.message = optionalService ? optionalService.getMessage() : 'Optional Service is not available';
  }
}


/*
2. @Self()
Purpose: Instructs Angular to look only in the component's own ElementInjector and nowhere else in the hierarchy.
Use Case: Useful when you want to ensure a dependency is provided locally (on the current component or directive),
avoiding any inherited providers from parent elements.

Explanation: @Self() tells Angular to search only in the SelfExampleComponent’s injector for LocalService. If
LocalService is not provided locally, an error will be thrown.
 */

@Injectable()
export class LocalService {
  getMessage() {
    return "Optional Service is available!";
  }
}

@Component({
  selector: 'app-self-example',
  template: ``,
  standalone: true,
  providers: [LocalService]
})
export class SelfExampleComponent {
  constructor(@Self() private localService: LocalService) {
    // This service must be provided locally; otherwise, an error will occur
  }
}


/*
3. @SkipSelf()
Purpose: Instructs Angular to skip the current component’s ElementInjector and search in the parent injectors up the
hierarchy.
Use Case: Useful when you want a dependency that is provided by an ancestor, not the component itself. Often used in
scenarios where a parent module or component provides a shared service.

Explanation: In SkipSelfChildComponent, the @SkipSelf() modifier skips its own SharedService instance and instead
injects the SharedService provided in SkipSelfParentComponent.
 */

@Injectable()
export class SharedService {
  getMessage() {
    return "Optional Service is available!";
  }
}

@Component({
  selector: 'app-skipself-parent',
  template: ``,
  standalone: true,
  providers: [SharedService]
})
export class SkipSelfParentComponent {
}

@Component({
  selector: 'app-skipself-child',
  template: `<p>Child Component</p>`,
  standalone: true,
  providers: [SharedService]
})
export class SkipSelfChildComponent {
  constructor(@SkipSelf() private sharedService: SharedService) {
    // This will skip the local SharedService and use the one from SkipSelfParentComponent
  }
}


/*
4. @Host()
Purpose: Instructs Angular to look for the provider in the host component’s ElementInjector, not further up the
hierarchy. Often used in combination with @SkipSelf() to achieve more complex hierarchical constraints.
Use Case: Useful when a directive or child component wants to depend on a service from its immediate host (like
the component it’s declared in), ensuring a particular relationship in the hierarchy.

Explanation: @Host() makes sure that HostService is injected only if it’s provided by the host component
(HostParentComponent). If HostParentComponent didn’t provide HostService, an error would be thrown.
 */

@Injectable()
export class HostService {
  getMessage() {
    return "Optional Service is available!";
  }
}


@Component({
  selector: 'app-host-parent',
  template: ``,
  standalone: true,
  providers: [HostService]
})
export class HostParentComponent {
}

@Component({
  selector: 'app-host-child',
  standalone: true,
  template: `<p>Child Component</p>`
})
export class HostChildComponent {
  constructor(@Host() private hostService: HostService) {
    // This ensures HostService is provided by the host (HostParentComponent),
    // not from any ancestor or module provider.
  }
}


