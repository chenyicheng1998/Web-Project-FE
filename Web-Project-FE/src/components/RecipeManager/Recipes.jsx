import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import RecipeFilter from "./RecipeFilter";
import { recipes, filterRecipes, getFilterOptions } from "../../data/recipes";
import "./RecipeCard.css";

function Recipes() {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [filters, setFilters] = useState({
    country: '',
    mainIngredient: '',
    allergens: []
  });
  const [availableOptions, setAvailableOptions] = useState({
    countries: [],
    mainIngredients: [],
    allergens: []
  });
  const [loading, setLoading] = useState(false);

  // Get filter options from static data
  useEffect(() => {
    const options = getFilterOptions();
    setAvailableOptions(options);
  }, []);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setLoading(true);
    
    // Use debouncing to avoid frequent filtering
    const timeoutId = setTimeout(() => {
      const filtered = filterRecipes(recipes, newFilters);
      setFilteredRecipes(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      country: '',
      mainIngredient: '',
      allergens: []
    };
    setFilters(clearedFilters);
    handleFilterChange(clearedFilters);
  };

  // Loading state
  if (loading && filteredRecipes.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">All Recipes</h1>
        <RecipeFilter 
          filters={filters}
          availableOptions={availableOptions}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
        <div className="recipe-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden h-96">
              <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-4 h-48">
                <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="flex justify-between">
                  <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">All Recipes</h1>

      {/* Filter Component */}
      <RecipeFilter 
        filters={filters}
        availableOptions={availableOptions}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Filter Results Statistics */}
      <div className="mb-6">
        <p className="text-gray-600">
          Found <span className="font-semibold text-orange-600">{filteredRecipes.length}</span> recipes
          {filteredRecipes.length !== recipes.length && (
            <span className="text-sm text-gray-500 ml-2">
              (out of {recipes.length} total recipes)
            </span>
          )}
        </p>
      </div>

      {/* Recipe List */}
      <div className="recipe-grid">
        {filteredRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {/* Empty State */}
      {filteredRecipes.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="mb-4">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found matching your criteria</h3>
          <p className="text-gray-500 mb-4">Try adjusting your filters or clear all filters to see all recipes</p>
          <button
            onClick={handleClearFilters}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default Recipes;