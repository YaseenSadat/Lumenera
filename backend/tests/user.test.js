import request from "supertest";
import mongoose from "mongoose";
import bcrypt from "bcrypt"; // Import bcrypt to hash the password
import app from "../server"; // Import your Express app
import userModel from "../models/userModel"; // Import your user model

describe("User Login Integration Tests", () => {
    beforeAll(async () => {
        console.log("Connecting to Test Database...");
        await mongoose.connect(process.env.TEST_MONGODB_URI);

        console.log("Clearing existing users and adding test user...");
        await userModel.deleteMany(); // Remove any existing users
        const hashedPassword = await bcrypt.hash("password123", 10);
        console.log("Test user's hashed password:", hashedPassword);

        await userModel.create({
            name: "Test User",
            email: "test@example.com",
            password: hashedPassword,
        });

        console.log("Test user created successfully.");
    });

    afterAll(async () => {
        console.log("Disconnecting from Test Database...");
        await mongoose.connection.close();
    });

    test("Should successfully log in with valid credentials", async () => {
        console.log("Attempting login with valid credentials...");
        const response = await request(app)
            .post("/api/user/login")
            .send({
                email: "test@example.com",
                password: "password123",
            });

        // Debugging response
        console.log("Debug: Response Body ->", response.body);

        // Assertions
        try {
            expect(response.statusCode).toBe(200);
            expect(response.body.success).toBe(true); // Verify success is true
            expect(response.body.token).toBeDefined(); // Ensure a token is returned
        } catch (error) {
            console.error("Test Assertion Error:", error.message);
            console.error("Response Body During Error:", response.body);
            throw error; // Re-throw error for Jest to handle
        }
    });

    test("Should fail to log in with invalid credentials", async () => {
        console.log("Attempting login with invalid credentials...");
        const response = await request(app)
            .post("/api/user/login")
            .send({
                email: "test@example.com",
                password: "wrongpassword",
            });

        console.log("Debug: Response Body ->", response.body);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Invalid credentials");
    });

    test("Should fail to log in with a non-existent email", async () => {
        console.log("Attempting login with non-existent email...");
        const response = await request(app)
            .post("/api/user/login")
            .send({
                email: "nonexistent@example.com",
                password: "password123",
            });

        console.log("Debug: Response Body ->", response.body);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("User does not exist");
    });
});
