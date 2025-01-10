const { createUser } = require("../controllers/userController"); // Import the createUser controller
const User = require("../models/userModel"); // Import the User model
const { StatusCodes } = require("http-status-codes"); // Import status codes

// Mock the User model so we can simulate its behavior without accessing the database
jest.mock("../models/userModel");

describe("createUser", () => {
  // Test case for successfully creating a new user
  it("should create a new user", async () => {
    // Mock user data to simulate the creation of a new user
    const mockUserData = {
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
    };

    // Mock the result returned by the User.createUser function (insertId is a common DB response field)
    const mockInsertResult = { insertId: 1 };

    // Mock the implementation of the User.createUser function to call the callback with no error
    User.createUser.mockImplementation((data, callback) =>
      callback(null, mockInsertResult)
    );

    // Simulate the request object containing user data in the body
    const req = { body: mockUserData };

    // Mock the response object to track status and JSON method calls
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the createUser function
    await createUser(req, res);

    // Assert that the response's status was set to 201 (Created) and the JSON response is correct
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User created", // The expected response message
      userId: mockInsertResult.insertId, // The userId from the mock insert result
    });
  });

  // Test case for handling a duplicate email error
  it("should handle duplicate email error", async () => {
    // Mock user data with a duplicate email
    const mockUserData = {
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
    };

    // Simulate a MySQL error code for duplicate entries (error code 1062)
    const duplicateError = {
      errno: 1062,
    };

    // Mock the implementation of the User.createUser function to call the callback with the duplicate error
    User.createUser.mockImplementation((data, callback) =>
      callback(duplicateError, null)
    );

    // Simulate the request object
    const req = { body: mockUserData };

    // Mock the response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the createUser function
    await createUser(req, res);

    // Assert that the response's status is 400 (Bad Request) and the error message is correct
    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      status: "error", // The error status
      message: "Duplicate email!", // The expected error message for duplicate email
    });
  });

  // Test case for handling generic errors
  it("should handle generic errors", async () => {
    // Mock user data
    const mockUserData = {
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
    };

    // Simulate a generic error message (e.g., unknown error)
    const errorMessage = "Unknown Error";

    // Mock the implementation of the User.createUser function to call the callback with the generic error
    User.createUser.mockImplementation((data, callback) =>
      callback(errorMessage, null)
    );

    // Simulate the request object
    const req = { body: mockUserData };

    // Mock the response object
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Call the createUser function
    await createUser(req, res);

    // Assert that the response's status is 500 (Internal Server Error) and the error message is passed to send
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(errorMessage); // The expected generic error message
  });
});
