import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="row">
      <div class="col-md-3">
        <div class="card text-white bg-primary mb-3">
          <div class="card-header">Users</div>
          <div class="card-body">
            <h4 class="card-title">{{userCount}}</h4>
            <p class="card-text">Total Users</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-white bg-success mb-3">
          <div class="card-header">Tasks</div>
          <div class="card-body">
            <h4 class="card-title">{{taskCount}}</h4>
            <p class="card-text">Total Tasks</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-white bg-info mb-3">
          <div class="card-header">Notifications</div>
          <div class="card-body">
            <h4 class="card-title">{{notificationCount}}</h4>
            <p class="card-text">Total Notifications</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-white bg-warning mb-3">
          <div class="card-header">Status</div>
          <div class="card-body">
            <h4 class="card-title">Active</h4>
            <p class="card-text">All Services</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row mt-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5>Recent Tasks</h5>
          </div>
          <div class="card-body">
            <form class="row g-3 mb-4" (ngSubmit)="createTask()">
              <div class="col-md-4">
                <label class="form-label">Title</label>
                <input class="form-control" [(ngModel)]="newTask.title" name="title" required />
              </div>
              <div class="col-md-4">
                <label class="form-label">Description</label>
                <input class="form-control" [(ngModel)]="newTask.description" name="description" />
              </div>
              <div class="col-md-2">
                <label class="form-label">Priority</label>
                <select class="form-select" [(ngModel)]="newTask.priority" name="priority">
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="URGENT">URGENT</option>
                </select>
              </div>
              <div class="col-md-2">
                <label class="form-label">User ID</label>
                <input type="number" class="form-control" [(ngModel)]="newTask.userId" name="userId" required />
              </div>
              <div class="col-md-3">
                <label class="form-label">Due Date</label>
                <input type="datetime-local" class="form-control" [(ngModel)]="newTask.dueDate" name="dueDate" />
              </div>
              <div class="col-md-2 align-self-end">
                <button class="btn btn-primary w-100" type="submit" [disabled]="!newTask.title || !newTask.userId">Add Task</button>
              </div>
              <div class="col-md-7 align-self-end text-success" *ngIf="createSuccess">Task created successfully.</div>
              <div class="col-md-7 align-self-end text-danger" *ngIf="createError">Failed to create task.</div>
            </form>
            <div *ngIf="tasks.length === 0" class="text-muted">No tasks found</div>
            <div *ngFor="let task of tasks" class="mb-2 border-bottom pb-2">
              <div class="d-flex justify-content-between">
                <strong>{{task.title}}</strong>
                <span class="badge" [class]="'bg-' + getPriorityColor(task.priority)">{{task.priority}}</span>
              </div>
              <small class="text-muted">{{task.description}}</small>
              <div class="mt-1">
                <small class="badge" [class]="'bg-' + getStatusColor(task.status)">{{task.status}}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  userCount = 5;
  taskCount = 12;
  notificationCount = 8;
  tasks: any[] = [];
  newTask: any = { title: '', description: '', userId: 1, priority: 'MEDIUM', dueDate: '' };
  createSuccess = false;
  createError = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.taskCount = tasks.length;
        this.userCount = new Set(tasks.map(t => t.userId)).size;
      },
      error: () => {
        // fallback demo data if API down
        this.tasks = [
          { title: 'Sample Task 1', description: 'This is a sample task', priority: 'HIGH', status: 'IN_PROGRESS' },
          { title: 'Sample Task 2', description: 'Another sample task', priority: 'MEDIUM', status: 'PENDING' }
        ];
      }
    });
  }

  createTask() {
    const payload: any = {
      title: this.newTask.title,
      description: this.newTask.description,
      userId: Number(this.newTask.userId),
      priority: this.newTask.priority,
    };
    if (this.newTask.dueDate) {
      // Backend expects LocalDateTime (no timezone). Format as 'YYYY-MM-DDTHH:mm:ss'.
      const d = new Date(this.newTask.dueDate);
      const pad = (n: number) => String(n).padStart(2, '0');
      payload.dueDate = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
        `T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }

    this.taskService.createTask(payload).subscribe({
      next: () => {
        this.createSuccess = true;
        this.createError = false;
        this.newTask = { title: '', description: '', userId: 1, priority: 'MEDIUM', dueDate: '' };
        this.loadTasks();
        setTimeout(() => (this.createSuccess = false), 2000);
      },
      error: () => {
        this.createError = true;
        setTimeout(() => (this.createError = false), 2500);
      }
    });
  }

  getPriorityColor(priority: string): string {
    switch(priority) {
      case 'HIGH': return 'danger';
      case 'MEDIUM': return 'warning';
      case 'LOW': return 'success';
      case 'URGENT': return 'danger';
      default: return 'secondary';
    }
  }

  getStatusColor(status: string): string {
    switch(status) {
      case 'COMPLETED': return 'success';
      case 'IN_PROGRESS': return 'primary';
      case 'PENDING': return 'warning';
      case 'CANCELLED': return 'danger';
      default: return 'secondary';
    }
  }
}
