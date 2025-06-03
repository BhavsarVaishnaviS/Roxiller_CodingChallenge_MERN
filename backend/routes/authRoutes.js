const { register, login } = require("../controllers/authController");
const {authMiddleware} = require("../middlewares/authMiddleware");
const db = require('../config/db'); 
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/register", register);
router.post("/login", login);

router.put('/change-password', authMiddleware, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userRole = req.user.role;

  if (!['user', 'store_owner','owner'].includes(userRole)) {
    return res.status(403).json({ message: 'Access denied' });
  }

  console.log(req.body);
  
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Old and new password are required' });
  }

  try {
    const [users] = await db.query(
      'SELECT * FROM users WHERE id = :id',
      {
        replacements: { id: req.user.id },
        type: db.QueryTypes.SELECT
      }
    );

    const user = users[0];
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query(
      'UPDATE users SET password = :password WHERE id = :id',
      {
        replacements: { password: hashedPassword, id: req.user.id },
        type: db.QueryTypes.UPDATE
      }
    );

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/forget-password', async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email and new password are required' });
  }

  try {
    const [users] = await db.query(
      'SELECT * FROM users WHERE email = :email',
      {
        replacements: { email },
        type: db.QueryTypes.SELECT
      }
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query(
      'UPDATE users SET password = :password WHERE email = :email',
      {
        replacements: { password: hashedPassword, email },
        type: db.QueryTypes.UPDATE
      }
    );

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;


