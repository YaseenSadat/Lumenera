pipeline {
    agent any
    stages {
        stage('Install and Test') {
            agent {
                docker {
                    image 'node:18' // Use Node.js Docker image
                }
            }
            steps {
                dir('backend') {
                    sh 'npm install'
                    sh 'npm test' // No need for manual export if dotenv is used
                }
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'backend/test-results/results.xml', onlyIfSuccessful: false
        }
    }
}
