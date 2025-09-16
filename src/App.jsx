import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./components/HomeManager/Home.jsx";
import NotFound from "./components/NotFound.jsx";
import Login from "./components/LoginManager/LogIn.jsx";
import Signin from "./components/LoginManager/SignIn.jsx";
import Recipes from "./components/Recipes";

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
