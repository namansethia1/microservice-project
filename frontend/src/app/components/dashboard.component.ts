import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../services/task.service';

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
    
    <!-- Task Creation Form -->
    <div class="row mt-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Task Management</h5>
            <button class="btn btn-outline-primary btn-sm" (click)="toggleCreateForm()">
              <i class="bi bi-plus-circle"></i> {{showCreateForm ? 'Hide' : 'Add Task'}}
            </button>
          </div>
          <div class="card-body" *ngIf="showCreateForm">
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
              <div class="col-md-4">
                <label class="form-label">Assigned To (User ID)</label>
                <input type="number" class="form-control" [(ngModel)]="newTask.assignedTo" name="assignedTo" />
              </div>
              <div class="col-md-3">
                <label class="form-label">Status</label>
                <select class="form-select" [(ngModel)]="newTask.status" name="status">
                  <option value="PENDING">PENDING</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label">Due Date</label>
                <input type="datetime-local" class="form-control" [(ngModel)]="newTask.dueDate" name="dueDate" />
              </div>
              <div class="col-md-2 align-self-end">
                <button class="btn btn-success w-100" type="submit" [disabled]="!newTask.title || !newTask.userId">
                  <i class="bi bi-plus"></i> Create Task
                </button>
              </div>
              <div class="col-md-12" *ngIf="createSuccess">
                <div class="alert alert-success alert-dismissible fade show">
                  <i class="bi bi-check-circle"></i> Task created successfully!
                  <button type="button" class="btn-close" (click)="createSuccess = false"></button>
                </div>
              </div>
              <div class="col-md-12" *ngIf="createError">
                <div class="alert alert-danger alert-dismissible fade show">
                  <i class="bi bi-x-circle"></i> Failed to create task. Please try again.
                  <button type="button" class="btn-close" (click)="createError = false"></button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Tasks List -->
    <div class="row mt-4">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">All Tasks</h5>
            <button class="btn btn-outline-secondary btn-sm" (click)="refreshTasks()">
              <i class="bi bi-arrow-clockwise"></i> Refresh
            </button>
          </div>
          <div class="card-body">
            <div *ngIf="tasks.length === 0" class="text-center text-muted py-4">
              <i class="bi bi-inbox" style="font-size: 3rem;"></i>
              <p class="mt-2">No tasks found. Create your first task above!</p>
            </div>
            
            <div class="table-responsive" *ngIf="tasks.length > 0">
              <table class="table table-hover">
                <thead class="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>User</th>
                    <th>Assigned To</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let task of tasks; let i = index">
                    <!-- Edit Mode -->
                    <td *ngIf="editingTask?.id === task.id">{{task.id}}</td>
                    <td *ngIf="editingTask?.id === task.id">
                      <input class="form-control form-control-sm" [(ngModel)]="editingTask!.title" />
                    </td>
                    <td *ngIf="editingTask?.id === task.id">
                      <input class="form-control form-control-sm" [(ngModel)]="editingTask!.description" />
                    </td>
                    <td *ngIf="editingTask?.id === task.id">
                      <select class="form-select form-select-sm" [(ngModel)]="editingTask!.status">
                        <option value="PENDING">PENDING</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td *ngIf="editingTask?.id === task.id">
                      <select class="form-select form-select-sm" [(ngModel)]="editingTask!.priority">
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                        <option value="URGENT">URGENT</option>
                      </select>
                    </td>
                    <td *ngIf="editingTask?.id === task.id">
                      <input type="number" class="form-control form-control-sm" [(ngModel)]="editingTask!.userId" />
                    </td>
                    <td *ngIf="editingTask?.id === task.id">
                      <input type="number" class="form-control form-control-sm" [(ngModel)]="editingTask!.assignedTo" />
                    </td>
                    <td *ngIf="editingTask?.id === task.id">
                      <input type="datetime-local" class="form-control form-control-sm" [(ngModel)]="editingTask!.dueDate" />
                    </td>
                    <td *ngIf="editingTask?.id === task.id">
                      <div class="btn-group btn-group-sm">
                        <button class="btn btn-success" (click)="saveTask()" title="Save">
                          <i class="bi bi-check"></i>
                        </button>
                        <button class="btn btn-secondary" (click)="cancelEdit()" title="Cancel">
                          <i class="bi bi-x"></i>
                        </button>
                      </div>
                    </td>

                    <!-- View Mode -->
                    <td *ngIf="editingTask?.id !== task.id">{{task.id}}</td>
                    <td *ngIf="editingTask?.id !== task.id">
                      <strong>{{task.title}}</strong>
                    </td>
                    <td *ngIf="editingTask?.id !== task.id">
                      <small class="text-muted">{{task.description || 'No description'}}</small>
                    </td>
                    <td *ngIf="editingTask?.id !== task.id">
                      <span class="badge" [class]="'bg-' + getStatusColor(task.status)">{{task.status}}</span>
                    </td>
                    <td *ngIf="editingTask?.id !== task.id">
                      <span class="badge" [class]="'bg-' + getPriorityColor(task.priority)">{{task.priority}}</span>
                    </td>
                    <td *ngIf="editingTask?.id !== task.id">{{task.userId}}</td>
                    <td *ngIf="editingTask?.id !== task.id">{{task.assignedTo || 'Unassigned'}}</td>
                    <td *ngIf="editingTask?.id !== task.id">
                      <small>{{formatDate(task.dueDate)}}</small>
                    </td>
                    <td *ngIf="editingTask?.id !== task.id">
                      <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-primary" (click)="editTask(task)" title="Edit">
                          <i class="bi bi-pencil"></i>
                        </button>
                        <div class="btn-group btn-group-sm">
                          <button class="btn btn-outline-info dropdown-toggle" data-bs-toggle="dropdown" title="Quick Status">
                            <i class="bi bi-gear"></i>
                          </button>
                          <ul class="dropdown-menu">
                            <li><a class="dropdown-item" (click)="quickStatusUpdate(task.id!, 'PENDING')">Set PENDING</a></li>
                            <li><a class="dropdown-item" (click)="quickStatusUpdate(task.id!, 'IN_PROGRESS')">Set IN_PROGRESS</a></li>
                            <li><a class="dropdown-item" (click)="quickStatusUpdate(task.id!, 'COMPLETED')">Set COMPLETED</a></li>
                            <li><a class="dropdown-item" (click)="quickStatusUpdate(task.id!, 'CANCELLED')">Set CANCELLED</a></li>
                          </ul>
                        </div>
                        <button class="btn btn-outline-danger" (click)="confirmDelete(task)" title="Delete">
                          <i class="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Action Feedback -->
            <div *ngIf="updateSuccess" class="alert alert-success alert-dismissible fade show mt-3">
              <i class="bi bi-check-circle"></i> {{updateMessage}}
              <button type="button" class="btn-close" (click)="updateSuccess = false"></button>
            </div>
            <div *ngIf="updateError" class="alert alert-danger alert-dismissible fade show mt-3">
              <i class="bi bi-x-circle"></i> {{updateMessage}}
              <button type="button" class="btn-close" (click)="updateError = false"></button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" *ngIf="taskToDelete">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Delete</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" (click)="taskToDelete = null"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete the task:</p>
            <strong>"{{taskToDelete.title}}"</strong>
            <p class="text-muted mt-2">This action cannot be undone.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="taskToDelete = null">Cancel</button>
            <button type="button" class="btn btn-danger" (click)="deleteTask()">
              <i class="bi bi-trash"></i> Delete Task
            </button>
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
  tasks: Task[] = [];
  newTask: Partial<Task> = { 
    title: '', 
    description: '', 
    userId: 1, 
    priority: 'MEDIUM', 
    status: 'PENDING',
    dueDate: '' 
  };
  
  // UI State
  showCreateForm = false;
  editingTask: Task | null = null;
  taskToDelete: Task | null = null;
  
  // Feedback Messages
  createSuccess = false;
  createError = false;
  updateSuccess = false;
  updateError = false;
  updateMessage = '';

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
          { id: 1, title: 'Sample Task 1', description: 'This is a sample task', priority: 'HIGH', status: 'IN_PROGRESS', userId: 1 },
          { id: 2, title: 'Sample Task 2', description: 'Another sample task', priority: 'MEDIUM', status: 'PENDING', userId: 1 }
        ];
      }
    });
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
    if (!this.showCreateForm) {
      this.resetCreateForm();
    }
  }

  resetCreateForm() {
    this.newTask = { 
      title: '', 
      description: '', 
      userId: 1, 
      priority: 'MEDIUM', 
      status: 'PENDING',
      dueDate: '' 
    };
    this.createSuccess = false;
    this.createError = false;
  }

  refreshTasks() {
    this.loadTasks();
  }

  createTask() {
    const payload: any = {
      title: this.newTask.title,
      description: this.newTask.description,
      userId: Number(this.newTask.userId),
      assignedTo: this.newTask.assignedTo ? Number(this.newTask.assignedTo) : undefined,
      priority: this.newTask.priority,
      status: this.newTask.status
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
        this.resetCreateForm();
        this.loadTasks();
        setTimeout(() => (this.createSuccess = false), 3000);
      },
      error: () => {
        this.createError = true;
        this.createSuccess = false;
        setTimeout(() => (this.createError = false), 3000);
      }
    });
  }

  editTask(task: Task) {
    this.editingTask = { ...task };
    // Format date for datetime-local input
    if (this.editingTask.dueDate) {
      const date = new Date(this.editingTask.dueDate);
      if (!isNaN(date.getTime())) {
        this.editingTask.dueDate = date.toISOString().slice(0, 16);
      }
    }
  }

  saveTask() {
    if (!this.editingTask || !this.editingTask.id) return;

    const payload = { ...this.editingTask };
    
    // Format date for backend
    if (payload.dueDate) {
      const d = new Date(payload.dueDate);
      const pad = (n: number) => String(n).padStart(2, '0');
      payload.dueDate = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
        `T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }

    this.taskService.updateTask(this.editingTask.id, payload).subscribe({
      next: () => {
        this.updateSuccess = true;
        this.updateError = false;
        this.updateMessage = 'Task updated successfully!';
        this.editingTask = null;
        this.loadTasks();
        setTimeout(() => (this.updateSuccess = false), 3000);
      },
      error: () => {
        this.updateError = true;
        this.updateSuccess = false;
        this.updateMessage = 'Failed to update task. Please try again.';
        setTimeout(() => (this.updateError = false), 3000);
      }
    });
  }

  cancelEdit() {
    this.editingTask = null;
  }

  quickStatusUpdate(taskId: number, status: string) {
    this.taskService.updateTaskStatus(taskId, status).subscribe({
      next: () => {
        this.updateSuccess = true;
        this.updateError = false;
        this.updateMessage = `Task status updated to ${status}!`;
        this.loadTasks();
        setTimeout(() => (this.updateSuccess = false), 3000);
      },
      error: () => {
        this.updateError = true;
        this.updateSuccess = false;
        this.updateMessage = 'Failed to update task status.';
        setTimeout(() => (this.updateError = false), 3000);
      }
    });
  }

  confirmDelete(task: Task) {
    this.taskToDelete = task;
    // Use Bootstrap's modal programmatically
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      modalElement.style.display = 'block';
      modalElement.classList.add('show');
      document.body.classList.add('modal-open');
    }
  }

  deleteTask() {
    if (!this.taskToDelete?.id) return;

    this.taskService.deleteTask(this.taskToDelete.id).subscribe({
      next: () => {
        this.updateSuccess = true;
        this.updateError = false;
        this.updateMessage = `Task "${this.taskToDelete!.title}" deleted successfully!`;
        this.taskToDelete = null;
        this.hideDeleteModal();
        this.loadTasks();
        setTimeout(() => (this.updateSuccess = false), 3000);
      },
      error: () => {
        this.updateError = true;
        this.updateSuccess = false;
        this.updateMessage = 'Failed to delete task. Please try again.';
        this.hideDeleteModal();
        setTimeout(() => (this.updateError = false), 3000);
      }
    });
  }

  hideDeleteModal() {
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      modalElement.style.display = 'none';
      modalElement.classList.remove('show');
      document.body.classList.remove('modal-open');
    }
    this.taskToDelete = null;
  }

  formatDate(dateString?: string): string {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString();
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
