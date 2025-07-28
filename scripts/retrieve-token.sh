#!/bin/bash

curl -v -X POST "http://localhost:8090/realms/winfor/protocol/openid-connect/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "client_id=winfor-app" \
     -d "client_secret=GhnBwLbKKgTWoOO8HvPFmwLRdACBf15W" \
     -d "grant_type=password" \
     -d "username=aluno1" \
     -d "password=password" | jq

