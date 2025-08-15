# Task Notification System - Microservices

A comprehensive task notification system built with microservices architecture using Spring Boot, Angular, MySQL, and Docker.

## Architecture

The system consists of:

- **User Service** (Port 8081) - Manages user registration, authentication, and profiles
- **Task Service** (Port 8082) - Handles task creation, assignment, and status management
- **Notification Service** (Port 8083) - Manages notifications and alerts
- **Frontend** (Port 4200) - Angular web application for user interface
- **MySQL Database** - Three separate databases (userdb, taskdb, notificationdb)

## Prerequisites

- Java 17+
- Maven 3.6+
- Node.js 18+
- npm 8+
- Docker & Docker Compose
- MySQL 8.0

## Database Setup

The system uses three MySQL databases:
- `userdb` - User management
- `taskdb` - Task management  
- `notificationdb` - Notification management

Database credentials:
- Username: `root`
- Password: `naman`

## Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd # Task Notification System - Microservices Project

A comprehensive task management and notification system built with microservices architecture.

## 🏗️ Architecture Overview

```
Frontend (Angular) ←→ User Service ←→ Task Service ←→ Notification Service
     ↓                    ↓              ↓               ↓
   Port 4200          Port 8081      Port 8082       Port 8083
                           ↓              ↓               ↓
                      MySQL userdb   MySQL taskdb   MySQL notificationdb
```

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8.0+
- Docker & Docker Compose

### 1. Database Setup
```sql
CREATE DATABASE userdb;
CREATE DATABASE taskdb;
CREATE DATABASE notificationdb;
```

### 2. Start Services
```bash
# Clone the project
git clone <repository-url>
cd CIA3_MS

# Start all services with Docker
docker-compose up -d

# Check status
docker-compose ps
```

### 3. Access the Application
- **Dashboard**: http://localhost:4200
- **User API**: http://localhost:8081/api/users
- **Task API**: http://localhost:8082/api/tasks
- **Notification API**: http://localhost:8083/api/notifications

## 📁 Project Structure

```
CIA3_MS/
├── user-service/          # Spring Boot User Management Service
├── task-service/          # Spring Boot Task Management Service
├── notification-service/  # Spring Boot Notification Service
├── frontend/             # Angular Dashboard
├── docker-compose.yml    # Docker orchestration
└── PROJECT_DOCUMENTATION.md  # Complete documentation
```

## 🛠️ Technology Stack

- **Backend**: Java 17, Spring Boot 3.1.0, Spring Data JPA
- **Frontend**: Angular 17, TypeScript, Bootstrap 5
- **Database**: MySQL 8.0 (3 separate databases)
- **Containerization**: Docker, Docker Compose
- **Build Tools**: Maven, Angular CLI

## 📊 Features

- ✅ User Management with authentication
- ✅ Task creation and lifecycle management
- ✅ Real-time notification system
- ✅ Interactive dashboard with statistics
- ✅ RESTful APIs with JSON communication
- ✅ Microservices architecture
- ✅ Docker containerization
- ✅ Responsive web interface

## 🔧 Development

### Run Individual Services
```bash
# User Service
cd user-service && mvn spring-boot:run

# Task Service
cd task-service && mvn spring-boot:run

# Notification Service
cd notification-service && mvn spring-boot:run

# Frontend
cd frontend && ng serve
```

### API Testing
```bash
# Get all users
curl http://localhost:8081/api/users

# Create a task
curl -X POST http://localhost:8082/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","description":"Test Description","priority":"HIGH"}'
```

## 📚 Documentation

For complete technical documentation, setup instructions, API reference, and architecture details, see [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)

## 🎯 Project Goals

This project demonstrates:
- Microservices architecture implementation
- Inter-service communication
- Container orchestration
- Modern web development practices
- Database design and integration
- RESTful API development

---

**Developed by:** [Your Name]  
**Date:** August 15, 2025  
**Course:** [Course Name]  
**Institution:** [Institution Name]
   ```

2. **Build all services**
   ```bash
   # On Windows
   build.bat
   
   # On Linux/Mac
   chmod +x build.sh
   ./build.sh
   ```

3. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:4200
   - User Service API: http://localhost:8081/api/users
   - Task Service API: http://localhost:8082/api/tasks
   - Notification Service API: http://localhost:8083/api/notifications

## Manual Development Setup

### Backend Services

Each service can be run independently:

```bash
# User Service
cd user-service
mvn spring-boot:run

# Task Service
cd task-service
mvn spring-boot:run

# Notification Service
cd notification-service
mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## API Endpoints

### User Service (8081)
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Task Service (8082)
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/user/{userId}` - Get user tasks
- `PUT /api/tasks/{id}` - Update task
- `PUT /api/tasks/{id}/status/{status}` - Update task status

### Notification Service (8083)
- `GET /api/notifications/user/{userId}` - Get user notifications
- `POST /api/notifications` - Create notification
- `PUT /api/notifications/{id}/read` - Mark as read

## Features

- **User Management**: Registration, authentication, profile management
- **Task Management**: Create, assign, track, and manage tasks
- **Notifications**: Real-time notifications for task updates
- **Dashboard**: Overview of tasks, statistics, and recent activities
- **Responsive UI**: Bootstrap-based Angular frontend

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.1.0
- **Language**: Java 17
- **Database**: MySQL 8.0
- **Build Tool**: Maven
- **ORM**: Spring Data JPA

### Frontend
- **Framework**: Angular 17
- **Styling**: Bootstrap 5
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Web Server**: Nginx (for frontend)

## Environment Variables

The services support environment-based configuration:

- `SPRING_DATASOURCE_URL` - Database URL
- `SPRING_DATASOURCE_USERNAME` - Database username
- `SPRING_DATASOURCE_PASSWORD` - Database password
- `USER_SERVICE_URL` - User service URL
- `NOTIFICATION_SERVICE_URL` - Notification service URL

## Development

### Adding New Features

1. **Backend**: Add new endpoints in respective service controllers
2. **Frontend**: Create new components and services
3. **Database**: Update entity models and repositories

### Testing

```bash
# Backend tests
mvn test

# Frontend tests
npm test
```

## Deployment

### Production Deployment

1. Update `docker-compose.yml` with production configurations
2. Set up external MySQL database
3. Configure environment variables
4. Deploy using Docker Compose or Kubernetes

### Scaling

The microservices can be scaled independently:

```bash
docker-compose up -d --scale task-service=3 --scale notification-service=2
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 8081, 8082, 8083, 4200, 3306 are available
2. **Database connection**: Verify MySQL is running and credentials are correct
3. **Service communication**: Check network connectivity between services

### Logs

```bash
# View service logs
docker-compose logs user-service
docker-compose logs task-service
docker-compose logs notification-service
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and add tests
4. Submit a pull request

## License

This project is licensed under the MIT License.
