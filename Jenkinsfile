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
                    // Clean existing dependencies in Jenkins workspace
                    sh 'rm -rf node_modules package-lock.json'
                    // Install fresh dependencies
                    sh 'npm install'
                    // Rebuild bcrypt for the Docker environment
                    sh 'npm rebuild bcrypt'
                    // Run tests
                    sh 'npm test'
                }
            }
        }
    }
}
