const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // 🔥 add this
const db = require('../db');

const SECRET = 'mysecretkey'; // 🔥 keep same everywhere

// ✅ REGISTER
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashed]
    );

    res.json({ message: 'Registered successfully' });

  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

// ✅ LOGIN (UPDATED WITH TOKEN)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 🔥 CREATE TOKEN
    const token = jwt.sign(
      { id: user.id },   // payload
      SECRET,
      { expiresIn: '1d' } // optional
    );

    // ✅ SEND USER + TOKEN
    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name
      },
      token: token
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;