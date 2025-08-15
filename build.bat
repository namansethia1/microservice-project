@echo off

echo Building all microservices...

echo Building User Service...
cd user-service
call mvn clean package -DskipTests
cd ..

echo Building Task Service...
cd task-service
call mvn clean package -DskipTests
cd ..

echo Building Notification Service...
cd notification-service
call mvn clean package -DskipTests
cd ..

echo Building Frontend...
cd frontend
call npm install
call npm run build
cd ..

echo All services built successfully!
