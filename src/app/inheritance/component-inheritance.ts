// base.component.ts
// dashboard.component.ts
import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";

export class BaseComponent implements OnInit {
  title: string = '';
  loading: boolean = false;

  ngOnInit() {
    console.log('Base component initialized');
  }

  setTitle(newTitle: string) {
    this.title = newTitle;
  }

  toggleLoading() {
    this.loading = !this.loading;
  }
}


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIf
  ],
  template: `
    <h1>{{ title }}</h1>
    <p *ngIf="loading">Loading...</p>
    <button (click)="toggleLoading()">Toggle Loading</button>
  `
})
export class DashboardComponent extends BaseComponent implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.setTitle('Dashboard');
  }
}
