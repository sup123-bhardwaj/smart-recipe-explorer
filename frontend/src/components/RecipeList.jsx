import React from 'react';

const RecipeList = ({ recipes, onSelect, selectedId }) => {
  return (
    <div className="card recipe-list">
      <h3>Recipes ({recipes.length})</h3>
      {recipes.map(recipe => (
        <div
          key={recipe._id}
          className="recipe-item"
          style={{
            background:
              recipe._id === selectedId ? '#eff6ff' : 'transparent'
          }}
          onClick={() => onSelect(recipe)}
        >
          <div style={{ fontWeight: 600 }}>{recipe.name}</div>
          <div style={{ fontSize: 12, color: '#6b7280' }}>
            {recipe.cuisine} • {recipe.isVegetarian ? 'Veg' : 'Non-veg'} •{' '}
            {recipe.prepTimeMinutes} min
          </div>
          <div style={{ marginTop: 4 }}>
            {recipe.tags?.map(tag => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
      {recipes.length === 0 && <p>No recipes found.</p>}
    </div>
  );
};

export default RecipeList;