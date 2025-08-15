import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, DashboardComponent],
  template: `
    <div class="container-fluid">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <span class="navbar-brand">Task Notification System</span>
          <div class="navbar-nav ms-auto">
            <span class="navbar-text">Microservices Dashboard</span>
          </div>
        </div>
      </nav>
      
      <div class="container-fluid mt-4">
        <div class="row">
          <div class="col-12">
            <h2 class="mb-4">System Overview</h2>
            <app-dashboard></app-dashboard>
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task Notification System';
}
