const { deleteUser } = require("../controllers/userController"); // Import the deleteUser controller
const User = require("../models/userModel"); // Import the User model

// Mock the User model so we can simulate its behavior without accessing the database
jest.mock("../models/userModel");

describe("deleteUser", () => {
  // Test case for successfully deleting a user
  it("should delete a user", async () => {
    // Mock user ID and result indicating that a row was affected (user was deleted)
    const mockUserId = 1;
    const mockResult = { affectedRows: 1 };

    // Mock the implementation of the User.deleteUser function to simulate a successful deletion
    User.deleteUser.mockImplementation((id, callback) =>
      callback(null, mockResult)
    );

    // Simulate the request object containing the user ID in the params
    const req = { params: { id: mockUserId } };

    // Mock the response object
    const res = {
      json: jest.fn(), // Mock the json method
      status: jest.fn().mockReturnThis(), // Mock the status method and chain it
    };

    // Call the deleteUser function
    await deleteUser(req, res);

    // Assert that the response's status was set to 200 (OK) and the JSON response is correct
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "User deleted" }); // The expected success message
  });

  // Test case for handling errors during deletion
  it("should handle errors", async () => {
    // Mock user ID and simulate a database error message
    const mockUserId = 1;
    const errorMessage = "Database Error";

    // Mock the implementation of the User.deleteUser function to simulate a database error
    User.deleteUser.mockImplementation((id, callback) =>
      callback(errorMessage, null)
    );

    // Simulate the request object containing the user ID in the params
    const req = { params: { id: mockUserId } };

    // Mock the response object
    const res = {
      json: jest.fn(), // Mock the json method
      status: jest.fn().mockReturnThis(), // Mock the status method
      send: jest.fn(), // Mock the send method to send the error message
    };

    // Call the deleteUser function
    await deleteUser(req, res);

    // Assert that the response's status was set to 500 (Internal Server Error) and the error message was returned
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(errorMessage); // The error message passed from the mock
  });

  // Test case for handling when the user is not found
  it("should handle user not found", async () => {
    // Mock a non-existent user ID and simulate a result with no affected rows (user not found)
    const mockUserId = 999;
    const mockResult = { affectedRows: 0 };

    // Mock the implementation of the User.deleteUser function to simulate no user found
    User.deleteUser.mockImplementation((id, callback) =>
      callback(null, mockResult)
    );

    // Simulate the request object containing the user ID in the params
    const req = { params: { id: mockUserId } };

    // Mock the response object
    const res = {
      json: jest.fn(), // Mock the json method
      status: jest.fn().mockReturnThis(), // Mock the status method
    };

    // Call the deleteUser function
    await deleteUser(req, res);

    // Assert that the response's status was set to 404 (Not Found) and the appropriate message was returned
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" }); // The expected error message
  });
});
