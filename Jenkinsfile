pipeline {
    agent any

    environment {
        EMAIL_RECIPIENT = 'Virgotex15@gmail.com'
        RENDER_URL = 'https://gallery-9cbe.onrender.com/' // 🔁 Replace with actual Render link
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
                             body: "Tests failed during Jenkins build.\n\nCheck Jenkins logs for details."
                        error("Tests failed, aborting build.")
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

    post {
        success {
            slackSend (
                channel: '#carlton_ip1', 
                message: "✅ Build #${env.BUILD_ID} deployed successfully!\nLive at: ${env.RENDER_URL}"
            )
        }
    }
}
