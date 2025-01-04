module.exports = {
    testEnvironment: "node",
    setupFiles: ["dotenv/config"], // Load .env variables for tests
    transform: {
        "^.+\\.js$": "babel-jest", // Use Babel to transform JS files
    },
};
