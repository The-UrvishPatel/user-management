const { createUser } = require("../controllers/userController");
const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");

jest.mock("../models/userModel");

describe("createUser", () => {
  it("should create a new user", async () => {
    const mockUserData = {
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
    };
    const mockInsertResult = { insertId: 1 };

    User.createUser.mockImplementation((data, callback) =>
      callback(null, mockInsertResult)
    );

    const req = { body: mockUserData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User created",
      userId: mockInsertResult.insertId,
    });
  });

  it("should handle duplicate email error", async () => {
    const mockUserData = {
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
    };

    const duplicateError = {
      errno: 1062,
    };
    User.createUser.mockImplementation((data, callback) =>
      callback(duplicateError, null)
    );

    const req = { body: mockUserData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: "Duplicate email!",
    });
  });

  it("should handle generic errors", async () => {
    const mockUserData = {
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
    };

    const errorMessage = "Unknown Error";
    User.createUser.mockImplementation((data, callback) =>
      callback(errorMessage, null)
    );

    const req = { body: mockUserData };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(errorMessage);
  });
});
