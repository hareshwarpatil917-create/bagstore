const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth'); // 🔥 import middleware

// ✅ GET CART
router.get('/user', auth, async (req, res) => {
  try {
    const user_id = req.user.id;

    const [rows] = await db.query(
      `SELECT c.id, p.name, p.price, p.image, c.quantity
       FROM cart c JOIN products p ON c.product_id = p.id
       WHERE c.user_id = ?`,
      [user_id]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ADD TO CART (PROTECTED)
router.post('/add', auth, async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user.id; // 🔥 from token

  try {
    const [existing] = await db.query(
      'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
      [user_id, product_id]
    );

    if (existing.length > 0) {
      await db.query(
        'UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
        [quantity || 1, user_id, product_id]
      );
    } else {
      await db.query(
        'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [user_id, product_id, quantity || 1]
      );
    }

    res.json({ message: 'Added to cart!' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ REMOVE ITEM
router.delete('/remove/:id', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM cart WHERE id = ?', [req.params.id]);
    res.json({ message: 'Removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;