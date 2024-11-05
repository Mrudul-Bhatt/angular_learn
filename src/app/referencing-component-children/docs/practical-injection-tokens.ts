// logging-config.ts
// logging.service.ts
// admin.component.ts
import {Component, Inject, Injectable, InjectionToken} from '@angular/core';

export interface LoggingConfig {
  logLevel: 'error' | 'warn' | 'info';
}

export const LOGGING_CONFIG = new InjectionToken<LoggingConfig>('LOGGING_CONFIG');


@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  constructor(@Inject(LOGGING_CONFIG) private config: LoggingConfig) {
  }

  log(message: string) {
    if (this.config.logLevel === 'info') {
      console.info(`INFO: ${message}`);
    } else if (this.config.logLevel === 'warn') {
      console.warn(`WARN: ${message}`);
    } else if (this.config.logLevel === 'error') {
      console.error(`ERROR: ${message}`);
    }
  }
}


@Component({
  selector: 'app-admin',
  template: `<p>Admin Component</p>`,
  standalone: true,
  providers: [
    {provide: LOGGING_CONFIG, useValue: {logLevel: 'info'} as LoggingConfig}
  ]
})
export class AdminComponent {
  constructor(private loggingService: LoggingService) {
    this.loggingService.log('Admin component initialized');
  }
}


@Component({
  selector: 'app-user',
  template: `<p>User Component</p>`,
  standalone: true,
  providers: [
    {provide: LOGGING_CONFIG, useValue: {logLevel: 'error'} as LoggingConfig}
  ]
})
export class UserComponent {
  constructor(private loggingService: LoggingService) {
    this.loggingService.log('User component initialized');
  }
}


@Component({
  selector: 'app-parent',
  template: `
    <app-admin></app-admin>
    <app-user></app-user>
  `,
  standalone: true,
  imports: [
    AdminComponent,
    UserComponent
  ]
})
export class ParentComponent {
  constructor() {
  }
}
