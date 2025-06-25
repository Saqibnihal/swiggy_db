const User = require("../../model/user");
const handleError = require("../utils/errorHandling");

// Get all users
exports.getUser = async (req, res) => {
  try {
    const users = await User.query();
    res
      .status(200)
      .json({ message: "Fetched users successfully", data: users });
  } catch (error) {
    handleError(res, error);
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = await User.query().insert(req.body);
    res.status(201).json({ message: "User created successfully", data: user });
  } catch (error) {
    handleError(res, error);
  }
};

// Update an existing user
exports.updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await User.query().patchAndFetchById(id, req.body);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
     handleError(res, error)
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const rowsDeleted = await User.query().deleteById(id);

    if (!rowsDeleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
     handleError(res, error)
  }
};
