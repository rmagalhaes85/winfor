dump_from_container:
	docker compose exec postgres-app pg_dump -U winfor -f /tmp/winfor_db_dump.sql
	docker compose cp postgres-app:/tmp/winfor_db_dump.sql .

