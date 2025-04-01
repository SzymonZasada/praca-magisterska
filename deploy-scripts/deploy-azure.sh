#!/bin/bash
set -e

echo "Rozpoczynam wdrażanie na Azure..."

# Logowanie do Azure
az login --service-principal --username ${AZURE_SP_ID} --password ${AZURE_SP_PASSWORD} --tenant ${AZURE_TENANT_ID}

# Tworzenie grupy zasobów (jeśli nie istnieje)
az group create --name ${RESOURCE_GROUP} --location westeurope

# Wdrażanie kontenera
az container create \
  --resource-group ${RESOURCE_GROUP} \
  --name ${APP_NAME}-${BUILD_VERSION} \
  --image ${APP_NAME}:${BUILD_VERSION} \
  --dns-name-label ${APP_NAME}-${BUILD_VERSION} \
  --ports 80 \
  --cpu 1 \
  --memory 1.5

echo "Wdrażanie na Azure zakończone."