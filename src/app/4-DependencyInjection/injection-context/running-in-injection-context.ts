/*
3. Running Code in an Injection Context with runInInjectionContext
If you need to use inject outside of standard injection contexts, Angular provides the runInInjectionContext function,
which allows you to run code within an injection context using a specified injector, such as an EnvironmentInjector.
This approach is useful for scenarios where Angular’s DI system isn’t directly managing the context, yet you need
access to DI.
 */


import {EnvironmentInjector, inject, Injectable, runInInjectionContext} from '@angular/core';


export class SomeService {
  doSomething() {

  }
}

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private environmentInjector = inject(EnvironmentInjector);

  someMethod() {
    runInInjectionContext(this.environmentInjector, () => {
      const someService = inject(SomeService);
      someService.doSomething();
    });
  }
}


/*
5. Limitations of inject Outside of an Injection Context
Using inject outside of an injection context throws error NG0203. This means inject cannot be called in regular utility
functions or static methods without a context, as Angular’s DI system isn’t managing dependencies in those cases.
 */
