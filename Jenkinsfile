def sendDiscordMessage(message) {
    sh """
        /opt/homebrew/bin/sshpass -p "\${GRAM_PASS_PSW}" ssh -o StrictHostKeyChecking=no -p \${GRAM_PORT} \${GRAM_USER}@\${GRAM_HOST} "cd \${GRAM_PATH} && \
        curl --interface wlan0 -k -H 'Content-Type: application/json' -d '{\\"content\\":\\"${message}\\"}' \${DISCORD_WEBHOOK}"
    """
}

def startOrReloadServer(serverName, displayName) {
    sh """
        /opt/homebrew/bin/sshpass -p "\${GRAM_PASS_PSW}" ssh -o StrictHostKeyChecking=no -p \${GRAM_PORT} \${GRAM_USER}@\${GRAM_HOST} "cd \${GRAM_PATH} && \
        if pm2 list | grep -q '${serverName}'; then \
            pm2 reload ${serverName} && \
            curl --interface wlan0 -k -H 'Content-Type: application/json' -d '{\\"content\\":\\"✅ ${displayName} 업데이트 성공\\"}' \${DISCORD_WEBHOOK}; \
        else \
            pm2 start ecosystem.config.js --only ${serverName} && \
            curl --interface wlan0 -k -H 'Content-Type: application/json' -d '{\\"content\\":\\"✅ ${displayName} 시작 성공\\"}' \${DISCORD_WEBHOOK}; \
        fi"
    """
}

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
                        git fetch origin && \
                        git checkout master && \
                        git pull origin master"
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
                        startOrReloadServer('push-web', 'Web Server')
                        startOrReloadServer('push-server', 'API Server')
                        
                        sh """
                            /opt/homebrew/bin/sshpass -p "\${GRAM_PASS_PSW}" ssh -o StrictHostKeyChecking=no -p \${GRAM_PORT} \${GRAM_USER}@\${GRAM_HOST} "cd \${GRAM_PATH} && \
                            pm2 save"
                        """
                    } catch (Exception e) {
                        sendDiscordMessage("❌ 서버 시작 실패: ${e.getMessage()}")
                        throw e
                    }
                }
            }
        }
    }
    
    post {
        success {
            sendDiscordMessage("🎉 전체 배포 프로세스 성공")
        }
        failure {
            sendDiscordMessage("💥 배포 프로세스 실패")
        }
    }
}