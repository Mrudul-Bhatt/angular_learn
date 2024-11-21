/**
In Angular, forRoot and forChild are patterns used with NgModules to configure services and dependencies within a module, ensuring proper scoping and avoiding duplication of services across different modules.

forRoot:

Used in the root module (usually AppModule) to set up and configure singleton services or application-wide providers.

Typically provides a way to initialize services or pass configuration to the root module.

Ensures that certain services are singletons throughout the application.

Understanding the Use of forRoot

The forRoot method is a static method that sets up a module with providers that should only be instantiated once, at the root of the application.

 */
import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  ModuleWithProviders,
  Component,
  InjectionToken,
  Injectable,
  Inject,
} from '@angular/core';

@Injectable()
export class LoggerService {
  constructor(@Inject(LOGGER_CONFIG) private config: LoggerConfig) {}

  log(message: string): void {
    if (this.config.enableDebug) {
      console.log(message);
    }
  }
}

export interface LoggerConfig {
  enableDebug: boolean;
}
export const LOGGER_CONFIG = new InjectionToken<LoggerConfig>('LoggerConfig');

@NgModule({})
export class LoggerModule {
  static forRoot(config: LoggerConfig): ModuleWithProviders<LoggerModule> {
    return {
      ngModule: LoggerModule,
      providers: [
        { provide: LOGGER_CONFIG, useValue: config },
        {
          provide: LoggerService,
          useFactory: (loggerConfig: LoggerConfig) =>
            new LoggerService(loggerConfig),
          deps: [LOGGER_CONFIG],
        },
      ],
    };
  }
}

@Component({
  selector: 'app-parent',
  template: ``,
})
export class AppComponent {}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LoggerModule.forRoot({ enableDebug: true })],
  bootstrap: [AppComponent],
})
export class AppModule {}
