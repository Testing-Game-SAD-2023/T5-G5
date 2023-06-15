FROM maven:3.8.3-jdk-11-slim AS build

WORKDIR /app
# Copia il file JSON delle credenziali nell'immagine Docker




COPY pom.xml .

RUN mvn dependency:go-offline

COPY src ./src

RUN mvn package -DskipTests

FROM openjdk:11-jdk-slim

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]