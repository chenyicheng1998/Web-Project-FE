// components/RecipeDetail.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams(); // 获取URL中的ID参数
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/recipes/${id}`);

        if (!response.ok) {
          throw new Error('Recipe not found');
        }

        const recipeData = await response.json();
        setRecipe(recipeData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Recipe not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* 主图 */}
      <div className="mb-6">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-80 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* 标题 */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">{recipe.title}</h1>



      {/* 描述 */}
      <p className="text-gray-700 text-lg mb-8 text-center italic border-l-4 border-orange-400 pl-4 py-2">
        {recipe.description}
      </p>

      {/* 烹饪时间 */}
      <div className="flex justify-start items-center text-gray-600 mb-8">
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-lg">{recipe.cookTime}</span>
      </div>

      {/* 食材 */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ingredients</h2>
        <ul className="flex flex-col gap-3">
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-700">{ingredient}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 烹饪步骤 */}
      {recipe.instructions && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Steps</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 leading-7">
              {recipe.instructions.join(' ')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeDetail;