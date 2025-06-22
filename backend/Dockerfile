# backend/Dockerfile
FROM openjdk:17-jdk-slim
VOLUME /tmp
COPY target/*.jar app.jar
#ENTRYPOINT ["java", "-jar", "/app.jar"]
ENTRYPOINT ["sh", "-c", "sleep 20 && java -jar /app.jar"]
