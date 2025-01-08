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
                    usernamePassword(credentialsId: 'GRAM_SSH_PASSWORD', usernameVariable: 'SSH_USER', passwordVariable: 'SSH_PASS')
                ]) {
                    sh '''
                        /opt/homebrew/bin/sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no -p ${GRAM_PORT} ${GRAM_USER}@${GRAM_HOST} "cd ${GRAM_PATH} && \
                        echo '=== Checkout 단계 커밋 상태 ===' && \
                        git log -1 --pretty=format:'%h - %s (%cr)' && \
                        git fetch origin && \
                        git checkout master && \
                        git pull origin master"
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
                        /opt/homebrew/bin/sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no -p ${GRAM_PORT} ${GRAM_USER}@${GRAM_HOST} "cd ${GRAM_PATH} && \
                        echo '=== Install Dependencies 단계 커밋 상태 ===' && \
                        git log -1 --pretty=format:'%h - %s (%cr)' && \
                        yarn install"
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
                        echo '=== Build 단계 커밋 상태 ===' && \
                        git log -1 --pretty=format:'%h - %s (%cr)' && \
                        yarn build:all"
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