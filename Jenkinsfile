def sendDiscordMessage(message) {
    sh """
        curl --interface \${WIFI_INTERFACE} -k -H 'Content-Type: application/json' -d '{"content": "${message}"}' \${DISCORD_WEBHOOK}
    """
}

def startOrReloadServer(serverName, displayName) {
    try {
        def result = sh(script: """
            /opt/homebrew/bin/sshpass -p "\${GRAM_PASS_PSW}" ssh -o StrictHostKeyChecking=no -p \${GRAM_PORT} \${GRAM_USER}@\${GRAM_HOST} "cd \${GRAM_PATH} && \
            chcp 65001 > nul && \
            pm2 jlist > pm2_status.json && \
            if type pm2_status.json | findstr ${serverName}; then \
                pm2 reload ${serverName} && \
                echo 'reload'; \
            else \
                pm2 start ecosystem.config.js --only ${serverName} && \
                echo 'start'; \
            fi && \
            del pm2_status.json"
        """, returnStdout: true).trim()
        
        sendDiscordMessage("✅ ${displayName} ${result == 'reload' ? '업데이트' : '시작'} 성공")
    } catch (Exception e) {
        sendDiscordMessage("❌ ${displayName} 실패: ${e.getMessage()}")
        throw e
    }
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
        WIFI_INTERFACE = credentials('WIFI_INTERFACE')
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