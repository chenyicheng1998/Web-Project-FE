// Recipe data
export const recipes = [
  {
    id: 1,
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
    id: 2,
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
        <li>Mix the ground meat, onion juice, yogurt, and spices (thyme, salt, pepper, cumin, Aleppo pepper) in a large bowl. Knead thoroughly with your hands until the mixture becomes sticky and well-combined.</li>
        <li>Shape the mixture into a tight, firm log and wrap it tightly in plastic wrap. For a better result, you can use a food processor to turn the mixture into a paste before shaping.</li>
        <li>Refrigerate for at least 2 hours to firm up, then transfer to the freezer and freeze overnight (or for at least 8 hours).</li>
        <li>When you are ready to cook, remove the log from the freezer and let it sit for a few minutes.</li>
        <li>Using a very sharp knife, thinly slice the semi-frozen meat.</li>
        <li>Heat a large pan with a little oil or butter and cook the slices in a single layer for 1-2 minutes per side until browned and cooked through. Cook in batches to avoid overcrowding the pan.</li>
      </ul>
      <h4>For serving:</h4>
      <ul>
        <li>Serve the cooked kebab slices in pita bread or on a plate with fresh sliced tomatoes, onions, and lettuce.</li>
        <li>Add a drizzle of your favorite yogurt or spicy sauce.</li>
      </ul>
    `,
    nutrition: {
      Calories: "190 kcal per 100g",
      Protein: "17g per 100g",
      Carbohydrates: "3g per 100g",
      Fat: "11g per 100g"
    }
  },
  {
    id: 3,
    title: "Korean Bulgogi",
    image: "/src/assets/bulgogi receipe.png",
    description: "A classic Korean dish of thinly sliced, marinated beef, grilled or stir-fried to perfection.",
    country: "Korea",
    mainIngredient: "Beef",
    allergens: ["Gluten", "Soy", "Sesame"],
    cookTime: "30 minutes to 24 hours (including marination)",
    rating: 4.7,
    isBookmarked: false,
    ingredients: [
      { id: "1", name: "Thinly sliced beef (ribeye or sirloin)", quantity: "1 pound" },
      { id: "2", name: "Sesame oil", quantity: "2 tablespoons" },
      { id: "3", name: "Sugar or honey", quantity: "2 tablespoons" },
      { id: "4", name: "Minced garlic", quantity: "1 tablespoon" },
      { id: "5", name: "Grated ginger", quantity: "1 tablespoon" },
      { id: "6", name: "Black pepper", quantity: "1/2 teaspoon" },
      { id: "7", name: "Soy sauce", quantity: "1/2 cup" },
      { id: "8", name: "Small onion", quantity: "1, thinly sliced" },
      { id: "9", name: "Green onion", quantity: "1, chopped" }
    ],
    instructions: `
      <ul>
        <li>**Prepare the marinade:** In a medium bowl, whisk together the soy sauce, sesame oil, sugar or honey, minced garlic, grated ginger, and black pepper until the sugar is dissolved.</li>
        <li>**Marinate the beef:** Add the thinly sliced beef and sliced onion to the bowl with the marinade. Mix well to ensure all the beef is coated. Cover and refrigerate for at least 30 minutes, or up to 24 hours for a deeper flavor.</li>
        <li>**Cook the bulgogi:** Heat a large skillet or pan over medium-high heat. Add the marinated beef and onions to the hot pan in a single layer. Cook for 2-3 minutes per side until the beef is browned and cooked through.</li>
        <li>**Serve:** Transfer the cooked bulgogi to a serving plate and garnish with the chopped green onion. Serve immediately with a bowl of steamed rice and your favorite Korean side dishes.</li>
      </ul>
    `,
    nutrition: {
      Calories: "153 kcal per 100g",
      Protein: "9.2 g per 100g",
      Fat: "7.4 g per 100g",
      Carbohydrates: "11.2 g per 100g"
    }
  },
  {
    id: 4,
    title: "Spaghetti Carbonara",
    image: "/src/assets/caborana receipe.png",
    description: "A classic and simple Italian pasta dish from Rome, made with just a few key ingredients: pasta, eggs, Pecorino Romano cheese, and guanciale (cured pork cheek). The secret to a creamy sauce is in the technique, not cream.",
    country: "Italy",
    mainIngredient: "Pasta",
    allergens: ["Gluten", "Eggs", "Dairy"],
    cookTime: "25 minutes",
    rating: 4.5,
    isBookmarked: false,
    ingredients: [
      { id: "1", name: "Guanciale", quantity: "200g" },
      { id: "2", name: "Spagetti", quantity: "350g" },
      { id: "3", name: "Eggs", quantity: "4 large" },
      { id: "4", name: "Pecorino Romano Cheese", quantity: "100g" },
      { id: "5", name: "Black Pepper", quantity: "to taste" }
    ],
    instructions: `
      <ul>
        <li>Bring a large pot of water to a boil and add salt until it tastes like the sea. Cook the spaghetti until it's al dente.</li>
        <li>While the pasta is cooking, cut the **guanciale** into small strips or cubes. Place the guanciale in a cold skillet over medium-low heat. Cook it slowly until the fat has rendered and the guanciale is crispy.</li>
        <li>In a separate bowl, whisk together the **eggs**, grated **Pecorino Romano cheese**, and a generous amount of freshly ground **black pepper**.</li>
        <li>Once the pasta is cooked, use tongs to transfer it directly into the skillet with the crispy guanciale. Leave a little of the pasta water on the spaghetti.</li>
        <li>Remove the skillet from the heat completely. Wait a moment for the pan to cool slightly.</li>
        <li>Pour the egg and cheese mixture over the hot pasta and toss vigorously with tongs. The heat from the pasta and the reserved pasta water will cook the eggs and create a creamy sauce without scrambling them. Add a splash of pasta water if needed to achieve a smooth consistency.</li>
        <li>Serve immediately, topped with more Pecorino Romano and black pepper.</li>
      </ul>
    `,
    nutrition: {
      Calories: "841 kcal per serving",
      Fat: "25.6g per serving",
      Carbohydrates: "54g per serving",
      Protein: "22.4g per serving"
    }
  },
  {
    id: 5,
    title: "Teriyaki Chicken",
    image: "/src/assets/teriyaki receipe.png",
    description: "A classic Japanese dish featuring tender chicken pieces coated in a sweet and savory teriyaki glaze. It's a popular weeknight meal that is both delicious and easy to prepare.",
    country: "Japan",
    mainIngredient: "Chicken",
    allergens: ["Gluten", "Soy"],
    cookTime: "20 minutes",
    rating: 4.6,
    isBookmarked: false,
    ingredients: [
      { id: "1", name: "Chicken thighs (boneless, skinless)", quantity: "2 lbs (approx. 900g)" },
      { id: "2", name: "Soy sauce", quantity: "1/4 cup" },
      { id: "3", name: "Mirin (or rice vinegar with a pinch of sugar)", quantity: "1/4 cup" },
      { id: "4", name: "Sake (or dry white wine)", quantity: "1/4 cup" },
      { id: "5", name: "Sugar", quantity: "2 tablespoons" },
      { id: "6", name: "Garlic (minced)", quantity: "2 cloves" },
      { id: "7", name: "Ginger (grated)", quantity: "1 teaspoon" },
      { id: "8", name: "Sesame oil", quantity: "1 tablespoon" },
      { id: "9", name: "Green onions", quantity: "for garnish" },
      { id: "10", name: "Sesame seeds", quantity: "for garnish" }
    ],
    instructions: `
      <ul>
        <li>**Prepare the Sauce:** In a small bowl, whisk together the soy sauce, mirin, sake, sugar, minced garlic, and grated ginger until the sugar is dissolved.</li>
        <li>**Cook the Chicken:** Heat sesame oil in a large skillet or pan over medium-high heat. Add the chicken pieces and cook until they are golden brown on all sides and cooked through.</li>
        <li>**Glaze the Chicken:** Pour the teriyaki sauce mixture into the skillet with the chicken. Bring the sauce to a simmer and continue to cook for 3-5 minutes, stirring occasionally, until the sauce thickens and coats the chicken beautifully.</li>
        <li>**Serve:** Remove from heat and serve the teriyaki chicken immediately over a bed of steamed rice. Garnish with chopped green onions and a sprinkle of sesame seeds.</li>
      </ul>
    `,
    nutrition: {
      Calories: "350 kcal per serving",
      Protein: "30g per serving",
      Fat: "15g per serving",
      Carbohydrates: "25g per serving"
    }
  },
  {
    id: 6,
    title: "Kung Pao Chicken (宫保鸡丁)",
    image: "/src/assets/kungpao receipe.png",
    description: "A classic Sichuan stir-fry dish featuring spicy, savory, and slightly sweet chicken with peanuts and vegetables.",
    country: "China",
    mainIngredient: "Chicken",
    allergens: ["Peanut", "Soy", "Gluten"],
    cookTime: "25 minutes",
    rating: 4.7,
    isBookmarked: false,
    ingredients: [
      { id: "1", name: "Chicken breast or thighs", quantity: "1 lb (approx. 450g), cubed" },
      { id: "2", name: "Dry red chilies", quantity: "10-15" },
      { id: "3", name: "Sichuan peppercorns", quantity: "1 teaspoon" },
      { id: "4", name: "Garlic", quantity: "3 cloves, minced" },
      { id: "5", name: "Ginger", quantity: "1 tablespoon, minced" },
      { id: "6", name: "Green onions", quantity: "2, chopped" },
      { id: "7", name: "Roasted peanuts", quantity: "1/2 cup" },
      { id: "8", name: "Soy sauce", quantity: "2 tablespoons" },
      { id: "9", name: "Black rice vinegar", quantity: "1 tablespoon" },
      { id: "10", name: "Sugar", quantity: "1 tablespoon" },
      { id: "11", name: "Cornstarch", quantity: "1 tablespoon" },
      { id: "12", name: "Sesame oil", quantity: "1 teaspoon" },
      { id: "13", name: "Vegetable oil", quantity: "2 tablespoons" }
    ],
    instructions: `
      <ul>
        <li>**Marinate the Chicken:** In a bowl, toss the chicken cubes with 1 tablespoon of soy sauce, 1 tablespoon of black rice vinegar, 1 tablespoon of cornstarch, and 1 teaspoon of sesame oil. Let it sit for 15 minutes.</li>
        <li>**Make the Sauce:** In a separate small bowl, mix the remaining 1 tablespoon of soy sauce, 1 tablespoon of sugar, and 1 teaspoon of black rice vinegar.</li>
        <li>**Stir-fry:** Heat vegetable oil in a wok or large skillet over high heat. Add the chicken and stir-fry until it is browned and cooked through. Remove the chicken from the wok and set aside.</li>
        <li>**Sauté Aromatics:** Reduce the heat to medium. Add the dry red chilies and Sichuan peppercorns and stir-fry until fragrant. Add the minced garlic and ginger and cook for 30 seconds.</li>
        <li>**Combine and Finish:** Return the chicken to the wok. Pour in the prepared sauce and stir quickly to coat the chicken. Add the green onions and roasted peanuts, and stir-fry for another minute. Serve hot with steamed rice.</li>
      </ul>
    `,
    nutrition: {
      Calories: "420 kcal per serving",
      Protein: "28g per serving",
      Fat: "22g per serving",
      Carbohydrates: "28g per serving"
    }
  }
];

// Extract filter options from recipe data
export const getFilterOptions = () => {
  const countries = [...new Set(recipes.map(recipe => recipe.country))].sort();
  const mainIngredients = [...new Set(recipes.map(recipe => recipe.mainIngredient))].sort();
  const allergens = [...new Set(recipes.flatMap(recipe => recipe.allergens))].sort();
  
  return {
    countries,
    mainIngredients,
    allergens
  };
};

// Filter recipes function
export const filterRecipes = (recipes, filters) => {
  return recipes.filter(recipe => {
    // Country filter
    if (filters.country && recipe.country !== filters.country) {
      return false;
    }
    
    // Main ingredient filter
    if (filters.mainIngredient && recipe.mainIngredient !== filters.mainIngredient) {
      return false;
    }
    
    // Allergen filter (exclude recipes containing specified allergens)
    if (filters.allergens && filters.allergens.length > 0) {
      const hasAvoidedAllergen = filters.allergens.some(allergen => 
        recipe.allergens.includes(allergen)
      );
      if (hasAvoidedAllergen) {
        return false;
      }
    }
    
    return true;
  });
};