import React, { useState } from 'react';

const AiAssistantPanel = ({
  selectedRecipe,
  aiState,
  onSuggestWithIngredients
}) => {
  const [ingredientInput, setIngredientInput] = useState('');

  const handleManualSuggest = () => {
    if (!ingredientInput.trim()) return;
    const ingredients = ingredientInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    onSuggestWithIngredients(ingredients);
  };

  return (
    <div className="card">
      <h3>AI Assistant</h3>
      <p style={{ fontSize: 13, color: '#6b7280' }}>
        Use AI to simplify recipe instructions or get recipe ideas from
        ingredients.
      </p>

      {selectedRecipe && (
        <>
          <h4>Last selected recipe summary</h4>
          {aiState.loading && <p>Loading...</p>}
          {!aiState.loading && aiState.summary && (
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13 }}>
              {aiState.summary}
            </pre>
          )}
        </>
      )}

      <hr style={{ margin: '12px 0' }} />

      <h4>Suggest a recipe from ingredients</h4>
      <p style={{ fontSize: 13, color: '#6b7280' }}>
        Enter ingredients (comma separated) or use the currently selected
        recipe&apos;s ingredients from the Detail panel.
      </p>
      <input
        type="text"
        placeholder="e.g. paneer, tomato, cream"
        style={{ width: '100%', marginBottom: 8 }}
        value={ingredientInput}
        onChange={e => setIngredientInput(e.target.value)}
      />
      <button className="button primary" onClick={handleManualSuggest}>
        Suggest using typed ingredients
      </button>

      {aiState.suggestion && (
        <>
          <h4 style={{ marginTop: 12 }}>Suggestion</h4>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13 }}>
            {aiState.suggestion}
          </pre>
        </>
      )}

      {aiState.error && (
        <p style={{ color: 'red', marginTop: 8 }}>{aiState.error}</p>
      )}
    </div>
  );
};

export default AiAssistantPanel;
