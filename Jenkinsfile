pipeline {
    agent any

    environment {
        MAVEN_HOME = tool 'Maven'
        NODEJS_HOME = tool name: 'NodeJS', type: 'NodeJSInstallation'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-username/employee-management.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('eclipse-workspace/employee') {
                    sh "${MAVEN_HOME}/bin/mvn clean install"
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('eclipse-workspace/employee/frontend') {
                    sh "${NODEJS_HOME}/bin/npm install"
                    sh "${NODEJS_HOME}/bin/ng build --prod"
                }
            }
        }

        stage('Deploy') {
            steps {
                sshagent(credentials: ['your-ssh-credentials-id']) {
                    sh 'scp -r eclipse-workspace/employee/target/* user@yourserver:/path/to/deploy/backend'
                    sh 'scp -r eclipse-workspace/employee/frontend/dist/* user@yourserver:/path/to/deploy/frontend'
                }
            }
        }
    }
}
