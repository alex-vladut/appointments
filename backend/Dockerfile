FROM openjdk:latest

ENV DATABASE_HOST host.docker.internal

ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME

COPY gradle gradle
COPY gradlew .
COPY settings.gradle .
COPY build.gradle .
COPY src src

RUN ./gradlew clean build -x test

RUN cp build/libs/*.jar app.jar
RUN rm -rf src && rm -rf build && rm -rf gradle && rm gradlew && rm build.gradle && rm settings.gradle

ENTRYPOINT ["java", "-Dspring.datasource.url=jdbc:postgresql://${DATABASE_HOST}:5432/appointments", "-jar","/usr/app/app.jar"]