const express = require('express');
const cors = require('cors');
const session = require('express-session');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

app.options('*', cors());

app.use(express.json());

app.use(session({
  secret: 'bagstore_secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));