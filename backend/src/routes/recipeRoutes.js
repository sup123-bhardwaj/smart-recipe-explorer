const express = require('express');
const {
  seedRecipes,
  getRecipes,
  getRecipeById,
  createRecipe
} = require('../controllers/recipeController');

const router = express.Router();

// Seed data (optional; call one time)
router.post('/seed', seedRecipes);

// CRUD + search
router.get('/', getRecipes);
router.get('/:id', getRecipeById);
router.post('/', createRecipe);

module.exports = router;
