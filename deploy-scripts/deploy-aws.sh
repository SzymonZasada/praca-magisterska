#!/bin/bash
set -e

echo "Rozpoczynam wdrażanie na AWS..."

# Logowanie do AWS ECR (Elastic Container Registry)
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com

# Tagowanie obrazu dla ECR
docker tag ${APP_NAME}:${BUILD_VERSION} ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/${APP_NAME}:${BUILD_VERSION}

# Wysyłanie obrazu do ECR
docker push ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/${APP_NAME}:${BUILD_VERSION}

# Aktualizacja definicji zadania ECS
envsubst < task-definition-template.json > task-definition.json
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Aktualizacja usługi ECS
aws ecs update-service --cluster ${ECS_CLUSTER} --service ${ECS_SERVICE} --task-definition ${APP_NAME}:${BUILD_VERSION} --force-new-deployment

echo "Wdrażanie na AWS zakończone."