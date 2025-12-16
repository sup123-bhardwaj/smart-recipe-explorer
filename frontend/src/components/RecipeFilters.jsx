import React from 'react';

const RecipeFilters = ({ filters, onChange, onSearch }) => {
  const handleChange = e => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  const handleVegetarianChange = e => {
    const value = e.target.value;
    onChange({ ...filters, isVegetarian: value });
  };

  return (
    <div className="card">
      <h3>Search & Filters</h3>
      <div className="filters-row">
        <input
          type="text"
          name="search"
          placeholder="Search by name, tag, ingredient..."
          value={filters.search}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cuisine"
          placeholder="Cuisine (e.g., Indian)"
          value={filters.cuisine}
          onChange={handleChange}
        />
        <select
          name="isVegetarian"
          value={filters.isVegetarian}
          onChange={handleVegetarianChange}
        >
          <option value="">All</option>
          <option value="true">Vegetarian</option>
          <option value="false">Non-vegetarian</option>
        </select>
        <input
          type="number"
          name="maxPrepTime"
          placeholder="Max prep time (min)"
          value={filters.maxPrepTime}
          onChange={handleChange}
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={filters.tags}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ingredient"
          placeholder="Must include ingredient"
          value={filters.ingredient}
          onChange={handleChange}
        />
        <button className="button primary" onClick={onSearch}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default RecipeFilters;