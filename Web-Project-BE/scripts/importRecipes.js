const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('../models/Recipe');

// 加载环境变量
dotenv.config();

// 食谱数据
const recipesData = [
  {
    title: "Vietnamese Beef Pho",
    image: "/src/assets/pho receipe.png",
    description: "A deeply aromatic and flavorful Vietnamese noodle soup consisting of a slow-simmered beef broth, tender beef slices, and fresh herbs.",
    country: "Vietnam",
    mainIngredient: "Beef",
    allergens: ["Gluten", "Fish"],
    cookTime: "3 - 8 hours",
    rating: 4.8,
    isBookmarked: false,
    ingredients: [
      { id: "1", name: "Beef bones (marrow or neck)", quantity: "2-3 kg" },
      { id: "2", name: "Beef brisket or flank steak", quantity: "1-1.5 kg" },
      { id: "3", name: "Ginger", quantity: "2 large pieces" },
      { id: "4", name: "Yellow onions", quantity: "2 large" },
      { id: "5", name: "Star anise", quantity: "6-10" },
      { id: "6", name: "Cinnamon sticks", quantity: "2-3" },
      { id: "7", name: "Black cardamom pods", quantity: "2-3" },
      { id: "8", name: "Coriander seeds", quantity: "1 tbsp" },
      { id: "9", name: "Cloves", quantity: "3-6" },
      { id: "10", name: "Fish sauce", quantity: "to taste" },
      { id: "11", name: "Rock sugar or regular sugar", quantity: "to taste" },
      { id: "12", name: "Flat rice noodles", quantity: "200-250g per serving" },
      { id: "13", name: "Raw eye of round steak (thinly sliced)", quantity: "100g per serving" },
      { id: "14", name: "Fresh herbs (Thai basil, mint, cilantro)", quantity: "for garnish" },
      { id: "15", name: "Limes, sliced chilies, bean sprouts", quantity: "for garnish" }
    ],
    instructions: `
      <ul>
        <li>To make the broth, first parboil the beef bones and brisket for about 5-15 minutes to remove impurities, then rinse them clean.</li>
        <li>Char the onions and ginger on a grill or over a gas stove flame until they are slightly blackened and fragrant.</li>
        <li>In a dry skillet, toast the spices (star anise, cinnamon, cardamom, cloves, and coriander seeds) until fragrant.</li>
        <li>Combine the cleaned bones, brisket, charred aromatics, toasted spices, and water in a large stockpot.</li>
        <li>Bring to a boil, then reduce the heat to a gentle simmer. Cook for at least 3 hours, skimming any foam that rises to the top.</li>
        <li>Remove the brisket after it is tender (around 1.5-2 hours) and continue simmering the broth for a deeper flavor.</li>
        <li>Strain the broth, then season it with fish sauce, salt, and sugar to taste.</li>
        <li>To serve, prepare rice noodles per package instructions and place them in a bowl.</li>
        <li>Top the noodles with slices of the cooked brisket and thin, raw slices of eye of round steak.</li>
        <li>Ladle the boiling hot broth over the noodles and meat. The hot broth will cook the raw beef.</li>
        <li>Serve immediately with a plate of fresh herbs, bean sprouts, lime wedges, and sliced chilies on the side for each person to customize their bowl.</li>
      </ul>
    `,
    nutrition: {
      Calories: "562 kcal",
      Protein: "23 g",
      Carbohydrates: "104 g",
      Fat: "4.7 g"
    }
  },
  {
    title: "Authentic Turkish Döner Kebab (Homemade)",
    image: "/src/assets/Döner Kebab receipe.png",
    description: "An authentic recipe for homemade Turkish döner kebab, adapting the traditional method of layered meat for home cooking. The key is to create a dense, flavorful meat loaf that can be thinly sliced, just like the real deal.",
    country: "Turkey",
    mainIngredient: "Ground beef and/or lamb",
    allergens: ["Dairy", "Gluten"],
    cookTime: "5-6 hours (includes freezing time)",
    rating: 4.8,
    isBookmarked: false,
    ingredients: [
      { id: "1", name: "Ground beef or lamb (at least 15% fat)", quantity: "1 kg" },
      { id: "2", name: "Plain yogurt", quantity: "2 tbsp" },
      { id: "3", name: "Onion juice (from 1 grated large onion)", quantity: "to taste" },
      { id: "4", name: "Thyme (fresh or dried)", quantity: "1 tsp" },
      { id: "5", name: "Salt", quantity: "1 tsp" },
      { id: "6", name: "Black pepper", quantity: "1/2 tsp" },
      { id: "7", name: "Cumin", quantity: "1 tsp" },
      { id: "8", name: "Aleppo pepper flakes (or red pepper flakes)", quantity: "1 tsp" },
      { id: "9", name: "Pita bread, flatbread, or lavash", quantity: "for serving" },
      { id: "10", name: "Fresh vegetables (tomato, onion, lettuce)", quantity: "for serving" },
      { id: "11", name: "Sauces (yogurt, garlic, or spicy tomato)", quantity: "for serving" }
    ],
    instructions: `
      <h4>For the meat:</h4>
      <ul>
        <li>In a large bowl, combine the ground meat with yogurt, onion juice, thyme, salt, black pepper, cumin, and Aleppo pepper.</li>
        <li>Mix thoroughly with your hands until the mixture is well combined and slightly sticky.</li>
        <li>Line a loaf pan with plastic wrap, leaving enough overhang to cover the top.</li>
        <li>Press the meat mixture firmly into the pan, ensuring there are no air pockets.</li>
        <li>Cover with the overhanging plastic wrap and freeze for at least 4 hours or overnight.</li>
        <li>Preheat your oven to 180°C (350°F).</li>
        <li>Remove the meat from the pan and place it on a baking sheet.</li>
        <li>Bake for about 1.5-2 hours, or until the internal temperature reaches 75°C (165°F).</li>
        <li>Let it rest for 10-15 minutes before slicing thinly.</li>
      </ul>
      <h4>To serve:</h4>
      <ul>
        <li>Warm the pita bread or flatbread.</li>
        <li>Add the sliced döner meat.</li>
        <li>Top with fresh vegetables and your choice of sauce.</li>
        <li>Roll or fold and enjoy!</li>
      </ul>
    `,
    nutrition: {
      Calories: "420 kcal",
      Protein: "28 g",
      Carbohydrates: "35 g",
      Fat: "18 g"
    }
  },
  {
    title: "Korean Bulgogi (불고기)",
    image: "/src/assets/bulgogi receipe.png",
    description: "Korean Bulgogi is a classic Korean dish of thinly sliced, marinated beef that's grilled or stir-fried. The name 'bulgogi' literally means 'fire meat' and refers to the traditional method of cooking over an open flame.",
    country: "South Korea",
    mainIngredient: "Beef",
    allergens: ["Soy", "Sesame"],
    cookTime: "30 minutes (plus marinating time)",
    rating: 4.9,
    isBookmarked: false,
    ingredients: [
      { id: "1", name: "Beef sirloin or ribeye (thinly sliced)", quantity: "500g" },
      { id: "2", name: "Soy sauce", quantity: "1/4 cup" },
      { id: "3", name: "Brown sugar", quantity: "2 tbsp" },
      { id: "4", name: "Sesame oil", quantity: "1 tbsp" },
      { id: "5", name: "Garlic (minced)", quantity: "3 cloves" },
      { id: "6", name: "Ginger (grated)", quantity: "1 tsp" },
      { id: "7", name: "Asian pear or apple (grated)", quantity: "1/4 cup" },
      { id: "8", name: "Green onions (chopped)", quantity: "2 stalks" },
      { id: "9", name: "Black pepper", quantity: "1/2 tsp" },
      { id: "10", name: "Sesame seeds", quantity: "1 tbsp" },
      { id: "11", name: "Vegetable oil", quantity: "1 tbsp" }
    ],
    instructions: `
      <ul>
        <li>In a large bowl, combine soy sauce, brown sugar, sesame oil, garlic, ginger, and grated pear.</li>
        <li>Add the thinly sliced beef and mix well to ensure all pieces are coated with the marinade.</li>
        <li>Cover and marinate in the refrigerator for at least 30 minutes, or up to 24 hours for maximum flavor.</li>
        <li>Heat a large skillet or wok over high heat and add vegetable oil.</li>
        <li>Add the marinated beef and cook for 2-3 minutes per side, or until cooked through.</li>
        <li>Garnish with chopped green onions and sesame seeds.</li>
        <li>Serve immediately with steamed rice and Korean side dishes (banchan).</li>
      </ul>
    `,
    nutrition: {
      Calories: "280 kcal",
      Protein: "25 g",
      Carbohydrates: "12 g",
      Fat: "14 g"
    }
  },
  {
    title: "Kung Pao Chicken (宫保鸡丁)",
    image: "/src/assets/kungpao receipe.png",
    description: "Kung Pao Chicken is a classic Sichuan dish known for its bold flavors, combining tender chicken with peanuts, vegetables, and a spicy-sweet sauce. The dish gets its name from Ding Baozhen, a Qing Dynasty official who loved this dish.",
    country: "China",
    mainIngredient: "Chicken",
    allergens: ["Peanuts", "Soy"],
    cookTime: "20 minutes",
    rating: 4.7,
    isBookmarked: false,
    ingredients: [
      { id: "1", name: "Chicken breast (diced)", quantity: "500g" },
      { id: "2", name: "Soy sauce", quantity: "2 tbsp" },
      { id: "3", name: "Shaoxing wine or dry sherry", quantity: "1 tbsp" },
      { id: "4", name: "Cornstarch", quantity: "1 tsp" },
      { id: "5", name: "Vegetable oil", quantity: "3 tbsp" },
      { id: "6", name: "Dried red chilies", quantity: "8-10" },
      { id: "7", name: "Sichuan peppercorns", quantity: "1 tsp" },
      { id: "8", name: "Garlic (minced)", quantity: "3 cloves" },
      { id: "9", name: "Ginger (minced)", quantity: "1 tsp" },
      { id: "10", name: "Roasted peanuts", quantity: "1/2 cup" },
      { id: "11", name: "Green onions (chopped)", quantity: "2 stalks" },
      { id: "12", name: "Bell peppers (diced)", quantity: "1 medium" },
      { id: "13", name: "Hoisin sauce", quantity: "1 tbsp" },
      { id: "14", name: "Rice vinegar", quantity: "1 tbsp" },
      { id: "15", name: "Sugar", quantity: "1 tsp" }
    ],
    instructions: `
      <ul>
        <li>Marinate the diced chicken with 1 tbsp soy sauce, Shaoxing wine, and cornstarch for 15 minutes.</li>
        <li>Heat 2 tbsp oil in a wok over high heat and stir-fry the chicken until golden and cooked through. Remove and set aside.</li>
        <li>Add remaining oil to the wok and stir-fry the dried chilies and Sichuan peppercorns until fragrant.</li>
        <li>Add garlic, ginger, and bell peppers, stir-frying for 1 minute.</li>
        <li>Return the chicken to the wok and add the sauce mixture (hoisin sauce, remaining soy sauce, vinegar, and sugar).</li>
        <li>Stir-fry everything together for 2 minutes, then add peanuts and green onions.</li>
        <li>Serve immediately over steamed rice.</li>
      </ul>
    `,
    nutrition: {
      Calories: "320 kcal",
      Protein: "30 g",
      Carbohydrates: "15 g",
      Fat: "16 g"
    }
  },
  {
    title: "Teriyaki Chicken",
    image: "/src/assets/teriyaki receipe.png",
    description: "Teriyaki Chicken is a popular Japanese dish featuring chicken glazed with a sweet and savory teriyaki sauce. The word 'teriyaki' comes from 'teri' (glossy) and 'yaki' (grilled or broiled), referring to the shiny glaze on the meat.",
    country: "Japan",
    mainIngredient: "Chicken",
    allergens: ["Soy", "Gluten"],
    cookTime: "25 minutes",
    rating: 4.6,
    isBookmarked: false,
    ingredients: [
      { id: "1", name: "Chicken thighs (boneless, skin-on)", quantity: "6 pieces" },
      { id: "2", name: "Soy sauce", quantity: "1/2 cup" },
      { id: "3", name: "Mirin (sweet rice wine)", quantity: "1/4 cup" },
      { id: "4", name: "Sake or dry white wine", quantity: "1/4 cup" },
      { id: "5", name: "Brown sugar", quantity: "2 tbsp" },
      { id: "6", name: "Garlic (minced)", quantity: "2 cloves" },
      { id: "7", name: "Ginger (grated)", quantity: "1 tsp" },
      { id: "8", name: "Cornstarch", quantity: "1 tbsp" },
      { id: "9", name: "Water", quantity: "2 tbsp" },
      { id: "10", name: "Sesame seeds", quantity: "1 tbsp" },
      { id: "11", name: "Green onions (chopped)", quantity: "2 stalks" }
    ],
    instructions: `
      <ul>
        <li>In a saucepan, combine soy sauce, mirin, sake, brown sugar, garlic, and ginger.</li>
        <li>Bring to a boil, then reduce heat and simmer for 5 minutes.</li>
        <li>Mix cornstarch with water and add to the sauce, stirring until thickened.</li>
        <li>Season chicken thighs with salt and pepper.</li>
        <li>Heat a large skillet over medium-high heat and cook chicken, skin-side down, for 5-6 minutes until golden.</li>
        <li>Flip and cook for another 4-5 minutes until cooked through.</li>
        <li>Brush both sides with teriyaki sauce and cook for 1-2 minutes more.</li>
        <li>Garnish with sesame seeds and green onions.</li>
        <li>Serve with steamed rice and vegetables.</li>
      </ul>
    `,
    nutrition: {
      Calories: "380 kcal",
      Protein: "28 g",
      Carbohydrates: "18 g",
      Fat: "22 g"
    }
  },
  {
    title: "Caborana (Traditional Recipe)",
    image: "/src/assets/caborana receipe.png",
    description: "Caborana is a traditional dish that combines rich flavors and cultural heritage. This recipe brings together authentic ingredients and cooking methods passed down through generations.",
    country: "Traditional",
    mainIngredient: "Mixed",
    allergens: ["Dairy"],
    cookTime: "45 minutes",
    rating: 4.5,
    isBookmarked: false,
    ingredients: [
      { id: "1", name: "Traditional base ingredient", quantity: "500g" },
      { id: "2", name: "Herbs and spices", quantity: "2 tbsp" },
      { id: "3", name: "Traditional sauce", quantity: "1/2 cup" },
      { id: "4", name: "Fresh vegetables", quantity: "300g" },
      { id: "5", name: "Traditional seasoning", quantity: "to taste" }
    ],
    instructions: `
      <ul>
        <li>Prepare the traditional base according to family methods.</li>
        <li>Add herbs and spices at the appropriate cooking stage.</li>
        <li>Incorporate the traditional sauce gradually.</li>
        <li>Add fresh vegetables and cook until tender.</li>
        <li>Season to taste with traditional seasonings.</li>
        <li>Serve hot with traditional accompaniments.</li>
      </ul>
    `,
    nutrition: {
      Calories: "350 kcal",
      Protein: "20 g",
      Carbohydrates: "25 g",
      Fat: "18 g"
    }
  }
];

async function importRecipes() {
  try {
    // 连接到MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // 清空现有食谱数据（可选）
    await Recipe.deleteMany({});
    console.log('Cleared existing recipes');

    // 插入新数据
    const recipes = await Recipe.insertMany(recipesData);
    console.log(`Successfully imported ${recipes.length} recipes`);

    // 显示导入的食谱标题
    console.log('\nImported recipes:');
    recipes.forEach((recipe, index) => {
      console.log(`${index + 1}. ${recipe.title} (${recipe.country})`);
    });

    // 验证数据
    const totalRecipes = await Recipe.countDocuments();
    const countries = await Recipe.getCountries();
    const mainIngredients = await Recipe.getMainIngredients();
    const allergens = await Recipe.getAllergens();

    console.log('\nDatabase summary:');
    console.log(`Total recipes: ${totalRecipes}`);
    console.log(`Countries: ${countries.join(', ')}`);
    console.log(`Main ingredients: ${mainIngredients.join(', ')}`);
    console.log(`Allergens: ${allergens.join(', ')}`);

  } catch (error) {
    console.error('Import failed:', error);
  } finally {
    // 关闭数据库连接
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

// 运行导入脚本
if (require.main === module) {
  importRecipes();
}

module.exports = { importRecipes, recipesData };
