const express = require('express');
const router = express.Router();
const db = require('../db');

// Get cart by user_id directly
router.get('/user/:user_id', async (req, res) => {
  const [rows] = await db.query(
    `SELECT c.id, p.name, p.price, p.image, c.quantity
     FROM cart c JOIN products p ON c.product_id = p.id
     WHERE c.user_id = ?`,
    [req.params.user_id]
  );
  res.json(rows);
});

router.post('/add', async (req, res) => {
  const { product_id, user_id } = req.body;
  if (!user_id) return res.status(401).json({ error: 'Not logged in' });
  await db.query('INSERT INTO cart (user_id, product_id) VALUES (?, ?)', [user_id, product_id]);
  res.json({ message: 'Added to cart' });
});

router.delete('/remove/:id', async (req, res) => {
  await db.query('DELETE FROM cart WHERE id = ?', [req.params.id]);
  res.json({ message: 'Removed from cart' });
});

module.exports = router;