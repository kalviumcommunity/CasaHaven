const mongoose = require("mongoose");
const User = require("../models/user");

// Register a new user
const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      profilePicture,
      isVerified,
      hostDetails,
      guestDetails
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Build user object
    const userData = {
      name,
      email,
      password,
      role,
      phone,
      profilePicture,
      isVerified,
      hostDetails,
      guestDetails,
    };

    // If role is host, initialize hostDetails
    if (role === "host") {
      userData.hostDetails = {
        isHost: true,
        hostSince: new Date(),
        averageRating: 0,
        totalReviews: 0,
        totalListings: 0,
        ...hostDetails, // allow optional override
      };
    }

    // If role is guest, initialize guestDetails
    if (role === "guest") {
      userData.guestDetails = {
        isGuest: true,
        totalBookings: 0,
        wishlist: [],
        ...guestDetails, // optional override
      };
    }

    // Create new user
    const user = new User(userData);
    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

// Get all users (no passwords)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

// Get user by ID (no password)
const getUserById = async (req, res) => {
  try {
    const id = req.params.id.trim(); // 🧼 Sanitize ID

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const id = req.params.id.trim(); // 🧼 Sanitize ID

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id.trim(); // sanitize input

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
};



module.exports = {
  register,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
