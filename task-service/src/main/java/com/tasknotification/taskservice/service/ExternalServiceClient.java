package com.tasknotification.taskservice.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class ExternalServiceClient {

    private final WebClient webClient;

    @Value("${user.service.url}")
    private String userServiceUrl;

    @Value("${notification.service.url}")
    private String notificationServiceUrl;

    public ExternalServiceClient() {
        this.webClient = WebClient.builder().build();
    }

    public Mono<Boolean> validateUser(Long userId) {
        return webClient.get()
                .uri(userServiceUrl + "/api/users/" + userId)
                .retrieve()
                .toBodilessEntity()
                .map(response -> response.getStatusCode().is2xxSuccessful())
                .onErrorReturn(false);
    }

    public Mono<Void> sendNotification(Long userId, String message, String type) {
        NotificationRequest request = new NotificationRequest(userId, message, type);
        return webClient.post()
                .uri(notificationServiceUrl + "/api/notifications")
                .bodyValue(request)
                .retrieve()
                .toBodilessEntity()
                .then();
    }

    public static class NotificationRequest {
        private Long userId;
        private String message;
        private String type;

        public NotificationRequest(Long userId, String message, String type) {
            this.userId = userId;
            this.message = message;
            this.type = type;
        }

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }

        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
    }
}
