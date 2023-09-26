import { useEffect, useState } from "react";

import Header from "./components/Layout/Header/Header";
import MealList from "./components/Meals/MealList/MealList";
import MealsSummary from "./components/Meals/MealsSummary/MealsSumary";
import Cart from "./components/Cart/Cart/Cart";

import CartProvider from "./store/CartProvider";

export interface IMealData {
  id: number;
  title: string;
  image?: string;
  imageType?: string;
  restaurantChain: string;
  servings?: {
    number: number | null;
    size: number | null;
    unit: string | null;
  };
  price: number;
}

function App() {
  const [data, setData] = useState<IMealData[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);
  const API_KEY = "af3619212f18453886fbff02db9fe3c2";
  const BASE_URL = "https://api.spoonacular.com/food/menuItems/search?apiKey=";

  useEffect(() => {
    fetch(`${BASE_URL + API_KEY}&query=burger&number=20`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.menuItems);
      });
  }, []);

  const pricedMeals = data.map((meals) => {
    const price = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    return { ...meals, price: price };
  });

  const showCartHandler = () => {
    setShowCart(true);
  };

  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    <CartProvider>
      {showCart ? <Cart onClose={hideCartHandler} /> : <></>}
      <Header onShowCart={showCartHandler} />
      <MealsSummary />
      <MealList pricedMeals={pricedMeals} />
    </CartProvider>
  );
}

export default App;
