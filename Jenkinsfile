pipeline {
    agent any

    environment {
        EMAIL_RECIPIENT = 'Virgotex15@gmail.com' 
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                script {
                    try {
                        sh 'npm test'
                    } catch (err) {
                        mail to: "${env.EMAIL_RECIPIENT}",
                             subject: "❌ Build #${env.BUILD_ID} - Test Failure",
                             body: "Tests failed during Jenkins build.\nCheck console output for details."
                        error("Stopping pipeline due to test failure.")
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'node server.js' 
            }
        }
    }
}
