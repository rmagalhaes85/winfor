dump_keycloak_realm:
	docker compose exec keycloak /opt/keycloak/bin/kc.sh export \
		--users=realm_file \
		--realm=winfor \
		--dir=/opt/keycloak/exports
	docker compose cp \
		keycloak:/opt/keycloak/exports/winfor-realm.json \
		./realms/

