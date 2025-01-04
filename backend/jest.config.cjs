module.exports = {
    testEnvironment: 'node',
    reporters: [
        'default',
        ['jest-junit', { outputDirectory: './test-results', outputName: 'results.xml' }]
    ],
    transform: {
        '^.+\\.jsx?$': 'babel-jest'
    }
};
