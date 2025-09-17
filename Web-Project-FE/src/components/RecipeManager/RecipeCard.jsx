import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

function RecipeCard({ recipe }) {
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);

  // 添加 useEffect 来获取初始收藏状态
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        // 从用户信息或单独 API 获取收藏状态
        const response = await fetch('http://localhost:5001/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          const isBookmarked = userData.data.bookmarkedRecipes?.includes(recipe._id);
          setIsBookmarkedState(isBookmarked);
        }
      } catch (error) {
        console.error('Check bookmark status error:', error);
      }
    };

    checkBookmarkStatus();
  }, [recipe._id]);

  // 修改 handleBookmarkToggle 函数
  const handleBookmarkToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to bookmark recipes');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/recipes/${recipe._id}/bookmark`, {
        method: 'PATCH', // 改为 PATCH 方法
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setIsBookmarkedState(data.isBookmarked);
      } else {
        alert(data.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Bookmark toggle error:', error);
      alert('Network error, please try again');
    }
  };



  // Get allergen label colors
  const getAllergenColor = (allergen) => {
    const colors = {
      'Gluten': 'bg-red-100 text-red-800',
      'Dairy': 'bg-blue-100 text-blue-800',
      'Eggs': 'bg-yellow-100 text-yellow-800',
      'Soy': 'bg-green-100 text-green-800',
      'Peanuts': 'bg-orange-100 text-orange-800',
      'Fish': 'bg-purple-100 text-purple-800',
      'Sesame': 'bg-pink-100 text-pink-800'
    };
    return colors[allergen] || 'bg-gray-100 text-gray-800';
  };

  // Get country flag
  const getCountryFlag = (country) => {
    const flags = {
      'Italy': '🇮🇹',
      'Turkey': '🇹🇷',
      'Korea': '🇰🇷',
      'Vietnam': '🇻🇳',
      'Japan': '🇯🇵',
      'China': '🇨🇳'
    };
    return flags[country] || '🌍';
  };

  if (!recipe) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse h-96">
        <div className="w-full h-48 bg-gray-200"></div>
        <div className="p-4 h-48">
          <div className="h-6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-3"></div>
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="flex justify-between">
            <div className="h-5 w-5 bg-gray-200 rounded"></div>
            <div className="h-10 w-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link to={`/recipes/${recipe._id}`} className="block h-full">
      <div className="recipe-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
        {/* Recipe Image */}
        <div className="relative w-full h-48 bg-gray-200 overflow-hidden flex-shrink-0">
          {recipe.image ? (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
              <div className="text-center">
                <div className="text-4xl mb-2">{getCountryFlag(recipe.country)}</div>
                <div className="text-orange-600 font-medium">{recipe.country}</div>
              </div>
            </div>
          )}

          {/* Bookmark Button */}
          <button
            onClick={handleBookmarkToggle}
            className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all duration-200"
          >
            <svg
              className={`w-5 h-5 ${isBookmarkedState ? 'text-red-500 fill-current' : 'text-gray-400'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>

          {/* Rating */}
          <div className="absolute bottom-3 left-3 bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">{recipe.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Recipe Information */}
        <div className="card-content p-4">
          {/* Title and Country */}
          <div className="mb-2">
            <h3 className="recipe-title text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
              {recipe.title}
            </h3>
            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-500">{getCountryFlag(recipe.country)} {recipe.country}</span>
            </div>
          </div>

          {/* Description */}
          <p className="recipe-description text-gray-600 text-sm line-clamp-2 mb-3">
            {recipe.description}
          </p>

          {/* Main Ingredient */}
          <div className="mb-3">
            <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
              🥬 {recipe.mainIngredient}
            </span>
          </div>

          {/* Allergen Tags */}
          {recipe.allergens && recipe.allergens.length > 0 && (
            <div className="allergen-section mb-3">
              <div className="flex flex-wrap gap-1">
                {recipe.allergens.slice(0, 3).map((allergen, index) => (
                  <span
                    key={index}
                    className={`inline-block text-xs px-2 py-1 rounded-full ${getAllergenColor(allergen)}`}
                  >
                    ⚠️ {allergen}
                  </span>
                ))}
                {recipe.allergens.length > 3 && (
                  <span className="inline-block text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                    +{recipe.allergens.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Bottom Information */}
          <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{recipe.cookTime}</span>
            </div>
            <div className="text-orange-600 font-medium">
              View Details →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;