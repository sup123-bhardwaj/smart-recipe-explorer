const request = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config();

const app = require('../app');
const Recipe = require('../models/Recipe');
const sampleRecipes = require('../data/sampleRecipes');

describe('Recipe API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await Recipe.deleteMany({});
    await Recipe.insertMany(sampleRecipes);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return all recipes', async () => {
    const res = await request(app).get('/api/recipes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should filter by cuisine', async () => {
    const res = await request(app).get('/api/recipes?cuisine=Indian');
    expect(res.statusCode).toBe(200);
    expect(res.body.every(r => r.cuisine === 'Indian')).toBe(true);
  });

  it('should filter by vegetarian and max prep time', async () => {
    const res = await request(app).get(
      '/api/recipes?isVegetarian=true&maxPrepTime=35'
    );
    expect(res.statusCode).toBe(200);
    expect(
      res.body.every(
        r => r.isVegetarian === true && r.prepTimeMinutes <= 35
      )
    ).toBe(true);
  });
});
