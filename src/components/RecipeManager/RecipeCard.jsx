import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function RecipeCard({ recipeId }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);

  // 从后端获取菜谱数据
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/recipes/${recipeId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const recipeData = await response.json();
        setRecipe(recipeData);
        setIsBookmarkedState(recipeData.isBookmarked || false);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching recipe:', err);
      } finally {
        setLoading(false);
      }
    };
    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId]);

  // 处理收藏点击
  const handleBookmarkClick = async () => {
    try {
      const newBookmarkState = !isBookmarkedState;

      // 发送请求到后端更新收藏状态
      const response = await fetch(`http://localhost:5000/api/recipes/${recipeId}/bookmark`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ bookmarked: newBookmarkState })
      });

      if (response.ok) {
        setIsBookmarkedState(newBookmarkState);
      } else {
        console.error('Failed to update bookmark');
      }
    } catch (error) {
      console.error('Error updating bookmark:', error);
    }
  };

  // 处理分享点击
  const handleShareClick = () => {
    navigator.clipboard.writeText(`${window.location.origin}/recipes/${recipeId}`);
    alert('Link copied to clipboard!');
  };

  // 渲染评分星星
  const renderStars = () => {
    if (!recipe) return null;

    const stars = [];
    const fullStars = Math.floor(recipe.rating);
    const hasHalfStar = recipe.rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span key={i} className="text-yellow-400">★</span>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <span key={i} className="text-yellow-400">☆</span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">☆</span>
        );
      }
    }
    return stars;
  };
  // 加载状态
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
    );
  }
  // 错误状态
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 text-center">
        <p className="text-red-500">Failed to load recipe: {error}</p>
      </div>
    );
  }
  // 如果没有获取到菜谱数据
  if (!recipe) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 text-center">
        <p>Recipe not found</p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* 图片区域 */}
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />

        {/* 分享按钮 - 右上角 */}
        <button
          onClick={handleShareClick}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
          aria-label="Share recipe"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>

      {/* 内容区域 */}
      <div className="p-4">
        {/* 标题和评分 */}
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{recipe.title}</h3>
          <div className="flex items-center mt-1">
            <div className="flex text-sm">
              {renderStars()}
            </div>
            <span className="text-sm text-gray-500 ml-1">({recipe.rating})</span>
          </div>
        </div>

        {/* 烹饪时间 */}
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{recipe.cookTime}</span>
        </div>

        {/* 简介 */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {recipe.description}
        </p>

        {/* 底部按钮区域 */}
        <div className="flex justify-between items-center">
          {/* 收藏按钮 - 左下角 */}
          <button
            onClick={handleBookmarkClick}
            className="flex items-center text-sm text-gray-600 hover:text-red-500 transition-colors duration-200"
            aria-label={isBookmarkedState ? "Remove from bookmarks" : "Add to bookmarks"}
          >
            {isBookmarkedState ? (
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
          </button>

          {/* 查看详情按钮 - 右下角 */}
          <Link
            to={`/recipe/${recipeId}`}
            className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-md transition-colors duration-200 flex items-center justify-center"
            aria-label="View recipe details"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;