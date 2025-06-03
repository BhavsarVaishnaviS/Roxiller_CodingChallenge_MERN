const express = require('express');
const router = express.Router();
const { authMiddleware, roleCheck } = require('../middlewares/authMiddleware');
const db = require('../config/db'); 
const { QueryTypes } = require('sequelize'); 

// GET: All stores with avg ratings
router.get("/stores", authMiddleware,  async (req, res) => {
  const userId = req.user.id;

  const [stores] = await db.query(`
    SELECT s.id, s.name, s.address, AVG(r.rating) AS avg_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    GROUP BY s.id
  `);

  const userRatings = await db.query(
  `SELECT store_id, rating FROM ratings WHERE user_id = :userId`,
  {
    replacements: { userId },
    type: db.QueryTypes.SELECT,
  }
);
  const userRatingsMap = {};
  userRatings.forEach((r) => {
    userRatingsMap[r.store_id] = r.rating;
  });

  res.json({ stores, userRatings: userRatingsMap });
});

//rating
router.post("/stores/:storeId/rate", authMiddleware, async (req, res) => {
  try{
  console.log("req.body",req.body);
  const { storeId } = req.params;
  const { rating } = req.body;
  const userId = req.user.id;

  if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Invalid rating" });
  }

  const exists = await db.query(
  `SELECT * FROM ratings WHERE user_id = ? AND store_id = ?`,
  {
    replacements: [userId, storeId],
    type: QueryTypes.SELECT,
  }
);

  if (exists.length > 0) {
    await db.query(
  `UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?`,
  {
    replacements: [rating, userId, storeId],
    type: QueryTypes.UPDATE,
  }
);
  } else {
    await db.query(
        `INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)`,
        {
          replacements: [userId, storeId, rating],
          type: QueryTypes.INSERT,
        }
      );
  }

  res.json({ message: "Rating submitted" });
}catch (error) {
    console.error("Error saving rating:", error);
    res.status(500).json({ message: "Server error saving rating" });
  }
});

router.get("/store-owner/users", authMiddleware, async (req, res) => {
  if (req.user.role !== 'store_owner' && req.user.role !== 'owner') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const ownerId = req.user.id;

    const stores = await db.query(
      "SELECT id FROM stores WHERE user_id = ?",
      { replacements: [ownerId], type: db.QueryTypes.SELECT }
    );

    const storeIds = stores.map(s => s.id);
    if (storeIds.length === 0) return res.json({ users: [] });

    const users = await db.query(
      `SELECT DISTINCT u.id, u.name, u.email, u.address, u.role,
              AVG(r.rating) AS rating_given
       FROM users u
       JOIN ratings r ON u.id = r.user_id
       WHERE r.store_id IN (?)
       GROUP BY u.id`,
      {
        replacements: [storeIds],
        type: db.QueryTypes.SELECT
      }
    );

    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching users" });
  }
});

router.get("/ratings/average", authMiddleware, async (req, res) => {
  if (req.user.role !== 'store_owner' && req.user.role !== 'owner') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const ownerId = req.user.id;

    const averageRatings = await db.query(
      `SELECT 
         s.id AS store_id,
         s.name AS store_name,
         ROUND(AVG(r.rating)) AS average_rating,
         COUNT(r.rating) AS total_ratings
       FROM stores s
       LEFT JOIN ratings r ON s.id = r.store_id
       WHERE s.user_id = ?
       GROUP BY s.id`,
      {
        replacements: [ownerId],
        type: db.QueryTypes.SELECT
      }
    );

    res.json({ data: averageRatings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching average ratings" });
  }
});

router.post('/store-owner/add', authMiddleware, async (req, res) => {
  const { name, address, email } = req.body;
  const userId = req.user.id;

  if (req.user.role !== 'store_owner' && req.user.role !== 'owner') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const [result] = await db.query(
  'INSERT INTO stores (name, address, user_id, email) VALUES (:name, :address, :userId, :email)',
  {
    replacements: { name, address, userId ,email}, 
    type: db.QueryTypes.INSERT
  }
  );

    res.status(201).json({ message: 'Store added successfully', store: { id: result, name, address } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;