pipeline {
    agent any
    
    environment {
        APP_NAME = 'react-app'
        BUILD_VERSION = "${env.BUILD_NUMBER}"
        
        // Wykrywanie platformy chmurowej
        CLOUD_PLATFORM = sh(script: 'cat /etc/cloud-platform 2>/dev/null || echo "unknown"', returnStdout: true).trim()
    }
    
    stages {
    
        stage('Checkout') {
            steps {
                // Pobranie kodu z repozytorium GitHub
                checkout scm
                
                // Logowanie informacji o bieżącej gałęzi i commicie
                sh 'git log -1'
                echo "Building on platform: ${env.CLOUD_PLATFORM}"
            }
        }
        
        stage('Build') {
            steps {
                // Instalacja zależności
                sh 'npm install'
                
                // Budowanie aplikacji
                sh 'npm run build'
                
                // Archiwizacja artefaktów
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
            }
        }
        
        stage('Containerize') {
            steps {
                // Budowanie obrazu Docker
                sh "docker build -t ${APP_NAME}:${BUILD_VERSION} ."
                
                // Tagowanie obrazu
                sh "docker tag ${APP_NAME}:${BUILD_VERSION} ${APP_NAME}:latest"
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    if (env.CLOUD_PLATFORM == 'aws') {
                        // Wdrażanie na AWS
                        sh "chmod +x ./deploy-scripts/deploy-aws.sh"
                        sh './deploy-scripts/deploy-aws.sh'
                    } else if (env.CLOUD_PLATFORM == 'azure') {
                        // Wdrażanie na Azure
                        sh './deploy-scripts/deploy-azure.sh'
                    } else if (env.CLOUD_PLATFORM == 'gcp') {
                        // Wdrażanie na GCP
                        sh './deploy-scripts/deploy-gcp.sh'
                    } else {
                        error "Nieobsługiwana platforma chmurowa: ${env.CLOUD_PLATFORM}"
                    }
                }
            }
        }
    }
    
    
    post {
        success {
            echo 'Pipeline zakończony sukcesem!'
        }
        failure {
            echo 'Pipeline zakończony niepowodzeniem!'
        }
        always {
            // Czyszczenie środowiska
            sh 'docker rmi ${APP_NAME}:${BUILD_VERSION} || true'
            sh 'docker rmi ${APP_NAME}:latest || true'
        }
    }
}
