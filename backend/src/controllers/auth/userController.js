const User = require("../../models/auth/userModel");
const generateToken = require("../../helpers/generateToken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    // Get data from the body
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Password length
    if (password.length < 6) {
      return res.status(400).json("Password must be six characters or more");
    }

    // Check if email exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user

    const newUser = new User({ name, email, password: hashedPassword });

    const token = generateToken(newUser._id);
    console.log(newUser);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // Save user
    const savedUser = await newUser.save();

    const { password: userPassword, ...otherData } = savedUser._doc;

    // Return saved user
    return res.status(201).json({ ...otherData, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check is user exists
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // unhash password
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = { registerUser, loginUser };
