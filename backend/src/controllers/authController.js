const bcrypt = require("bcryptjs");
const { User } = require("../models/userModel");
const { generateToken } = require("../utils/jwt");

const register = async (req, res) => {
  console.log("Register request body:", req.body);
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existing = await User.findOne({ where: { username } });
    console.log("Existing user:", existing);

    if (existing) return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, role });
    console.log("Created user:", user.toJSON());

    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  console.log("Login request body:", req.body);
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };
