import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="sidebar bg-dark" style="width: 250px;">
      <div class="p-3">
        <h5 class="text-white">Menu</h5>
      </div>
      <nav class="nav flex-column">
        <a class="nav-link" routerLink="/dashboard" routerLinkActive="active">
          <i class="fas fa-tachometer-alt me-2"></i>
          Dashboard
        </a>
        <a class="nav-link" routerLink="/tasks" routerLinkActive="active">
          <i class="fas fa-tasks me-2"></i>
          Tasks
        </a>
        <a class="nav-link" routerLink="/my-tasks" routerLinkActive="active">
          <i class="fas fa-user-check me-2"></i>
          My Tasks
        </a>
        <a class="nav-link" routerLink="/notifications" routerLinkActive="active">
          <i class="fas fa-bell me-2"></i>
          Notifications
        </a>
        <a class="nav-link" routerLink="/users" routerLinkActive="active">
          <i class="fas fa-users me-2"></i>
          Users
        </a>
        <a class="nav-link" routerLink="/reports" routerLinkActive="active">
          <i class="fas fa-chart-bar me-2"></i>
          Reports
        </a>
      </nav>
    </div>
  `,
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {}
