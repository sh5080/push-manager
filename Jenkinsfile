pipeline {
    agent any
    
    environment {
        GRAM_USER = credentials('GRAM_USER')
        GRAM_HOST = credentials('GRAM_HOST')
        GRAM_PORT = credentials('GRAM_PORT')
        GRAM_PATH = 'C:\\Users\\1\\push-manager'
        GITHUB_APP = credentials('GITHUB_APP_CREDS')
        GRAM_PASS = credentials('GRAM_SSH_PASSWORD')
        DISCORD_WEBHOOK = credentials('DISCORD_WEBHOOK')
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
                        git checkout"
                    """
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh """
                    /opt/homebrew/bin/sshpass -p "\${GRAM_PASS_PSW}" ssh -o StrictHostKeyChecking=no -p \${GRAM_PORT} \${GRAM_USER}@\${GRAM_HOST} "cd \${GRAM_PATH} && \
                    yarn install"
                """
            }
        }
        
        stage('Build') {
            steps {
                sh """
                    /opt/homebrew/bin/sshpass -p "\${GRAM_PASS_PSW}" ssh -o StrictHostKeyChecking=no -p \${GRAM_PORT} \${GRAM_USER}@\${GRAM_HOST} "cd \${GRAM_PATH} && \
                    yarn build:all"
                """
            }
        }

        stage('Start Servers') {
            steps {
                script {
                    try {
                        sh """
                            /opt/homebrew/bin/sshpass -p "\${GRAM_PASS_PSW}" ssh -o StrictHostKeyChecking=no -p \${GRAM_PORT} \${GRAM_USER}@\${GRAM_HOST} "cd \${GRAM_PATH} && \
                            if pm2 list | grep -q 'push-web'; then \
                                pm2 reload push-web && \
                                curl -H 'Content-Type: application/json' -d '{\\"content\\":\\"✅ Web Server 업데이트 성공\\"}' \${DISCORD_WEBHOOK}; \
                            else \
                                pm2 start ecosystem.config.js --only push-web && \
                                curl -H 'Content-Type: application/json' -d '{\\"content\\":\\"✅ Web Server 시작 성공\\"}' \${DISCORD_WEBHOOK}; \
                            fi"
                        """
                        
                        sh """
                            /opt/homebrew/bin/sshpass -p "\${GRAM_PASS_PSW}" ssh -o StrictHostKeyChecking=no -p \${GRAM_PORT} \${GRAM_USER}@\${GRAM_HOST} "cd \${GRAM_PATH} && \
                            if pm2 list | grep -q 'push-server'; then \
                                pm2 reload push-server && \
                                curl -H 'Content-Type: application/json' -d '{\\"content\\":\\"✅ API Server 업데이트 성공\\"}' \${DISCORD_WEBHOOK}; \
                            else \
                                pm2 start ecosystem.config.js --only push-server && \
                                curl -H 'Content-Type: application/json' -d '{\\"content\\":\\"✅ API Server 시작 성공\\"}' \${DISCORD_WEBHOOK}; \
                            fi"
                        """
                        
                        sh """
                            /opt/homebrew/bin/sshpass -p "\${GRAM_PASS_PSW}" ssh -o StrictHostKeyChecking=no -p \${GRAM_PORT} \${GRAM_USER}@\${GRAM_HOST} "cd \${GRAM_PATH} && \
                            pm2 save"
                        """
                    } catch (Exception e) {
                        sh """
                            curl -H 'Content-Type: application/json' -d '{\\"content\\":\\"❌ 서버 시작 실패: ${e.getMessage()}\\"}' \${DISCORD_WEBHOOK}
                        """
                        throw e
                    }
                }
            }
        }
    }
    
    post {
        success {
            sh """
                curl -H 'Content-Type: application/json' -d '{\\"content\\":\\"🎉 전체 배포 프로세스 성공\\"}' \${DISCORD_WEBHOOK}
            """
        }
        failure {
            sh """
                curl -H 'Content-Type: application/json' -d '{\\"content\\":\\"💥 배포 프로세스 실패\\"}' \${DISCORD_WEBHOOK}
            """
        }
    }
}