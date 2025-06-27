pipeline {
    agent any
    
    tools {
        nodejs 'Virgotex'
    }

    environment {
        EMAIL_RECIPIENT = 'Virgotex15@gmail.com'
        RENDER_URL = 'https://gallery-9cbe.onrender.com/'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/Virgotex/gallery.git'
            }
        }

        stage('Initial Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
            post {
                failure {
                    emailext(
                        subject: "❌ Test Failed: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
                        body: "Tests failed during build #${env.BUILD_NUMBER}. Check console output: ${env.BUILD_URL}",
                        to: "${env.EMAIL_RECIPIENT}"
                    )
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                echo 'Deployment triggered automatically via GitHub push to Render'
                echo "App URL: ${env.RENDER_URL}"
            }
            post {
                success {
                    slackSend(
                        channel: '#Carlton_IP1',
                        color: 'good',
                        message: "🚀 Deployment Successful! Build #${env.BUILD_NUMBER} deployed to Render: ${env.RENDER_URL}",
                        tokenCredentialId: 'My Slack token',
                        botUser: true
                    )
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}
