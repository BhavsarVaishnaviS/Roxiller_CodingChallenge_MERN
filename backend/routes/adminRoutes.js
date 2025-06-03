const express = require("express");
const router = express.Router();
const { authMiddleware, roleCheck } = require("../middlewares/authMiddleware");
const db = require("../config/db");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { now } = require("sequelize/lib/utils");

//dashboard
router.get(
  "/dashboard",
  authMiddleware,
  roleCheck("admin"),
  async (req, res) => {
    try {
      const [users] = await db.query(
        "SELECT COUNT(*) AS totalUsers FROM users"
      );
      const [stores] = await db.query(
        "SELECT COUNT(*) AS totalStores FROM stores"
      );
      const [ratings] = await db.query(
        "SELECT COUNT(*) AS totalRatings FROM ratings"
      );

      res.json({
        totalUsers: users[0].totalUsers,
        totalStores: stores[0].totalStores,
        totalRatings: ratings[0].totalRatings,
      });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  }
);

//add user
// router.post('/add-user', authMiddleware, roleCheck('admin'), async (req, res) => {
//   const { name, email, password, address, role } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     await db.query(
//       "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)",
//       [name, email, hashedPassword, address, role]
//     );

//     res.status(201).json({ message: "User created successfully" });
//   } catch (err) {
//     console.error("Add user error:", err);
//     res.status(500).json({ message: "Error creating user" });
//   }
// });
router.post(
  "/add-user",
  authMiddleware,
  roleCheck("admin"),
  async (req, res) => {
    const { name, email, password, address, role } = req.body;

    if (!name || !email || !password || !address || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (name.length < 20) {
      return res.status(400).json({ message: "Please enter your full name!" });
    }

    // Ensure only Admins can access this
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await db.query(
        "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)",
        {
          replacements: [name, email, hashedPassword, address, role],
          type: db.QueryTypes.INSERT,
        }
      );

      res.json({ message: "User added successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to add user" });
    }
  }
);

//add store
// router.post('/add-store', authMiddleware, roleCheck('admin'), async (req, res) => {
//   const { name, email, password, address, storeName } = req.body;

//   if (!name || !email || !password || !address || !storeName) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const [existingUser] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
//     if (existingUser.length > 0) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const [userResult] = await db.query(
//       "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, 'owner')",
//       [name, email, hashedPassword, address]
//     );

//     const userId = userResult.insertId;

//     await db.query(
//       "INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)",
//       [storeName, email, address, userId]
//     );

//     res.status(201).json({ message: "Store and owner created successfully" });
//   } catch (err) {
//     console.error("Error in /add-store:", err);
//     res.status(500).json({ message: "Error creating store owner" });
//   }
// });

router.post("/add-store", authMiddleware, async (req, res) => {
  const { name, email, storeName, password, address } = req.body;

  if (!name || !email || !storeName || !password || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // 1. Check if email already exists
    const existingUser = await db.query(
      "SELECT id FROM users WHERE email = :email",
      {
        replacements: { email },
        type: db.QueryTypes.SELECT,
      }
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = "owner";

    // 3. Insert user (without RETURNING)
    const [insertResult] = await db.query(
      "INSERT INTO users (`name`, `email`, `password`, `address`, `role`, `createdAt`, `updatedAt`) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
      {
        replacements: [name, email, hashedPassword, address, role],
        type: db.QueryTypes.INSERT,
      }
    );

    const userId = insertResult; // MySQL returns insertId as the first value

    // 4. Insert store
    await db.query(
      "INSERT INTO stores (`name`,`email`, `address`, `user_id`) VALUES (?, ?, ?, ?)",
      {
        replacements: [storeName,email, address, userId],
        type: db.QueryTypes.INSERT,
      }
    );

    res.status(201).json({ message: "Store added successfully", userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});




//get all user
router.get("/users", authMiddleware, roleCheck("admin"), async (req, res) => {
  try {
    const { name = "", email = "", address = "", role = "" } = req.query;

    const users = await db.query(
      `
      SELECT id, name, email, address, role
      FROM users
      WHERE name LIKE :name AND email LIKE :email AND address LIKE :address
      AND role LIKE :role
      `,
      {
        replacements: {
          name: `%${name}%`,
          email: `%${email}%`,
          address: `%${address}%`,
          role: `%${role}%`,
        },
        type: QueryTypes.SELECT,
      }
    );

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error fetching users" });
  }
});

router.get(
  "/users/:userId",
  authMiddleware,
  roleCheck("admin"),
  async (req, res) => {
    try {
      const userId = req.params.userId;

      const [user] = await db.query(
        `SELECT id, name, email, address, role FROM users WHERE id = :userId`,
        { replacements: { userId }, type: QueryTypes.SELECT }
      );

      if (!user) return res.status(404).json({ message: "User not found" });

      if (user.role === "store_owner") {
        const [ratingResult] = await db.query(
          `
        SELECT AVG(r.rating) AS avg_rating
        FROM stores s
        LEFT JOIN ratings r ON s.id = r.store_id
        WHERE s.owner_id = :userId
        `,
          { replacements: { userId }, type: QueryTypes.SELECT }
        );

        user.avg_rating = ratingResult.avg_rating || 0;
      }

      res.json(user);
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ message: "Server error fetching user details" });
    }
  }
);

module.exports = router;
