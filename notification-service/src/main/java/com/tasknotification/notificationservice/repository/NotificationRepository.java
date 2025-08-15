package com.tasknotification.notificationservice.repository;

import com.tasknotification.notificationservice.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserId(Long userId);
    List<Notification> findByUserIdAndIsRead(Long userId, Boolean isRead);
    List<Notification> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<Notification> findByType(String type);
    List<Notification> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
    long countByUserIdAndIsRead(Long userId, Boolean isRead);
}
