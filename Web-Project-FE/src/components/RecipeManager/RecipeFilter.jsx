import { useState, useEffect } from 'react';
import { getFilterOptions } from '../../data/recipes';

const RecipeFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    country: '',
    mainIngredient: '',
    allergens: []
  });

  const [filterOptions, setFilterOptions] = useState({
    countries: [],
    mainIngredients: [],
    allergens: []
  });

  useEffect(() => {
    // Get filter options
    const options = getFilterOptions();
    setFilterOptions(options);
  }, []);

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters };
    
    if (filterType === 'allergens') {
      // Handle allergen multi-select
      if (filters.allergens.includes(value)) {
        newFilters.allergens = filters.allergens.filter(allergen => allergen !== value);
      } else {
        newFilters.allergens = [...filters.allergens, value];
      }
    } else {
      // Handle single select
      newFilters[filterType] = value;
    }
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      country: '',
      mainIngredient: '',
      allergens: []
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = filters.country || filters.mainIngredient || filters.allergens.length > 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter Recipes</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Country/Region Filter */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
            Country/Region
          </label>
          <select
            id="country"
            value={filters.country}
            onChange={(e) => handleFilterChange('country', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">All Countries/Regions</option>
            {filterOptions.countries.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Main Ingredient Filter */}
        <div>
          <label htmlFor="mainIngredient" className="block text-sm font-medium text-gray-700 mb-2">
            Main Ingredient
          </label>
          <select
            id="mainIngredient"
            value={filters.mainIngredient}
            onChange={(e) => handleFilterChange('mainIngredient', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">All Main Ingredients</option>
            {filterOptions.mainIngredients.map(ingredient => (
              <option key={ingredient} value={ingredient}>
                {ingredient}
              </option>
            ))}
          </select>
        </div>

        {/* Allergen Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Avoid Allergens
          </label>
          <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
            {filterOptions.allergens.map(allergen => (
              <label key={allergen} className="flex items-center space-x-2 py-1">
                <input
                  type="checkbox"
                  checked={filters.allergens.includes(allergen)}
                  onChange={() => handleFilterChange('allergens', allergen)}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">{allergen}</span>
              </label>
            ))}
          </div>
          {filters.allergens.length > 0 && (
            <div className="mt-2">
              <span className="text-xs text-gray-500">
                Selected: {filters.allergens.join(', ')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Filter Results Summary */}
      {hasActiveFilters && (
        <div className="mt-4 p-3 bg-orange-50 rounded-md">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="text-sm text-orange-800">
              Current filters: 
              {filters.country && ` Country: ${filters.country}`}
              {filters.mainIngredient && ` Main Ingredient: ${filters.mainIngredient}`}
              {filters.allergens.length > 0 && ` Avoid Allergens: ${filters.allergens.join(', ')}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeFilter;