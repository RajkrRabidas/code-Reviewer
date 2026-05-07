const express = require('express');
const aiRoutes = require('./routes/ai.routes');

const app = express

// Middlewares

app.use(express.json());

// routes

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/ai', aiRoutes);


module.exports = app;