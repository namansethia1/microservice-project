#!/bin/bash

echo "Starting Task Notification System..."

echo "Starting MySQL Database..."
docker run -d --name mysql-db -e MYSQL_ROOT_PASSWORD=naman -e MYSQL_DATABASE=userdb -p 3306:3306 mysql:8.0

echo "Waiting for MySQL to start..."
sleep 30

echo "Creating additional databases..."
docker exec mysql-db mysql -uroot -pnaman -e "CREATE DATABASE IF NOT EXISTS taskdb; CREATE DATABASE IF NOT EXISTS notificationdb;"

echo "Starting User Service..."
cd user-service
mvn spring-boot:run &
cd ..

echo "Starting Task Service..."
cd task-service
mvn spring-boot:run &
cd ..

echo "Starting Notification Service..."
cd notification-service
mvn spring-boot:run &
cd ..

echo "Starting Frontend..."
cd frontend
npm start &
cd ..

echo "All services are starting..."
echo "Frontend will be available at: http://localhost:4200"
echo "User Service API: http://localhost:8081/api/users"
echo "Task Service API: http://localhost:8082/api/tasks"
echo "Notification Service API: http://localhost:8083/api/notifications"

wait
