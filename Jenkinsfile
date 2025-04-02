pipeline {
    agent {
        docker {
            image 'node:20.11.1-alpine' 
            args '--user root -v /var/run/docker.sock:/var/run/docker.sock'  
        }
    }
    
    environment {
        APP_NAME = 'react-app'
        BUILD_VERSION = "${env.BUILD_NUMBER}"
        
        // Wykrywanie platformy chmurowej
        CLOUD_PLATFORM = sh(script: 'cat /etc/cloud-platform 2>/dev/null || echo "unknown"', returnStdout: true).trim()
    }
    
    stages {
       stage('Setup') {
           steps {
               sh 'sudo apk add --no-cache git || apk add --no-cache git'
               sh 'git config --global --add safe.directory /var/lib/jenkins/workspace/Pipeline'

        }
     }
        
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
                archiveArtifacts artifacts: 'build/**/*', fingerprint: true
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
        
        stage('Verify') {
            steps {
                // Oczekiwanie na gotowość aplikacji
                sh 'sleep 30'
                
                // Weryfikacja dostępności aplikacji
                sh './verify-deployment.sh'
                
                // Zbieranie podstawowych metryk
                sh './collect-metrics.sh'
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
            
            // Archiwizacja metryk
            archiveArtifacts artifacts: 'metrics/*.json', allowEmptyArchive: true
        }
    }
}
