pipeline {
    agent any
    stages {
        stage('Setup Docker Environment') {
            agent {
                docker {
                    image 'node:18' // Use Node.js Docker image
                }
            }
            steps {
                dir('backend') { // Navigate to the backend directory
                    sh 'npm install'
                    sh 'npm test'
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
