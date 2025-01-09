const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");

exports.pong = (req, res) => {
  res.status(500).json("pong");
};

exports.getAllUsers = (req, res) => {
  User.getAllUsers((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.createUser = (req, res) => {
  const userData = req.body;
  User.createUser(userData, (err, results) => {
    if (err)
    {
        if(err.errno == 1062)
            return res.status(StatusCodes.BAD_REQUEST).json({status: "error", message: "Duplicate email!"});

        return res.status(500).send(err);
    }

    res.status(201).json({ message: "User created", userId: results.insertId });
  });
};

exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  User.updateUser(userId, userData, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "User updated" });
  });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  User.deleteUser(userId, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "User deleted" });
  });
};
