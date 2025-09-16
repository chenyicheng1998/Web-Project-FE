import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

function Recipes() {
  const [recipeIds, setRecipeIds] = useState([]);
  const [filters, setFilters] = useState({
    country: [],
    mainIngredient: [],
    allergen: []
  });
  const [availableOptions, setAvailableOptions] = useState({
    countries: [],
    mainIngredients: [],
    allergens: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  // 获取筛选选项
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/recipes/filter-options');
        const data = await response.json();
        setAvailableOptions(data);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };
    fetchFilterOptions();
  }, []);

  // 根据筛选条件获取菜谱
  useEffect(() => {
    const fetchFilteredRecipes = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();

        // 处理多选参数
        if (filters.country.length > 0) {
          filters.country.forEach(country => {
            params.append('country', country);
          });
        }

        if (filters.mainIngredient.length > 0) {
          filters.mainIngredient.forEach(ingredient => {
            params.append('mainIngredient', ingredient);
          });
        }

        if (filters.allergen.length > 0) {
          filters.allergen.forEach(allergen => {
            params.append('excludeAllergen', allergen);
          });
        }

        const response = await fetch(`http://localhost:5000/api/recipes?${params}`);
        const recipes = await response.json();
        setRecipeIds(recipes.map(recipe => recipe.id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchFilteredRecipes, 300);
    return () => clearTimeout(timeoutId);
  }, [filters]);




  // 筛选组件
  const FilterSection = () => {
    const [openDropdown, setOpenDropdown] = useState(null);

    // 切换下拉菜单
    const toggleDropdown = (dropdownName) => {
      setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };

    // 处理选项选择
    const handleOptionSelect = (type, value) => {
      setFilters(prev => {
        const currentValues = prev[type];
        if (currentValues.includes(value)) {
          return {
            ...prev,
            [type]: currentValues.filter(item => item !== value)
          };
        } else {
          return {
            ...prev,
            [type]: [...currentValues, value]
          };
        }
      });
    };

    return (
      <div className="bg-white p-6 rounded-lg mb-6">
        {/* 筛选条件横排 */}
        <div className="flex flex-wrap gap-4 items-start">
          {/* 国家筛选 */}
          <div className="relative flex-1 min-w-[200px]">
            <button
              onClick={() => toggleDropdown('country')}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-gray-400 transition-colors"
            >
              <span className="text-gray-700">
                Country/Region {filters.country.length > 0 && `(${filters.country.length})`}
              </span>
              <svg
                className={`w-4 h-4 transform transition-transform ${openDropdown === 'country' ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {openDropdown === 'country' && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                <div className="p-2">
                  {availableOptions.countries.map(country => (
                    <label key={country} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.country.includes(country)}
                        onChange={() => handleOptionSelect('country', country)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{country}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 主食材筛选 */}
          <div className="relative flex-1 min-w-[200px]">
            <button
              onClick={() => toggleDropdown('mainIngredient')}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-gray-400 transition-colors"
            >
              <span className="text-gray-700">
                Main Ingredient {filters.mainIngredient.length > 0 && `(${filters.mainIngredient.length})`}
              </span>
              <svg
                className={`w-4 h-4 transform transition-transform ${openDropdown === 'mainIngredient' ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {openDropdown === 'mainIngredient' && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                <div className="p-2">
                  {availableOptions.mainIngredients.map(ingredient => (
                    <label key={ingredient} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.mainIngredient.includes(ingredient)}
                        onChange={() => handleOptionSelect('mainIngredient', ingredient)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{ingredient}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 过敏原筛选 */}
          <div className="relative flex-1 min-w-[200px]">
            <button
              onClick={() => toggleDropdown('allergen')}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-gray-400 transition-colors"
            >
              <span className="text-gray-700">
                Eliminate Allergens {filters.allergen.length > 0 && `(${filters.allergen.length})`}
              </span>
              <svg
                className={`w-4 h-4 transform transition-transform ${openDropdown === 'allergen' ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {openDropdown === 'allergen' && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                <div className="p-2">
                  {availableOptions.allergens.map(allergen => (
                    <label key={allergen} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.allergen.includes(allergen)}
                        onChange={() => handleOptionSelect('allergen', allergen)}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Free of {allergen}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 显示已选条件 */}
        {(filters.country.length > 0 || filters.mainIngredient.length > 0 || filters.allergen.length > 0) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {/* 国家条件标签 */}
              {filters.country.map(country => (
                <span
                  key={`country-${country}`}
                  className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 text-sm rounded-full border border-blue-200"
                >
                  <span className="text-xs text-blue-600 mr-1">🌎</span>
                  {country}
                  <button
                    onClick={() => handleOptionSelect('country', country)}
                    className="ml-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    ×
                  </button>
                </span>
              ))}

              {/* 主食材条件标签 */}
              {filters.mainIngredient.map(ingredient => (
                <span
                  key={`ingredient-${ingredient}`}
                  className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-800 text-sm rounded-full border border-green-200"
                >
                  <span className="text-xs text-green-600 mr-1">🥬</span>
                  {ingredient}
                  <button
                    onClick={() => handleOptionSelect('mainIngredient', ingredient)}
                    className="ml-2 text-green-600 hover:text-green-800 text-sm"
                  >
                    ×
                  </button>
                </span>
              ))}

              {/* 过敏原条件标签 */}
              {filters.allergen.map(allergen => (
                <span
                  key={`allergen-${allergen}`}
                  className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-800 text-sm rounded-full border border-red-200"
                >
                  <span className="text-xs text-red-600 mr-1">⚠️</span>
                  Free of {allergen}
                  <button
                    onClick={() => handleOptionSelect('allergen', allergen)}
                    className="ml-2 text-red-600 hover:text-red-800 text-sm"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };


  // 加载状态
  if (loading && recipeIds.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">All Recepies</h1>
        <FilterSection />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-4">
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

  // 错误状态
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">All Recepies</h1>
        <FilterSection />
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Loading Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">All Recepies</h1>

      {/* 筛选组件 */}
      <FilterSection />

      {/* 食谱列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipeIds.map(recipeId => (
          <RecipeCard key={recipeId} recipeId={recipeId} />
        ))}
      </div>

      {/* 空状态 */}
      {recipeIds.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No recipe that met the requirements was found.</p>
        </div>
      )}
    </div>
  );
}

export default Recipes;