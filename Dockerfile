# ---------- Build Stage ----------
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

# ---------- Runtime Stage ----------
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/projectwork-0.0.1-SNAPSHOT.jar app.jar

# Use Render's dynamic PORT
EXPOSE 8080
ENV PORT=8080

# Force Spring Boot to use Render's $PORT and no extra context path
ENTRYPOINT ["java", "-jar", "/app/app.jar", "--server.port=${PORT}", "--server.servlet.context-path=/"]
