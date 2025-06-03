const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const db = require('../config/db'); 

exports.register = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });
    if (!["admin", "owner", "user"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, address, role });
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    res.json({ message:'Login successful',token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Change password
async function changePassword(userId, oldPassword, newPassword) {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const passwordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!passwordMatch) {
    throw new Error('Incorrect old password');
  }

  const hashedPassword = await hashPassword(newPassword);
  user.password = hashedPassword;
  await user.save();
  return 'Password changed successfully';
}
