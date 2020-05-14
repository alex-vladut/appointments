FROM openjdk:latest

ENV DATABASE_URL=jdbc:postgresql://host.docker.internal:5432/appointments

RUN groupadd group && useradd -g group -s /bin/sh user
USER user:group
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-Dspring.datasource.url=${DATABASE_URL}", "-jar","/app.jar"]