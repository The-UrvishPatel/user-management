const { getAllUsers } = require("../controllers/userController"); // Import the getAllUsers controller
const User = require("../models/userModel"); // Import the User model

// Mock the User model to avoid direct interaction with the database
jest.mock("../models/userModel");

describe("getAllUsers", () => {
  // Test case for successfully retrieving all users
  it("should return all users", async () => {
    // Mock the data to be returned when getAllUsers is called
    const mockUsers = [
      { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
      { id: 2, name: "Jane Doe", email: "jane@example.com", role: "Editor" },
    ];

    // Mock the implementation of User.getAllUsers to return mockUsers
    User.getAllUsers.mockImplementation((callback) =>
      callback(null, mockUsers)
    );

    // Mock request (req) and response (res) objects
    const req = {};
    const res = {
      json: jest.fn(), // Mock the json method to track its calls
      status: jest.fn().mockReturnThis(), // Mock the status method and chain it
    };

    // Call the getAllUsers function
    const c = await getAllUsers(req, res);

    // Assert that the response status was set to 200 (OK) and the mock users were returned in the JSON response
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  // Test case for handling errors during the retrieval of users
  it("should handle errors", async () => {
    // Simulate a database error
    const errorMessage = "Database Error";
    User.getAllUsers.mockImplementation((callback) =>
      callback(errorMessage, null)
    );

    // Mock request and response objects
    const req = {};
    const res = {
      json: jest.fn(), // Mock the json method
      status: jest.fn().mockReturnThis(), // Mock the status method
      send: jest.fn(), // Mock the send method to send the error message
    };

    // Call the getAllUsers function
    await getAllUsers(req, res);

    // Assert that the response status was set to 500 (Internal Server Error) and the error message was returned
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(errorMessage);
  });
});
