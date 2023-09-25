import { useEffect, useState } from "react";
import Header from "./components/Layout/Header/Header";
import MealList from "./components/Meals/MealList/MealList";
import MealsSummary from "./components/Meals/MealsSummary/MealsSumary";
import Cart from "./components/Cart/Cart/Cart";

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
  const [showCart, setShowCart] = useState<boolean>(true);
  const API_KEY = "af3619212f18453886fbff02db9fe3c2";
  const BASE_URL = "https://api.spoonacular.com/food/menuItems/search?apiKey=";

  useEffect(() => {
    fetch(`${BASE_URL + API_KEY}&query=burger&number=20`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.menuItems);
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
    <>
      {showCart && <Cart onClose={hideCartHandler} cartItems={pricedMeals} />}
      <Header onShowCart={showCartHandler} />
      <MealsSummary />
      <MealList showCart={showCartHandler} pricedMeals={pricedMeals} />
    </>
  );
}

export default App;
