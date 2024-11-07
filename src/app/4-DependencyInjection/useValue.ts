/*
In Angular, the useValue provider configuration allows you to inject a specific value as a dependency, rather than a
service or class instance. This is particularly useful for injecting configuration data or constant values into
components and services.

{ provide: TOKEN_NAME, useValue: VALUE }

TOKEN_NAME is the injection token.

VALUE is the specific value you want to provide.

 */


import {Component, Inject, Injectable, InjectionToken, NgModule} from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL');

@NgModule({
  providers: [
    {provide: API_URL, useValue: 'https://api.example.com'}
  ]
})
export class AppModule {
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(@Inject(API_URL) private apiUrl: string) {
  }

  fetchData() {
    console.log(`Fetching data from ${this.apiUrl}`);
    // You can use this.apiUrl to make HTTP requests, for example.
  }
}


@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <button (click)="loadData()">Load Data</button>`
})
export class AppComponent {
  constructor(private dataService: DataService) {
  }

  loadData() {
    this.dataService.fetchData();
  }
}
