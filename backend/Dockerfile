FROM openjdk:latest

ENV DATABASE_HOST host.docker.internal

RUN groupadd group && useradd -g group -s /bin/sh user
USER user:group
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-Dspring.datasource.url=jdbc:postgresql://${DATABASE_HOST}:5432/appointments", "-jar","/app.jar"]