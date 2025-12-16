import React from 'react';

const RecipeDetail = ({ recipe, onSummarizeClick, onSuggestClick }) => {
  if (!recipe) {
    return (
      <div className="card">
        <h3>Recipe Detail</h3>
        <p>Select a recipe from the list.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>{recipe.name}</h3>
      <div style={{ fontSize: 14, color: '#4b5563', marginBottom: 8 }}>
        Cuisine: {recipe.cuisine} •{' '}
        {recipe.isVegetarian ? 'Vegetarian' : 'Non-vegetarian'} •{' '}
        {recipe.prepTimeMinutes} minutes • Difficulty: {recipe.difficulty}
      </div>

      <h4>Ingredients</h4>
      <ul>
        {recipe.ingredients?.map(ing => (
          <li key={ing}>{ing}</li>
        ))}
      </ul>

      <h4>Instructions</h4>
      <p style={{ whiteSpace: 'pre-wrap' }}>{recipe.instructions}</p>

      <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button className="button primary" onClick={onSummarizeClick}>
          Simplify instructions (AI)
        </button>
        <button className="button secondary" onClick={onSuggestClick}>
          Suggest recipe using these ingredients
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;