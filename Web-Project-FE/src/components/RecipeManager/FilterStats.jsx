import { recipes, getFilterOptions } from '../../data/recipes';

const FilterStats = () => {
  const filterOptions = getFilterOptions();
  const totalRecipes = recipes.length;

  // Count recipes for each option
  const getCountryStats = () => {
    const stats = {};
    filterOptions.countries.forEach(country => {
      stats[country] = recipes.filter(recipe => recipe.country === country).length;
    });
    return stats;
  };

  const getIngredientStats = () => {
    const stats = {};
    filterOptions.mainIngredients.forEach(ingredient => {
      stats[ingredient] = recipes.filter(recipe => recipe.mainIngredient === ingredient).length;
    });
    return stats;
  };

  const getAllergenStats = () => {
    const stats = {};
    filterOptions.allergens.forEach(allergen => {
      stats[allergen] = recipes.filter(recipe => recipe.allergens.includes(allergen)).length;
    });
    return stats;
  };

  const countryStats = getCountryStats();
  const ingredientStats = getIngredientStats();
  const allergenStats = getAllergenStats();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Options Statistics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Country Statistics */}
        <div>
          <h4 className="font-medium text-gray-700 mb-3">🌍 Countries/Regions ({filterOptions.countries.length})</h4>
          <div className="space-y-2">
            {filterOptions.countries.map(country => (
              <div key={country} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{country}</span>
                <span className="text-sm font-medium text-orange-600">
                  {countryStats[country]} recipes
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Ingredient Statistics */}
        <div>
          <h4 className="font-medium text-gray-700 mb-3">🥬 Main Ingredients ({filterOptions.mainIngredients.length})</h4>
          <div className="space-y-2">
            {filterOptions.mainIngredients.map(ingredient => (
              <div key={ingredient} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{ingredient}</span>
                <span className="text-sm font-medium text-green-600">
                  {ingredientStats[ingredient]} recipes
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Allergen Statistics */}
        <div>
          <h4 className="font-medium text-gray-700 mb-3">⚠️ Allergens ({filterOptions.allergens.length})</h4>
          <div className="space-y-2">
            {filterOptions.allergens.map(allergen => (
              <div key={allergen} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{allergen}</span>
                <span className="text-sm font-medium text-red-600">
                  {allergenStats[allergen]} recipes
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Total Statistics */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total Recipes</span>
          <span className="text-lg font-semibold text-orange-600">{totalRecipes} recipes</span>
        </div>
      </div>
    </div>
  );
};

export default FilterStats;