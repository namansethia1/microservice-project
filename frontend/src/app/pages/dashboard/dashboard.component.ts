import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../../services/task.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid">
      <h2 class="mb-4">Dashboard</h2>
      
      <!-- Statistics Cards -->
      <div class="row mb-4">
        <div class="col-md-3">
          <div class="card text-white bg-primary">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div>
                  <h4>{{totalTasks}}</h4>
                  <p class="card-text">Total Tasks</p>
                </div>
                <div class="align-self-center">
                  <i class="fas fa-tasks fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-3">
          <div class="card text-white bg-warning">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div>
                  <h4>{{pendingTasks}}</h4>
                  <p class="card-text">Pending Tasks</p>
                </div>
                <div class="align-self-center">
                  <i class="fas fa-clock fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-3">
          <div class="card text-white bg-success">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div>
                  <h4>{{completedTasks}}</h4>
                  <p class="card-text">Completed Tasks</p>
                </div>
                <div class="align-self-center">
                  <i class="fas fa-check-circle fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-3">
          <div class="card text-white bg-danger">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div>
                  <h4>{{overdueTasks}}</h4>
                  <p class="card-text">Overdue Tasks</p>
                </div>
                <div class="align-self-center">
                  <i class="fas fa-exclamation-triangle fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Recent Tasks -->
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <h5>Recent Tasks</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let task of recentTasks">
                      <td>{{task.title}}</td>
                      <td>
                        <span class="badge" [class]="'badge-' + task.priority.toLowerCase()">
                          {{task.priority}}
                        </span>
                      </td>
                      <td>
                        <span class="badge" [class]="'status-' + task.status.toLowerCase()">
                          {{task.status}}
                        </span>
                      </td>
                      <td>{{task.dueDate | date:'short'}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Recent Notifications -->
        <div class="col-md-4">
          <div class="card">
            <div class="card-header">
              <h5>Recent Notifications</h5>
            </div>
            <div class="card-body">
              <div *ngFor="let notification of recentNotifications" 
                   class="notification-item" 
                   [class.notification-unread]="!notification.isRead">
                <div class="small">{{notification.message}}</div>
                <div class="text-muted small">{{notification.createdAt | date:'short'}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalTasks = 0;
  pendingTasks = 0;
  completedTasks = 0;
  overdueTasks = 0;
  recentTasks: Task[] = [];
  recentNotifications: any[] = [];

  constructor(
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Load tasks
    this.taskService.getAllTasks().subscribe(tasks => {
      this.totalTasks = tasks.length;
      this.pendingTasks = tasks.filter(t => t.status === 'PENDING').length;
      this.completedTasks = tasks.filter(t => t.status === 'COMPLETED').length;
      this.recentTasks = tasks.slice(0, 5);
    });

    // Load overdue tasks
    this.taskService.getOverdueTasks().subscribe(tasks => {
      this.overdueTasks = tasks.length;
    });

    // Load notifications (mock user ID)
    const userId = 1;
    this.notificationService.getNotificationsByUserId(userId).subscribe(notifications => {
      this.recentNotifications = notifications.slice(0, 5);
    });
  }
}
