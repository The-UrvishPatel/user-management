const { deleteUser } = require("../controllers/userController");
const User = require("../models/userModel");

jest.mock("../models/userModel");

describe("deleteUser", () => {
  it("should delete a user", async () => {
    const mockUserId = 1;
    const mockResult = { affectedRows: 1 };

    User.deleteUser.mockImplementation((id, callback) =>
      callback(null, mockResult)
    );

    const req = { params: { id: mockUserId } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "User deleted" });
  });

  it("should handle errors", async () => {
    const mockUserId = 1;
    const errorMessage = "Database Error";

    User.deleteUser.mockImplementation((id, callback) =>
      callback(errorMessage, null)
    );

    const req = { params: { id: mockUserId } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(errorMessage);
  });

  it("should handle user not found", async () => {
    const mockUserId = 999;
    const mockResult = { affectedRows: 0 };

    User.deleteUser.mockImplementation((id, callback) =>
      callback(null, mockResult)
    );

    const req = { params: { id: mockUserId } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });
});
