const db = require("../config/db");

const User = {
  getAllUsers: (callback) => {
    const query = "SELECT * FROM Users";
    db.query(query, callback);
  },

  createUser: (userData, callback) => {
    const query = "INSERT INTO Users SET ?";
    db.query(query, userData, callback);
  },

  updateUser: (id, userData, callback) => {
    const query = "UPDATE Users SET ? WHERE userId = ?";
    db.query(query, [userData, id], callback);
  },

  deleteUser: (id, callback) => {
    const query = "DELETE FROM Users WHERE userId = ?";
    db.query(query, id, callback);
  },
};

module.exports = User;
