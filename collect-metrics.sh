#!/bin/bash
set -e

echo "Zbieranie metryk..."

# Utwórz katalog na metryki jeśli nie istnieje
mkdir -p metrics

# Pobierz czas trwania całego procesu
PIPELINE_DURATION=$(($(date +%s) - ${PIPELINE_START_TIME:-$(date +%s)}))

# Pobierz URL aplikacji w zależności od platformy
if [ "$CLOUD_PLATFORM" == "aws" ]; then
  APP_URL=$(aws elbv2 describe-load-balancers --names ${APP_NAME}-lb --query 'LoadBalancers[0].DNSName' --output text)
  APP_URL="http://${APP_URL}"
elif [ "$CLOUD_PLATFORM" == "azure" ]; then
  APP_URL="http://${APP_NAME}-${BUILD_VERSION}.azurecontainer.io"
elif [ "$CLOUD_PLATFORM" == "gcp" ]; then
  APP_URL=$(gcloud run services describe ${APP_NAME} --platform managed --region us-central1 --format='value(status.url)')
else
  APP_URL="unknown"
fi

# Zmierz czas odpowiedzi (jeśli URL jest znany)
if [ "$APP_URL" != "unknown" ]; then
  RESPONSE_TIME=$(curl -s -w "%{time_total}\n" -o /dev/null $APP_URL)
else
  RESPONSE_TIME="0"
fi

# Utwórz plik JSON z metrykami
cat > metrics/deployment-${BUILD_NUMBER}.json << EOF
{
  "build_number": "${BUILD_NUMBER}",
  "cloud_platform": "${CLOUD_PLATFORM}",
  "timestamp": "$(date +%s)",
  "pipeline_duration": "${PIPELINE_DURATION}",
  "app_metrics": {
    "response_time": "${RESPONSE_TIME}",
    "status": "success"
  },
  "url": "${APP_URL}"
}
EOF

echo "Metryki zapisane do pliku metrics/deployment-${BUILD_NUMBER}.json"