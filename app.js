const express = require('express');
require('dotenv').config();

const app = express();
const adsRouter = require('./routes/api/ads');

app.use(express.json());

app.use('/api/ads', adsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
