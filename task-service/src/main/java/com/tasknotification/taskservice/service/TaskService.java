package com.tasknotification.taskservice.service;

import com.tasknotification.taskservice.model.Task;
import com.tasknotification.taskservice.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ExternalServiceClient externalServiceClient;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public List<Task> getTasksByUserId(Long userId) {
        return taskRepository.findByUserId(userId);
    }

    public List<Task> getTasksByAssignedTo(Long assignedTo) {
        return taskRepository.findByAssignedTo(assignedTo);
    }

    public List<Task> getTasksByStatus(Task.Status status) {
        return taskRepository.findByStatus(status);
    }

    public List<Task> getTasksByPriority(Task.Priority priority) {
        return taskRepository.findByPriority(priority);
    }

    public List<Task> getOverdueTasks() {
        return taskRepository.findByDueDateBefore(LocalDateTime.now());
    }

    public Task createTask(Task task) {
        // Validate user exists (async)
        externalServiceClient.validateUser(task.getUserId())
                .subscribe(isValid -> {
                    if (!isValid) {
                        throw new RuntimeException("User not found");
                    }
                });

        Task savedTask = taskRepository.save(task);

        // Send notification about new task
        String message = "New task created: " + savedTask.getTitle();
        externalServiceClient.sendNotification(savedTask.getUserId(), message, "TASK_CREATED")
                .subscribe();

        if (savedTask.getAssignedTo() != null && !savedTask.getAssignedTo().equals(savedTask.getUserId())) {
            String assignedMessage = "Task assigned to you: " + savedTask.getTitle();
            externalServiceClient.sendNotification(savedTask.getAssignedTo(), assignedMessage, "TASK_ASSIGNED")
                    .subscribe();
        }

        return savedTask;
    }

    public Task updateTask(Long id, Task taskDetails) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        Task.Status oldStatus = task.getStatus();
        
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setAssignedTo(taskDetails.getAssignedTo());
        task.setPriority(taskDetails.getPriority());
        task.setStatus(taskDetails.getStatus());
        task.setDueDate(taskDetails.getDueDate());

        Task updatedTask = taskRepository.save(task);

        // Send notification if status changed
        if (!oldStatus.equals(updatedTask.getStatus())) {
            String message = "Task status updated: " + updatedTask.getTitle() + " - " + updatedTask.getStatus();
            externalServiceClient.sendNotification(updatedTask.getUserId(), message, "TASK_UPDATED")
                    .subscribe();

            if (updatedTask.getAssignedTo() != null && !updatedTask.getAssignedTo().equals(updatedTask.getUserId())) {
                externalServiceClient.sendNotification(updatedTask.getAssignedTo(), message, "TASK_UPDATED")
                        .subscribe();
            }
        }

        return updatedTask;
    }

    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        
        taskRepository.delete(task);

        // Send notification about task deletion
        String message = "Task deleted: " + task.getTitle();
        externalServiceClient.sendNotification(task.getUserId(), message, "TASK_DELETED")
                .subscribe();
    }

    public Task assignTask(Long taskId, Long assignedTo) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setAssignedTo(assignedTo);
        Task updatedTask = taskRepository.save(task);

        // Send notification about task assignment
        String message = "Task assigned to you: " + updatedTask.getTitle();
        externalServiceClient.sendNotification(assignedTo, message, "TASK_ASSIGNED")
                .subscribe();

        return updatedTask;
    }

    public Task updateTaskStatus(Long taskId, Task.Status status) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(status);
        Task updatedTask = taskRepository.save(task);

        // Send notification about status change
        String message = "Task status updated: " + updatedTask.getTitle() + " - " + status;
        externalServiceClient.sendNotification(updatedTask.getUserId(), message, "TASK_UPDATED")
                .subscribe();

        if (updatedTask.getAssignedTo() != null && !updatedTask.getAssignedTo().equals(updatedTask.getUserId())) {
            externalServiceClient.sendNotification(updatedTask.getAssignedTo(), message, "TASK_UPDATED")
                    .subscribe();
        }

        return updatedTask;
    }
}
