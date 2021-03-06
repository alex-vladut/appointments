.PHONY: help
.DEFAULT_GOAL := help

MIN_DOCKER_CLIENT_VERSION = 17.03
MIN_DOCKER_SERVER_VERSION = 17.03

backend_up: clean ## Starts the backend application in a Docker container
	@echo "> Starting backend app..."
	@docker-compose -f backend/docker-compose-all.yml up -d

backend_logs: ## Show the logs of the backend application running in a Docker container
	@docker logs --follow alex-vladut-appointments

clean: ## Cleans up all the Docker containers left running
	@echo "> Cleaning Docker containers..."
	@docker-compose -f backend/docker-compose-all.yml down || true

client_up: ## Starts the client application
	@echo "> Starting frontend application on http://localhost:4200"
	@npm install --prefix frontend
	@npm start --prefix frontend appointments

up: backend_up client_up ## Starts the backend and client application

check: ## Check system prerequisites to run the application.
	@if [[ "$$(docker version -f '{{.Server.Version}}')" < \
		"$(MIN_DOCKER_SERVER_VERSION)" ]]; \
		then echo 'Docker server version $(MIN_DOCKER_SERVER_VERSION) needed.'; \
		exit 2; fi
	@if [[ "$$(docker version -f '{{.Client.Version}}')" < \
		"$(MIN_DOCKER_CLIENT_VERSION)" ]]; \
		then echo 'Docker client version $(MIN_DOCKER_CLIENT_VERSION) needed.'; \
		exit 2; fi

help: ## Help command. Run it to get a description of all the targets available.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)