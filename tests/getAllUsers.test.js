const { getAllUsers } = require("../controllers/userController");
const User = require("../models/userModel");

jest.mock("../models/userModel");

describe("getAllUsers", () => {
  it("should return all users", async () => {
    const mockUsers = [
      { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
      { id: 2, name: "Jane Doe", email: "jane@example.com", role: "Editor" },
    ];

    User.getAllUsers.mockImplementation((callback) =>
      callback(null, mockUsers)
    );

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    console.log(res)
    const c = await getAllUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  it("should handle errors", async () => {
    const errorMessage = "Database Error";
    User.getAllUsers.mockImplementation((callback) =>
      callback(errorMessage, null)
    );

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await getAllUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(errorMessage);
  });
});
