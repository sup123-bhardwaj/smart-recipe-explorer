import React, { useEffect, useState } from 'react';
import {
  fetchRecipes,
  aiSummarize,
  aiSuggest
} from './api/client';
import RecipeFilters from './components/RecipeFilters';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import AiAssistantPanel from './components/AiAssistantPanel';

const App = () => {
  const [filters, setFilters] = useState({
    search: '',
    cuisine: '',
    isVegetarian: '',
    maxPrepTime: '',
    tags: '',
    ingredient: ''
  });

  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loadingRecipes, setLoadingRecipes] = useState(false);

  const [aiState, setAiState] = useState({
    loading: false,
    summary: '',
    suggestion: '',
    error: ''
  });

  const loadRecipes = async () => {
    try {
      setLoadingRecipes(true);
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.cuisine) params.cuisine = filters.cuisine;
      if (filters.isVegetarian) params.isVegetarian = filters.isVegetarian;
      if (filters.maxPrepTime) params.maxPrepTime = filters.maxPrepTime;
      if (filters.tags) params.tags = filters.tags;
      if (filters.ingredient) params.ingredient = filters.ingredient;

      const data = await fetchRecipes(params);
      setRecipes(data);
      if (data.length && !selectedRecipe) {
        setSelectedRecipe(data[0]);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to load recipes');
    } finally {
      setLoadingRecipes(false);
    }
  };

  useEffect(() => {
    loadRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectRecipe = recipe => {
    setSelectedRecipe(recipe);
    setAiState(prev => ({ ...prev, summary: '', error: '' }));
  };

  const handleSummarize = async () => {
    if (!selectedRecipe) return;
    try {
      setAiState(prev => ({
        ...prev,
        loading: true,
        error: '',
        summary: ''
      }));
      const res = await aiSummarize(selectedRecipe);
      setAiState(prev => ({
        ...prev,
        loading: false,
        summary: res.summary
      }));
    } catch (err) {
      console.error(err);
      setAiState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to get summary'
      }));
    }
  };

  const handleSuggestFromSelected = async () => {
    if (!selectedRecipe) return;
    const ingredients = selectedRecipe.ingredients || [];
    handleSuggestWithIngredients(ingredients);
  };

  const handleSuggestWithIngredients = async ingredients => {
    try {
      setAiState(prev => ({
        ...prev,
        loading: true,
        error: '',
        suggestion: ''
      }));
      const res = await aiSuggest(ingredients);
      setAiState(prev => ({
        ...prev,
        loading: false,
        suggestion: res.suggestion
      }));
    } catch (err) {
      console.error(err);
      setAiState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to get suggestion'
      }));
    }
  };

  return (
    <div className="app-container">
      <h2>Smart Recipe Explorer with AI Assistance</h2>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>
        MERN stack demo with search, filters, and Generative AI integration
        using a free HuggingFace API.
      </p>

      <RecipeFilters
        filters={filters}
        onChange={setFilters}
        onSearch={loadRecipes}
      />

      {loadingRecipes && <p>Loading recipes...</p>}

      <div className="layout">
        <div>
          <RecipeList
            recipes={recipes}
            onSelect={handleSelectRecipe}
            selectedId={selectedRecipe?._id}
          />
          <RecipeDetail
            recipe={selectedRecipe}
            onSummarizeClick={handleSummarize}
            onSuggestClick={handleSuggestFromSelected}
          />
        </div>
        <div>
          <AiAssistantPanel
            selectedRecipe={selectedRecipe}
            aiState={aiState}
            onSuggestWithIngredients={handleSuggestWithIngredients}
          />
        </div>
      </div>
    </div>
  );
};

export default App;