# Use a lightweight Java 17 image
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy the project into container
COPY . .

# Build the app (skip tests for faster builds)
RUN ./mvnw clean package -DskipTests

# Expose the port (Render injects $PORT dynamically)
EXPOSE 8080

# Run the exact built JAR
CMD ["java", "-jar", "target/projectwork-0.0.1-SNAPSHOT.jar"]
