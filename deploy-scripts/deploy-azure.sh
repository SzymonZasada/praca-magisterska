#!/bin/bash
set -e

echo "Rozpoczynam wdrażanie na Azure..."

# Zakładamy, że obraz Docker już istnieje lokalnie (zbudowany przez Jenkinsa)
echo "Używam lokalnego obrazu ${APP_NAME}:${BUILD_VERSION} do wdrożenia"

# Zatrzymanie i usunięcie istniejącego kontenera (jeśli istnieje)
docker stop ${APP_NAME} 2>/dev/null || true
docker rm ${APP_NAME} 2>/dev/null || true

# Uruchomienie nowego kontenera
docker run -d --name ${APP_NAME} \
  -p 80:80 \
  --restart unless-stopped \
  ${APP_NAME}:${BUILD_VERSION}

echo "Kontener ${APP_NAME} uruchomiony na porcie 80"

# Zapisanie informacji o wdrożeniu
mkdir -p ./metrics
echo "{\"deploymentTime\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\", \"version\": \"${BUILD_VERSION}\", \"environment\": \"azure\"}" > ./metrics/deployment-info.json

echo "Wdrażanie na Azure zakończone."