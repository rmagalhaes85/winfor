all: run

run:
	UID=$(id -u) GID=$(id -g) docker compose up --abort-on-container-exit --build

down:
	UID=$(id -u) GID=$(id -g) docker compose down --volumes
