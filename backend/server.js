const express = require('express');
const cors = require('cors');
const session = require('express-session');

const app = express();

// 🔥 IMPORTANT for Railway
app.set('trust proxy', 1);

// 🔥 FINAL CORS CONFIG (CLEAN)
app.use(cors({
  origin: 'https://jolly-selkie-439537.netlify.app',
  credentials: true
}));

// 🔥 HANDLE PREFLIGHT (IMPORTANT)
app.options('*', cors({
  origin: 'https://jolly-selkie-439537.netlify.app',
  credentials: true
}));

// BODY PARSER
app.use(express.json());

// 🔥 SESSION CONFIG (FINAL)
app.use(session({
  secret: 'bagstore_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,       // required for HTTPS (Netlify)
    sameSite: 'none'    // required for cross-origin
  }
}));

// ROUTES
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));

// TEST ROUTE
app.get('/', (req, res) => {
  res.send('Backend Running 🚀');
});

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));