#!/bin/sh

docker run -d --name keycloak-server -p 8082:8080 -v ./import/:/opt/keycloak/data/import/ -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:latest start-dev --import-realm
