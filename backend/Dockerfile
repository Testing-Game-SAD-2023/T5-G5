# Usa un'immagine di base Java 11
FROM openjdk:11-jdk-slim

# Copia il file jar dell'applicazione Spring Boot nella directory /app
ADD target/*.jar app.jar

# Imposta il comando di avvio dell'applicazione Spring Boot
ENTRYPOINT ["java","-jar","app.jar"]