def sendDiscordMessage(message, isSuccess = true) {
    def buildUrl = env.BUILD_URL ?: 'N/A'
    def jobName = env.JOB_NAME ?: 'N/A'
    def buildNumber = env.BUILD_NUMBER ?: 'N/A'
    
    def jsonString = groovy.json.JsonOutput.toJson([
        embeds: [[
            title: "Jenkins Build #${buildNumber}",
            description: message,
            color: isSuccess ? 3066993 : 15158332,
            fields: [
                [
                    name: "Job",
                    value: jobName,
                    inline: true
                ],
                [
                    name: "Build",
                    value: "#${buildNumber}",
                    inline: true
                ]
            ],
            footer: [
                text: "Jenkins Build"
            ],
            timestamp: new Date().format("yyyy-MM-dd'T'HH:mm:ss'Z'", TimeZone.getTimeZone('UTC'))
        ]]
    ])
    
    sh """
        curl --interface \${WIFI_INTERFACE} -k -H 'Content-Type: application/json' \
        -d '${jsonString}' \${DISCORD_WEBHOOK}
    """
}

def getDeployInfo(serverName) {
    def deployInfo = [
        'push-web': [
            port: '8888',
            icon: '🌐',
            type: 'Web'
        ],
        'push-server': [
            port: '3000',
            icon: '🔌',
            type: 'API'
        ]
    ]
    return deployInfo[serverName]
}

def startOrReloadServer(serverName, displayName) {
    try {
        def deployInfo = getDeployInfo(serverName)
        
        def result = sh(script: """
            /opt/homebrew/bin/sshpass -p "\${GRAM_PASS_PSW}" ssh -o StrictHostKeyChecking=no -p \${GRAM_PORT} \${GRAM_USER}@\${GRAM_HOST} "cd \${GRAM_PATH} && \
            if pm2 reload ${serverName}; then \
                STATUS='업데이트'; \
            else \
                pm2 start ecosystem.config.js --only ${serverName} && STATUS='시작'; \
            fi && \
            sleep 2 && \
            FRONTEND_URL=\$(pm2 env ${serverName} | grep 'FRONTEND_URL' | cut -d'=' -f2) && \
            curl -H 'Content-Type: application/json' \
            -d '{\\"embeds\\":[{\\"title\\":\\"Jenkins Build #\${BUILD_NUMBER}\\",\\"description\\":\\"✅ ${displayName} '\$STATUS' 성공\\\\n${deployInfo.icon} ${deployInfo.type} 주소: http://'\$FRONTEND_URL':${deployInfo.port}\\",\\"color\\":3066993}]}' \
            \${DISCORD_WEBHOOK}"
        """, returnStdout: true).trim()
        
        println "DEBUG - Raw result: [${result}]"
    } catch (Exception e) {
        sendDiscordMessage("❌ ${displayName} 실패: ${e.getMessage()}", false)
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
                        sendDiscordMessage("❌ 서버 시작 실패: ${e.getMessage()}", false)
                        throw e
                    }
                }
            }
        }
    }
    
    post {
        success {
            sendDiscordMessage("🎉 전체 배포 프로세스 성공", true)
        }
        failure {
            sendDiscordMessage("💥 배포 프로세스 실패", false)
        }
    }
}