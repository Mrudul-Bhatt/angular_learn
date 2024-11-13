/*
<base href="/"> Explanation:

The <base href="/"> tag defines the base path for all relative URLs in the application.

Setting it to "/" assumes that your Angular app is served from the root of the domain (e.g., https://yourwebsite.com/).
This way, Angular will look for resources like routes and assets relative to the root path.

If the application were deployed in a subfolder (e.g., https://yourwebsite.com/app/), then <base href="/app/"> would be
used instead, and Angular would look for resources in that subdirectory.

Why It Matters

This <base href="/"> setting is crucial because:

It ensures that Angular’s router interprets relative URLs correctly.
It prevents issues with loading resources (CSS, JS files) when the app is deployed on the server.
It affects the way Angular constructs URLs for navigation and routing within the app.
 */


/*
There are three fundamental building blocks to creating a route.

Import the routes into app.config.ts and add it to the provideRouter function. The following is the default
ApplicationConfig using the CLI.

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
 */

/*
const routes: Routes = [
  {path: 'first-component', component: FirstComponent},
  {path: 'second-component', component: SecondComponent},
];
*/

/*
<h1>Angular Router App</h1>
<nav>
  <ul>
    <li><a routerLink="/first-component" routerLinkActive="active" ariaCurrentWhenActive="page">First Component</a></li>
    <li><a routerLink="/second-component" routerLinkActive="active" ariaCurrentWhenActive="page">Second Component</a></li>
  </ul>
</nav>
<!-- The routed views render in the <router-outlet>-->
<router-outlet></router-outlet>
 */

