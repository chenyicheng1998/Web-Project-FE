const Recipe = require('../models/Recipe');

// 获取所有食谱
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({}).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: recipes.length,
      data: recipes
    });
  } catch (error) {
    console.error('Get all recipes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recipes',
      error: error.message
    });
  }
};

// 根据ID获取单个食谱
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    
    res.json({
      success: true,
      data: recipe
    });
  } catch (error) {
    console.error('Get recipe by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recipe',
      error: error.message
    });
  }
};

// 获取筛选选项
const getFilterOptions = async (req, res) => {
  try {
    const [countries, mainIngredients, allergens] = await Promise.all([
      Recipe.getCountries(),
      Recipe.getMainIngredients(),
      Recipe.getAllergens()
    ]);
    
    res.json({
      success: true,
      data: {
        countries: countries.sort(),
        mainIngredients: mainIngredients.sort(),
        allergens: allergens.sort()
      }
    });
  } catch (error) {
    console.error('Get filter options error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch filter options',
      error: error.message
    });
  }
};

// 筛选食谱
const filterRecipes = async (req, res) => {
  try {
    const { country, mainIngredient, allergens } = req.query;
    
    // 构建筛选条件
    const filters = {};
    
    if (country) {
      const countries = Array.isArray(country) ? country : [country];
      filters.country = { $in: countries };
    }
    
    if (mainIngredient) {
      const ingredients = Array.isArray(mainIngredient) ? mainIngredient : [mainIngredient];
      filters.mainIngredient = { $in: ingredients };
    }
    
    if (allergens) {
      const allergenList = Array.isArray(allergens) ? allergens : [allergens];
      filters.allergens = { $nin: allergenList }; // 排除包含指定过敏原的食谱
    }
    
    const recipes = await Recipe.find(filters).sort({ rating: -1, createdAt: -1 });
    
    res.json({
      success: true,
      count: recipes.length,
      filters: {
        country: country || null,
        mainIngredient: mainIngredient || null,
        allergens: allergens || null
      },
      data: recipes
    });
  } catch (error) {
    console.error('Filter recipes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to filter recipes',
      error: error.message
    });
  }
};

// 搜索食谱
const searchRecipes = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    
    if (!q || q.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const searchQuery = {
      $text: { $search: q.trim() }
    };
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [recipes, total] = await Promise.all([
      Recipe.find(searchQuery, { score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' } })
        .skip(skip)
        .limit(parseInt(limit)),
      Recipe.countDocuments(searchQuery)
    ]);
    
    res.json({
      success: true,
      count: recipes.length,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      query: q,
      data: recipes
    });
  } catch (error) {
    console.error('Search recipes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search recipes',
      error: error.message
    });
  }
};

// 创建新食谱
const createRecipe = async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    
    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: recipe
    });
  } catch (error) {
    console.error('Create recipe error:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create recipe',
      error: error.message
    });
  }
};

// 更新食谱
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Recipe updated successfully',
      data: recipe
    });
  } catch (error) {
    console.error('Update recipe error:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update recipe',
      error: error.message
    });
  }
};

// 删除食谱
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Recipe deleted successfully'
    });
  } catch (error) {
    console.error('Delete recipe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete recipe',
      error: error.message
    });
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  getFilterOptions,
  filterRecipes,
  searchRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe
};
