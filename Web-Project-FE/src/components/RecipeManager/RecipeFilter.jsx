import { useState } from 'react';

const RecipeFilter = ({ filters, availableOptions, onFilterChange, onClearFilters }) => {
  const [showAllergenDropdown, setShowAllergenDropdown] = useState(false);

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
    
    onFilterChange(newFilters);
  };

  const handleRemoveFilter = (filterType, value) => {
    console.log('Removing filter:', filterType, value);
    const newFilters = { ...filters };
    
    if (filterType === 'allergens') {
      newFilters.allergens = filters.allergens.filter(allergen => allergen !== value);
    } else {
      newFilters[filterType] = '';
    }
    
    console.log('New filters after removal:', newFilters);
    onFilterChange(newFilters);
  };

  const getAllergenColor = (allergen) => {
    const colors = {
      'Dairy': 'bg-red-100 text-red-800 border-red-200',
      'Gluten': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Peanuts': 'bg-orange-100 text-orange-800 border-orange-200',
      'Soy': 'bg-green-100 text-green-800 border-green-200',
      'Sesame': 'bg-purple-100 text-purple-800 border-purple-200',
      'Fish': 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors[allergen] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const hasActiveFilters = filters.country || filters.mainIngredient || filters.allergens.length > 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter Recipes</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            Clear All Filters
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
            {availableOptions.countries.map(country => (
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
            {availableOptions.mainIngredients.map(ingredient => (
              <option key={ingredient} value={ingredient}>
                {ingredient}
              </option>
            ))}
          </select>
        </div>

        {/* Allergen Filter - Dropdown Style */}
        <div className="relative">
          <label htmlFor="allergens" className="block text-sm font-medium text-gray-700 mb-2">
            Avoid Allergens
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowAllergenDropdown(!showAllergenDropdown)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-left bg-white flex items-center justify-between"
            >
              <span className="text-gray-700">
                {filters.allergens.length === 0 
                  ? 'Select Allergens to Avoid' 
                  : `${filters.allergens.length} selected`
                }
              </span>
              <svg 
                className={`w-4 h-4 text-gray-400 transition-transform ${showAllergenDropdown ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showAllergenDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                {availableOptions.allergens.map(allergen => (
                  <div
                    key={allergen}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                    onClick={() => {
                      handleFilterChange('allergens', allergen);
                    }}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.allergens.includes(allergen)}
                        onChange={() => {}} // Handled by parent div onClick
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 mr-2"
                      />
                      <span className="text-sm text-gray-700">{allergen}</span>
                    </div>
                    {filters.allergens.includes(allergen) && (
                      <span className="text-orange-500 text-xs">✓</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Selected Filters Tags */}
      {hasActiveFilters && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center mb-3">
            <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="text-sm font-semibold text-gray-800">Active Filters:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {/* Country Tag */}
            {filters.country && (
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                <span className="mr-2 text-base">🌍</span>
                <span className="font-semibold">{filters.country}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemoveFilter('country', filters.country);
                  }}
                  className="ml-3 text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded-full p-1 transition-all duration-200"
                  title="Remove country filter"
                >
                  ❌
                </button>
              </div>
            )}

            {/* Main Ingredient Tag */}
            {filters.mainIngredient && (
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-orange-100 text-orange-800 border-2 border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                <span className="mr-2 text-base">🥬</span>
                <span className="font-semibold">{filters.mainIngredient}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemoveFilter('mainIngredient', filters.mainIngredient);
                  }}
                  className="ml-3 text-orange-600 hover:text-orange-800 hover:bg-orange-200 rounded-full p-1 transition-all duration-200"
                  title="Remove main ingredient filter"
                >
                  ❌
                </button>
              </div>
            )}

            {/* Allergen Tags */}
            {filters.allergens.map(allergen => (
              <div
                key={allergen}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border-2 shadow-sm hover:shadow-md transition-shadow ${getAllergenColor(allergen)}`}
              >
                <span className="mr-2 text-base">⚠️</span>
                <span className="font-semibold">{allergen}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemoveFilter('allergens', allergen);
                  }}
                  className="ml-3 hover:opacity-70 hover:bg-black hover:bg-opacity-10 rounded-full p-1 transition-all duration-200"
                  title={`Remove ${allergen} filter`}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showAllergenDropdown && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowAllergenDropdown(false)}
        />
      )}
    </div>
  );
};

export default RecipeFilter;