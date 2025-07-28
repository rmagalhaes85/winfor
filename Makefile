all: run

run:
	docker compose up --abort-on-container-exit --build

down:
	docker compose down --volumes
