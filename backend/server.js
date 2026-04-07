const express = require('express');
const cors = require('cors');
const session = require('express-session');

const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true,
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.use(session({
  secret: 'bagstore_secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Test session route
app.get('/api/check', (req, res) => {
  res.json({ user: req.session.user || null });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));