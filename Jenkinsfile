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
                script {
                    checkout([$class: 'GitSCM', 
                        branches: [[name: 'master']], 
                        userRemoteConfigs: [[
                            url: 'https://github.com/sh5080/push-manager.git',
                            credentialsId: 'GITHUB_APP_CREDS'
                        ]]
                    ])
                    
                    sh """
                        /opt/homebrew/bin/sshpass -p "\${GRAM_PASS_PSW}" ssh -o StrictHostKeyChecking=no -p \${GRAM_PORT} \${GRAM_USER}@\${GRAM_HOST} "cd \${GRAM_PATH} && \
                        echo === Checkout Stage Commit Status === && \
                        git log -1 && \
                        git checkout ${gitCommit.GIT_COMMIT}"
                    """
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh """
                    /opt/homebrew/bin/sshpass -p "\${GRAM_PASS_PSW}" ssh -o StrictHostKeyChecking=no -p \${GRAM_PORT} \${GRAM_USER}@\${GRAM_HOST} "cd \${GRAM_PATH} && \
                    echo === Install Dependencies Stage Commit Status === && \
                    git log -1 && \
                    yarn install"
                """
            }
        }
        
        stage('Build') {
            steps {
                sh """
                    /opt/homebrew/bin/sshpass -p "\${GRAM_PASS_PSW}" ssh -o StrictHostKeyChecking=no -p \${GRAM_PORT} \${GRAM_USER}@\${GRAM_HOST} "cd \${GRAM_PATH} && \
                    echo === Build Stage Commit Status === && \
                    git log -1 && \
                    yarn build:all"
                """
            }
        }
    }
}