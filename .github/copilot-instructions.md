<!-- Microservice Task Notification System Project Instructions -->

This project contains a microservice-based task notification system with:
- Task Service (Spring Boot + MySQL)
- Notification Service (Spring Boot + MySQL) 
- User Service (Spring Boot + MySQL)
- Angular Frontend
- Docker containerization

## Project Structure
- Each service is in its own directory with independent Spring Boot applications
- Frontend is an Angular application
- Docker Compose orchestrates all services
- MySQL databases: userdb, taskdb, notificationdb

## Development Guidelines
- Follow microservice patterns
- Use REST APIs for inter-service communication
- Implement proper error handling and logging
- Use Docker for deployment and development
