#!/bin/bash
set -e

echo "Weryfikacja wdrożenia..."

# Pobierz URL aplikacji w zależności od platformy
if [ "$CLOUD_PLATFORM" == "aws" ]; then
  APP_URL=$(aws elbv2 describe-load-balancers --names ${APP_NAME}-lb --query 'LoadBalancers[0].DNSName' --output text)
  APP_URL="http://${APP_URL}"
elif [ "$CLOUD_PLATFORM" == "azure" ]; then
  APP_URL="http://${APP_NAME}-${BUILD_VERSION}.azurecontainer.io"
elif [ "$CLOUD_PLATFORM" == "gcp" ]; then
  APP_URL=$(gcloud run services describe ${APP_NAME} --platform managed --region us-central1 --format='value(status.url)')
else
  echo "Nieznana platforma, nie można zweryfikować wdrożenia"
  exit 1
fi

echo "Sprawdzanie dostępności pod adresem: ${APP_URL}"

# Sprawdź czy aplikacja odpowiada
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $APP_URL)

if [ $HTTP_STATUS -eq 200 ]; then
  echo "Aplikacja działa poprawnie (HTTP status: $HTTP_STATUS)"
  exit 0
else
  echo "Aplikacja nie odpowiada poprawnie (HTTP status: $HTTP_STATUS)"
  exit 1
fi