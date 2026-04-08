const express = require('express');
const cors = require('cors');
const session = require('express-session');

const app = express();

app.set('trust proxy', 1);

const corsOptions = {
  origin: 'https://jolly-selkie-439537.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};

app.use(cors(corsOptions));

// 🔥 VERY IMPORTANT (fix preflight)
app.options('*', cors(corsOptions));
app.use(express.json());


app.use(session({
  secret: 'bagstore_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    sameSite: 'none'
  }
}));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));

app.get('/', (req, res) => {
  res.send('Backend Running 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));