const express = require('express');
const cors = require('cors');

const recipeRoutes = require('./routes/recipeRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'Smart Recipe Explorer API running' });
});

app.use('/api/recipes', recipeRoutes);
app.use('/api/ai', aiRoutes);

// simple error handler
app.use((err, req, res, next) => {
  console.error('Error handler:', err.message);
  res
    .status(err.statusCode || 500)
    .json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;
