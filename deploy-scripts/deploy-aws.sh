#!/bin/bash
set -e

echo "Rozpoczynam wdrażanie na AWS..."

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

echo "Wdrażanie na AWS zakończone."