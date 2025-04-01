#!/bin/bash
set -e

echo "Rozpoczynam wdrażanie na GCP..."

# Logowanie do Google Cloud
gcloud auth activate-service-account --key-file=${GCP_KEY_FILE}

# Konfiguracja projektu
gcloud config set project ${GCP_PROJECT_ID}

# Tagowanie obrazu dla Google Container Registry
docker tag ${APP_NAME}:${BUILD_VERSION} gcr.io/${GCP_PROJECT_ID}/${APP_NAME}:${BUILD_VERSION}

# Wysyłanie obrazu do GCR
docker push gcr.io/${GCP_PROJECT_ID}/${APP_NAME}:${BUILD_VERSION}

# Wdrażanie do Cloud Run
gcloud run deploy ${APP_NAME} \
  --image gcr.io/${GCP_PROJECT_ID}/${APP_NAME}:${BUILD_VERSION} \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

echo "Wdrażanie na GCP zakończone."