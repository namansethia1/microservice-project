#!/bin/bash

echo "Building all microservices..."

# Build User Service
echo "Building User Service..."
cd user-service
mvn clean package -DskipTests
cd ..

# Build Task Service
echo "Building Task Service..."
cd task-service
mvn clean package -DskipTests
cd ..

# Build Notification Service
echo "Building Notification Service..."
cd notification-service
mvn clean package -DskipTests
cd ..

# Build Frontend
echo "Building Frontend..."
cd frontend
npm install
npm run build
cd ..

echo "All services built successfully!"
