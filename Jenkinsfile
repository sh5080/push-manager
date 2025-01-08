pipeline {
    agent any
    
    environment {
        GRAM_USER = credentials('GRAM_USER')
        GRAM_HOST = credentials('GRAM_HOST')
        GRAM_PORT = credentials('GRAM_PORT')
        GRAM_PATH = 'C:\\Users\\1\\push-manager'
        GITHUB_APP = credentials('GITHUB_APP_CREDS')
        GRAM_PASS = credentials('GRAM_SSH_PASSWORD')
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    credentialsId: 'GITHUB_APP_CREDS',
                    url: 'https://github.com/sh5080/push-manager.git'
                
                withCredentials([
                    usernamePassword(credentialsId: 'GRAM_SSH_PASSWORD', usernameVariable: 'SSH_USER', passwordVariable: 'SSH_PASS'),
                    usernamePassword(credentialsId: 'GITHUB_APP_CREDS', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')
                ]) {
                    sh '''
                        /opt/homebrew/bin/sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no -p ${GRAM_PORT} ${GRAM_USER}@${GRAM_HOST} "cd ${GRAM_PATH} && \
                        git config --global credential.helper store && \
                        git config --global --unset credential.helper && \
                        git fetch https://$GIT_USER:$GIT_PASS@github.com/sh5080/push-manager.git && \
                        git checkout master && \
                        git pull https://$GIT_USER:$GIT_PASS@github.com/sh5080/push-manager.git master"
                    '''
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'GRAM_SSH_PASSWORD', usernameVariable: 'SSH_USER', passwordVariable: 'SSH_PASS')
                ]) {
                    sh '''
                        /opt/homebrew/bin/sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no -p ${GRAM_PORT} ${GRAM_USER}@${GRAM_HOST} "cd ${GRAM_PATH} && yarn install"
                    '''
                }
            }
        }

        stage('Build') {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'GRAM_SSH_PASSWORD', usernameVariable: 'SSH_USER', passwordVariable: 'SSH_PASS')
                ]) {
                    sh '''
                        /opt/homebrew/bin/sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no -p ${GRAM_PORT} ${GRAM_USER}@${GRAM_HOST} "cd ${GRAM_PATH} && \
                        yarn build"
                    '''
                }
            }
        }
        
        stage('Deploy') {
            parallel {
                stage('Deploy API Server') {
                    steps {
                        withCredentials([
                            usernamePassword(credentialsId: 'GRAM_SSH_PASSWORD', usernameVariable: 'SSH_USER', passwordVariable: 'SSH_PASS')
                        ]) {
                            sh '''
                                /opt/homebrew/bin/sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no -p ${GRAM_PORT} ${GRAM_USER}@${GRAM_HOST} "cd ${GRAM_PATH} && yarn server:prod"
                            '''
                        }
                    }
                }
                
                stage('Deploy Web') {
                    steps {
                        withCredentials([
                            usernamePassword(credentialsId: 'GRAM_SSH_PASSWORD', usernameVariable: 'SSH_USER', passwordVariable: 'SSH_PASS')
                        ]) {
                            sh '''
                                /opt/homebrew/bin/sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no -p ${GRAM_PORT} ${GRAM_USER}@${GRAM_HOST} "cd ${GRAM_PATH} && yarn web:prod"
                            '''
                        }
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