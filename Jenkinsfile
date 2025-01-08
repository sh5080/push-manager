pipeline {
    agent any
    
    environment {
        GRAM_USER = credentials('GRAM_USER')
        GRAM_HOST = credentials('GRAM_HOST')
        GRAM_PORT = credentials('GRAM_PORT')
        GRAM_PATH = 'C:\\Users\\1\\push-manager'
        GITHUB_APP = credentials('GITHUB_APP_CREDS')
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    credentialsId: 'GITHUB_APP_CREDS',
                    url: 'https://github.com/sh5080/push-manager.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh """
                    ssh -p \${GRAM_PORT} \${GRAM_USER}@\${GRAM_HOST} "cd ${GRAM_PATH} && yarn install"
                """
            }
        }

        stage('Build') {
            steps {
                sh """
                    ssh -p \${GRAM_PORT} \${GRAM_USER}@\${GRAM_HOST} "cd ${GRAM_PATH} && yarn build"
                """
            }
        }
        
        stage('Deploy') {
            parallel {
                stage('Deploy API Server') {
                    steps {
                        sh """
                            ssh -p \${GRAM_PORT} \${GRAM_USER}@\${GRAM_HOST} "cd ${GRAM_PATH} && yarn server:prod"
                        """
                    }
                }
                
                stage('Deploy Web') {
                    steps {
                        sh """
                            ssh -p \${GRAM_PORT} \${GRAM_USER}@\${GRAM_HOST} "cd ${GRAM_PATH} && yarn web:prod"
                        """
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}