// app.component.ts
import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-ngSwitch',
  standalone: true,
  imports: [
    // NgSwitch,
    // NgSwitchCase,
    // NgSwitchDefault
    CommonModule
    // We can import individually all directives or just import CommonModule which contains all these
  ],
  template: `
    <div [ngSwitch]="viewMode">
      <p *ngSwitchCase="'map'">Map view is selected</p>
      <p *ngSwitchCase="'list'">List view is selected</p>
      <p *ngSwitchDefault>Default view</p>
    </div>

    <button (click)="viewMode = 'map'">Show Map</button>
    <button (click)="viewMode = 'list'">Show List</button>
    <button (click)="viewMode = 'other'">Show Default</button>
  `
})
export class NgSwitchComponent {
  viewMode = 'map';
}


/*
For the App Module (AppModule)

In the main app module (app.module.ts), you don’t need to import CommonModule because BrowserModule (which is required for all browser-based Angular apps) includes it:



import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule], // No need to import CommonModule
  bootstrap: [AppComponent]
})
export class AppModule {}




For Feature Modules

In any feature module (for example, UserModule, ProductsModule, etc.), you must import CommonModule to use these core directives like *ngIf, *ngFor, and *ngSwitch.



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { UserComponent } from './user.component';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule] // Required to use *ngIf, *ngFor, etc.
})
export class UserModule {}





 */
