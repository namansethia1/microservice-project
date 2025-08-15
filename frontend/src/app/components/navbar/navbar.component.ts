import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Task Notification System</a>
        
        <div class="navbar-nav ms-auto">
          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle position-relative" href="#" id="notificationDropdown" 
               role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fas fa-bell"></i>
              <span *ngIf="unreadCount > 0" class="notification-badge">{{unreadCount}}</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="notificationDropdown">
              <li><h6 class="dropdown-header">Notifications</h6></li>
              <li *ngFor="let notification of recentNotifications" 
                  class="notification-item" 
                  [class.notification-unread]="!notification.isRead">
                <div class="small">{{notification.message}}</div>
                <div class="text-muted small">{{notification.createdAt | date:'short'}}</div>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item text-center" href="#/notifications">View All</a></li>
            </ul>
          </div>
          
          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" 
               role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{currentUser?.firstName || 'User'}}
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li><a class="dropdown-item" href="#/profile">Profile</a></li>
              <li><a class="dropdown-item" href="#/settings">Settings</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#" (click)="logout()">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  `,
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  unreadCount = 0;
  recentNotifications: any[] = [];
  currentUser: any = { firstName: 'John', lastName: 'Doe' }; // Mock user

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    // Mock user ID - in real app, get from auth service
    const userId = 1;
    
    this.notificationService.getUnreadCount(userId).subscribe(
      count => this.unreadCount = count
    );

    this.notificationService.getNotificationsByUserId(userId).subscribe(
      notifications => this.recentNotifications = notifications.slice(0, 5)
    );
  }

  logout() {
    // Implement logout logic
    console.log('Logout clicked');
  }
}
