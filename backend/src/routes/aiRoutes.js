const express = require('express');
const {
  summarizeRecipe,
  suggestRecipe
} = require('../controllers/aiController');

const router = express.Router();

router.post('/summarize', summarizeRecipe);
router.post('/suggest', suggestRecipe);

module.exports = router;
