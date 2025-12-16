const API_BASE = '/api';

export const fetchRecipes = async params => {
  const searchParams = new URLSearchParams(params);
  const res = await fetch(`${API_BASE}/recipes?${searchParams.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch recipes');
  return res.json();
};

export const fetchRecipeById = async id => {
  const res = await fetch(`${API_BASE}/recipes/${id}`);
  if (!res.ok) throw new Error('Failed to fetch recipe');
  return res.json();
};

export const aiSummarize = async recipe => {
  const res = await fetch(`${API_BASE}/ai/summarize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: recipe.name,
      instructions: recipe.instructions
    })
  });
  if (!res.ok) throw new Error('Failed to summarize recipe');
  return res.json();
};

export const aiSuggest = async ingredients => {
  const res = await fetch(`${API_BASE}/ai/suggest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients })
  });
  if (!res.ok) throw new Error('Failed to get suggestion');
  return res.json();
};