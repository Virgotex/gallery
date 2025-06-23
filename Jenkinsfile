pipeline {
    agent any
    tools {
		nodejs "Virgotex"
	}

    environment {
        EMAIL_RECIPIENT = 'Virgotex15@gmail.com'
        RENDER_URL = 'https://gallery-9cbe.onrender.com/' 
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
        always{
            script{
                if(currentBuild.result == 'FAILURE') {
                    slackSend(message: "❌ Build #${env.BUILD_ID} failed. Check Jenkins for details.")
                } else {
                    slackSend(message: "✅ Build #${env.BUILD_ID} succeeded. Check Jenkins for details.")
                }
            }
        }
    }
}
