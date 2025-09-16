import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./components/HomeManager/Home.jsx";
import NotFound from "./components/NotFound.jsx";
import Login from "./components/LoginManager/LogIn.jsx";
import Signin from "./components/LoginManager/SignIn.jsx";
import Recipes from "./components/RecipeManager/Recipes.jsx";
import RecipeDetail from './components/RecipeManager/RecipeDetail.jsx';
import Ingredient from './components/IngredientManager/Ingredient.jsx';

// import ContactListManager from "./components/ContactListManager/ContactListManager";
// import RecipeManager from "./components/RecipeManager/RecipeManager"
// import ShoppingCart from "./components/ShoppingCart/ShoppingCart"
// import SignupPage from "./components/SignupPage/SignupPage"

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signin" element={<Signin />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="recipes/:id" element={<RecipeDetail />} />
          <Route path="ingredient/:id" element={<Ingredient />} />

          {/* 
          <Route path="contacts" element={<ContactListManager />} />
          <Route path="shoppingcart" element={<ShoppingCart />} />
          <Route path="signup" element={<SignupPage />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App
