/*
In Angular, dependency resolution involves two primary hierarchies: the ElementInjector and the EnvironmentInjector
(previously referred to as ModuleInjector). Angular’s DI mechanism resolves dependencies by searching within these
hierarchies sequentially to find an appropriate provider

Resolution Phases
When a component or directive requests a dependency (i.e., a service or any DI token), Angular searches in two main phases:

Phase 1: ElementInjector Hierarchy
Phase 2: EnvironmentInjector Hierarchy


 */


/*
Phase 1: Resolution in the ElementInjector Hierarchy

Local Search in Component’s ElementInjector: Each component has its own ElementInjector, which is created specifically
for that component (and possibly shared with other directives on the same element). Angular first tries to satisfy the
requested dependency with this ElementInjector.

Climbing Up the ElementInjector Hierarchy: If Angular doesn’t find the requested provider in the component's
ElementInjector, it checks the parent’s ElementInjector. This upward search continues up the component hierarchy
(i.e., from the requesting component’s parent to its parent’s parent and so on).

Result: If Angular finds a provider in any of the ancestor ElementInjector hierarchies, it will use that provider to
satisfy the request and stop the search. If not, it proceeds to Phase 2.
 */

import {Component, NgModule} from "@angular/core";

export class DataService {
}

export class ParentDataService {
}

export class GrandparentDataService {
}

@Component({
  selector: 'app-child',
  standalone: true,
  template: '<p>Child Component</p>'
})
export class ChildComponent {
  constructor(private dataService: DataService) {
  }
}

@Component({
  selector: 'app-parent',
  template: '<app-child></app-child>',
  standalone: true,
  imports: [
    ChildComponent
  ],
  providers: [{provide: DataService, useClass: ParentDataService}]
})
export class ParentComponent {
}

@Component({
  selector: 'app-grandparent',
  template: '<app-parent></app-parent>',
  standalone: true,
  imports: [
    ParentComponent
  ],
  providers: [{provide: DataService, useClass: GrandparentDataService}]
})
export class GrandparentComponent {
}


/*
Here, DataService is provided at different levels (GrandparentComponent and ParentComponent).
When ChildComponent requests DataService, Angular will first check its own ElementInjector (where it won’t find DataService).
It will then check the ElementInjector of ParentComponent (and find ParentDataService).
ParentDataService is used to satisfy the dependency, and the search ends.
 */


/*
Phase 2: Resolution in the EnvironmentInjector Hierarchy

If Angular doesn’t find the provider within the ElementInjector hierarchy (including all the component's ancestors),
it moves to the EnvironmentInjector hierarchy.

Returning to Original Component’s Element: Angular returns to the component where the request originated (in the
previous example, ChildComponent) and starts searching for the provider in the EnvironmentInjector hierarchy
(the ModuleInjector for NgModules).

Module Hierarchies: In NgModule-based applications, Angular checks the following in the EnvironmentInjector:

The injector for the NgModule that declares the component.
Then, it moves up to the root injector or application-wide injector.

Error If Not Found: If Angular still doesn’t find a provider in the EnvironmentInjector hierarchy, it throws an error
stating the provider could not be resolved.
 */

@NgModule({
  providers: [DataService]
})
export class AppModule {
}

@Component({
  selector: 'app-child2',
  standalone: true,
  template: '<p>Child Component</p>'
})
export class ChildComponent2 {
  constructor(private dataService: DataService) {
  }
}

@Component({
  selector: 'app-parent2',
  standalone: true,
  imports: [
    ChildComponent2
  ],
  template: '<app-child2></app-child2>'
})
export class ParentComponent2 {
}

@Component({
  selector: 'app-grandparent2',
  standalone: true,
  imports: [
    ParentComponent2
  ],
  template: '<app-parent2></app-parent2>'
})
export class GrandparentComponent2 {
}


/*
Here, DataService is provided only at the AppModule level, which uses the EnvironmentInjector.
If ChildComponent requests DataService, Angular will search through the ElementInjector hierarchy and find nothing.
It will then fall back to AppModule's EnvironmentInjector, find DataService, and provide it to ChildComponent.

Resolution Priority and Shadowing
Angular prioritizes the first provider it finds. If multiple providers are registered at different levels, the closest
one in the hierarchy is used, shadowing any providers further up. For example:

If DataService is provided both in AppModule and ParentComponent, and ChildComponent requests DataService, the version
from ParentComponent will be used.
 */
