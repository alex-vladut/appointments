# Appointments Spring Boot application

## Running the application

> *All the commands listed here should be run from `/appointments/backend` directory.*

### Run with Gradle

Before starting the application make sure the dependencies are up and running (e.g. database):
```bash
$ docker-compose up
```

To start the application using Gradle run:
```bash
$ ./gradlew bootRun
```

You can find the Swagger UI at http://localhost:8080/swagger-ui.html.

### Run with Docker

Build Docker image of the application:
```bash
$ docker build . -t alex-vladut/appointments
```

start the database container with docker-compose:
```bash
$ docker-compose up
```

then run the application in a Docker container:
```bash
$ docker run -it --name appointments -p 8080:8080 -t alex-vladut/appointments
```

**Note:** The current configuration assumes you are using Docker for MacOS or Windows which exposes a property `host.docker.internal` to easily route traffic from Docker context to your host machine. If you are encountering issues you could explicitly pass your IP address as an environment variable when starting the Docker container:
```bash
$ docker run -it --name appointments -e DATABASE_HOST='<YOUR_IP_ADDRESS>' -p 8080:8080 -t alex-vladut/appointments
```

### Run with Docker-compose

Make sure first you have created the Docker image `alex-vladut/appointments` as that will be used by docker-compose. Follow the steps in the previous section to generate the image and run this command to check it is available:
```bash
$ docker image ls
```

which should return something like this:
```bash
  REPOSITORY                 TAG                 IMAGE ID            CREATED             SIZE
  alex-vladut/appointments   latest              76157c854ddb        5 minutes ago       543MB

```

Then run the following command to start th application alongside all its dependencies:
```bash
$ docker-compose -f docker-compose-all.yml up
```

## Testing

Unit tests can be executed with the following command:
```bash
$ ./gradlew test
```

Integration tests are implemented by following Behaviour Driven Development guidelines with [Cucumber](https://cucumber.io/):
```bash
$ ./gradlew cucumber
```