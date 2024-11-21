/**
forChild:

Used in feature modules to import shared functionality but without re-initializing singletons or global providers.
Avoids duplicating or overwriting services provided in the root.

Understanding the Use of forChild
The forChild method is typically used in feature modules. Unlike forRoot, it does not provide services or configuration globally. Instead, it allows shared functionality like routes or components.

Example: Routing Module
Angular's RouterModule is a well-known example of the forRoot and forChild pattern.

Router Module Implementation
forRoot initializes the router service and sets up the root-level configuration.
forChild adds child routes without re-initializing the root router service.

 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

export class HomeComponent {}
export class AboutComponent {}
export class FeatureComponent {}

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

@NgModule({
  imports: [
    RouterModule.forChild([{ path: 'feature', component: FeatureComponent }]),
  ],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
