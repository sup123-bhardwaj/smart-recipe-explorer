const axios = require('axios');

const HF_API_URL = 'https://api-inference.huggingface.co/models';

const buildClient = () => {
  const apiKey = process.env.HF_API_KEY;
  const modelId = process.env.HF_MODEL_ID || 'google/flan-t5-base';

  if (!apiKey) {
    throw new Error('HF_API_KEY not configured');
  }

  return {
    modelUrl: `${HF_API_URL}/${modelId}`,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  };
};

const callHF = async prompt => {
  const { modelUrl, headers } = buildClient();
  const response = await axios.post(
    modelUrl,
    {
      inputs: prompt,
      parameters: {
        max_new_tokens: 200,
        temperature: 0.6
      }
    },
    { headers }
  );

  const data = response.data;

  if (Array.isArray(data) && data[0]?.generated_text) {
    return data[0].generated_text;
  }

  if (typeof data[0] === 'string') {
    return data[0];
  }

  return JSON.stringify(data);
};

// POST /api/ai/summarize
const summarizeRecipe = async (req, res, next) => {
  try {
    const { name, instructions } = req.body;

    if (!instructions) {
      return res.status(400).json({ message: 'instructions is required' });
    }

    const prompt = `You are a helpful cooking assistant. Summarize and simplify the following recipe instructions in friendly, easy language in 4-6 short sentences. Recipe name: ${name || 'Recipe'}.\n\nInstructions:\n${instructions}`;

    const result = await callHF(prompt);

    res.json({
      mode: 'summarize',
      summary: result
    });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
};

// POST /api/ai/suggest
const suggestRecipe = async (req, res, next) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || !ingredients.length) {
      return res
        .status(400)
        .json({ message: 'ingredients (array) is required' });
    }

    const ingredientList = ingredients.join(', ');

    const prompt = `You are an expert chef. Suggest a simple recipe using ONLY the following ingredients if possible: ${ingredientList}. 
Return:
1) Recipe name
2) Short description
3) Ingredients list with approximate quantities
4) Step-by-step instructions (5-8 steps)
Keep it concise and friendly.`;

    const result = await callHF(prompt);

    res.json({
      mode: 'suggest',
      ingredients,
      suggestion: result
    });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
};

module.exports = {
  summarizeRecipe,
  suggestRecipe
};
