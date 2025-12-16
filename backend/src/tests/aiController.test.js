const request = require('supertest');
require('dotenv').config();

const app = require('../app');

describe('AI API', () => {
  it('should reject summarize without instructions', async () => {
    const res = await request(app).post('/api/ai/summarize').send({});
    expect(res.statusCode).toBe(400);
  });

  // Full call to HF would be integration-level and needs HF_API_KEY set.
  // You can run it manually during development.
});
