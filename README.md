# Appointments

This is a simple application built with Spring Boot and Angular which allows visualising and booking appointments.

## Prerequisites

Before starting the application make sure you have the following tools installed:
- [Java version v11+](https://www.oracle.com/java/technologies/javase-jdk14-downloads.html)
- [Docker v17+](https://docs.docker.com/desktop/#download-and-install)
- [Docker-Compose](https://docs.docker.com/compose/install/)
- [Node version v12+](https://nodejs.org/en/download/)

To confirm you have the required tools installed on your machine, please run the following commands in a terminal:

for `Java`:
```bash
$ java --version
```

for `Docker`:
```bash
$ docker --version
```

for `docker-compose`:
```bash
$ docker-compose --version 
```

for `Node`:
```bash
$ node --version
```

## Start the application

Clone the Git repository:
```bash
$ git clone https://github.com/alex-vladut/appointments.git
$ cd appointments
```

Start the application with the following command:
```bash
$ make up
```

**Note:** It may take 2-3 minutes for the client application to start on the first installation. Wait until a message similar to the following will be displayed:
```
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
: Compiled successfully.
```

Once the command finishes executing, the application should be available at http://localhost:4200/.

To check other options available with `make` run:
```bash
$ make
```

For more details on each application check the following links:
- [Backend](/backend/README.md)
- [Frontend](/frontend/README.md)
