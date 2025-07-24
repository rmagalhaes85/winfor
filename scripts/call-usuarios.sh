#!/bin/bash

set -e
set -x

access_token=$(./retrieve-token.sh | jq -r ".access_token")
[ $? -ne 0 ] && { exit "Erro na leitura do token"; exit 1; }
curl -v http://localhost:8080/api/usuario/ -H "Authorization: Bearer ${access_token}"
