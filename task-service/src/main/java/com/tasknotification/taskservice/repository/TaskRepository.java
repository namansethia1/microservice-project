package com.tasknotification.taskservice.repository;

import com.tasknotification.taskservice.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserId(Long userId);
    List<Task> findByAssignedTo(Long assignedTo);
    List<Task> findByStatus(Task.Status status);
    List<Task> findByPriority(Task.Priority priority);
    List<Task> findByUserIdAndStatus(Long userId, Task.Status status);
    List<Task> findByAssignedToAndStatus(Long assignedTo, Task.Status status);
    List<Task> findByDueDateBefore(LocalDateTime dueDate);
    List<Task> findByDueDateBetween(LocalDateTime startDate, LocalDateTime endDate);
}
