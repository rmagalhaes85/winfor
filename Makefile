all: run

run:
	docker compose up --abort-on-container-exit --build

down:
	docker compose down --volumes

dump_keycloak_realm:
	docker compose exec keycloak /opt/keycloak/bin/kc.sh export \
		--users=realm_file \
		--realm=winfor \
		--dir=/opt/keycloak/exports
	docker compose cp \
		keycloak:/opt/keycloak/exports/winfor-realm.json \
		./keycloak/realms/
