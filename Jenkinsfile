pipeline {
    agent {
        docker {
            image 'node:18' // Use the same Node.js version as your backend
        }
    }
    environment {
        NODE_ENV = 'test'
    }
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
    }
    post {
        always {
            junit '**/test-results/results.xml' // Ensure Jest outputs results in this path
        }
    }
}
