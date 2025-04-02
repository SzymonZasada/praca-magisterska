#!/bin/bash
set -e

echo "Rozpoczynam wdrażanie na lokalnym serwerze..."

# Zatrzymaj istniejący kontener (jeśli istnieje)
docker stop ${APP_NAME} || true
docker rm ${APP_NAME} || true

# Uruchom nowy kontener
docker run -d --name ${APP_NAME} -p 80:80 ${APP_NAME}:${BUILD_VERSION}
