import { useState } from "react";
import { Link } from "react-router-dom";

export const mockRecipes = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    title: "Classic Spaghetti Carbonara",
    rating: 4.7,
    cookTime: "25 mins",
    description: "Creamy Italian pasta dish with eggs, cheese, and pancetta",
    isBookmarked: false
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
    title: "Vegetable Stir Fry",
    rating: 4.3,
    cookTime: "15 mins",
    description: "Healthy and colorful vegetable medley with soy sauce glaze",
    isBookmarked: true
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop",
    title: "Chocolate Chip Cookies",
    rating: 4.9,
    cookTime: "35 mins",
    description: "Soft and chewy cookies with melted chocolate chips",
    isBookmarked: false
  }
];




function RecipeCard({ recipe }) {
  const recipeData = recipe || mockRecipes[0];


  const {
    id = "",
    image = "",
    title = "Recipe Title",
    rating = 0,
    cookTime = "0 mins",
    description = "No description available",
    isBookmarked = false
  } = recipeData || {};

  const [isBookmarkedState, setIsBookmarkedState] = useState(isBookmarked);

  // 处理收藏点击
  // const handleBookmarkClick = async () => {
  //   try {
  //     const newBookmarkState = !isBookmarkedState;

  //     // 发送请求到后端更新收藏状态
  //     const response = await fetch(`http://your-backend-url/api/recipes/${id}/bookmark`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  //       },
  //       body: JSON.stringify({ bookmarked: newBookmarkState })
  //     });

  //     if (response.ok) {
  //       setIsBookmarkedState(newBookmarkState);
  //     } else {
  //       console.error('Failed to update bookmark');
  //     }
  //   } catch (error) {
  //     console.error('Error updating bookmark:', error);
  //   }
  // };
  // 处理收藏点击 - 改为前端模拟，移除后端调用
  const handleBookmarkClick = () => {
    setIsBookmarkedState(!isBookmarkedState);
    console.log(`Recipe ${id} bookmarked: ${!isBookmarkedState}`);
  };

  // 处理分享点击
  const handleShareClick = () => {
    navigator.clipboard.writeText(`${window.location.origin}/recipe/${id}`);
    alert('Link copied to clipboard!');
  };

  // 渲染评分星星
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* 图片区域 */}
      <div className="relative">
        <img
          src={image}
          alt={title}
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
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{title}</h3>
          <div className="flex items-center mt-1">
            <div className="flex text-sm">
              {renderStars()}
            </div>
            <span className="text-sm text-gray-500 ml-1">({rating})</span>
          </div>
        </div>

        {/* 烹饪时间 */}
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{cookTime}</span>
        </div>

        {/* 简介 */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
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
            to={`/recipe/${id}`}
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