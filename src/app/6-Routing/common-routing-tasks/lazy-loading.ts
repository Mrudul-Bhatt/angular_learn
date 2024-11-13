/*
In Angular, lazy loading is a powerful technique that allows you to load feature modules on demand, rather than loading
everything when the application starts. This approach can significantly improve the performance of your application by
reducing the initial bundle size and speeding up the load time.

1. Understanding Lazy Loading
Eager Loading: By default, Angular loads all modules when the application starts, which increases the initial load time.
Lazy Loading: With lazy loading, you load specific modules only when they’re needed, such as when the user navigates to
a particular route.

Step 2: Set Up a Lazy-Loaded Route in the App Routing Module
In the app's main routing module, set up a route with loadChildren for lazy loading:

Step 3: Configure Routes in the Feature Module
Next, define the routes for your lazy-loaded feature module. You’ll usually set up a FeatureRoutingModule inside the
feature module.

3. Loading the Module on Demand
With the setup above, FeatureModule is only loaded when the user navigates to /feature. This reduces the initial bundle
size since Angular no longer includes FeatureModule in the main bundle. Instead, it creates a separate bundle for
FeatureModule that’s loaded only when required.
 */

// app-routing.module.ts
import {Component, NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const pathToFeatureModule = './feature/feature.module';

const routes: Routes = [
  {
    path: 'feature',  // Route to access the lazy-loaded module
    loadChildren: () => import(pathToFeatureModule).then(m => m.FeatureModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  standalone: true
})
export class FeatureComponent {
}

// feature-routing.module.ts
const routes1: Routes = [
  {path: '', component: FeatureComponent}  // Default route for this module
];

@NgModule({
  imports: [RouterModule.forChild(routes1)],
  exports: [RouterModule]
})
export class FeatureRoutingModule {
}

/*
6. Preloading Lazy-Loaded Modules
If you want to preload certain lazy-loaded modules (for example, after the initial load to speed up navigation),
Angular offers a preloading strategy.

You can enable preloading by specifying PreloadAllModules in AppRoutingModule.
 */

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule1 {
}
