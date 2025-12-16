const Recipe = require('../models/Recipe');
const sampleRecipes = require('../data/sampleRecipes');

// Seed endpoint (optional, call once)
const seedRecipes = async (req, res, next) => {
  try {
    await Recipe.deleteMany({});
    const created = await Recipe.insertMany(sampleRecipes);
    res.status(201).json({
      message: 'Sample recipes seeded',
      count: created.length
    });
  } catch (err) {
    next(err);
  }
};

const getRecipes = async (req, res, next) => {
  try {
    const {
      cuisine,
      isVegetarian,
      maxPrepTime,
      tags,
      ingredient,
      search
    } = req.query;

    const filter = {};

    if (cuisine) {
      filter.cuisine = new RegExp(`^${cuisine}$`, 'i');
    }

    if (typeof isVegetarian !== 'undefined') {
      if (isVegetarian === 'true' || isVegetarian === 'false') {
        filter.isVegetarian = isVegetarian === 'true';
      }
    }

    if (maxPrepTime) {
      const timeNum = Number(maxPrepTime);
      if (!Number.isNaN(timeNum)) {
        filter.prepTimeMinutes = { $lte: timeNum };
      }
    }

    if (tags) {
      const tagList = tags.split(',').map(t => t.trim());
      filter.tags = { $all: tagList };
    }

    if (ingredient) {
      filter.ingredients = { $elemMatch: { $regex: ingredient, $options: 'i' } };
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { ingredients: { $elemMatch: { $regex: search, $options: 'i' } } },
        { tags: { $elemMatch: { $regex: search, $options: 'i' } } }
      ];
    }

    const recipes = await Recipe.find(filter).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    next(err);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (err) {
    next(err);
  }
};

const createRecipe = async (req, res, next) => {
  try {
    const recipe = new Recipe(req.body);
    const saved = await recipe.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  seedRecipes,
  getRecipes,
  getRecipeById,
  createRecipe
};
