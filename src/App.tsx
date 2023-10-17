import { useState } from "react";

import Header from "./components/Layout/Header/Header";
import MealList from "./components/Meals/MealList/MealList";
import MealsSummary from "./components/Meals/MealsSummary/MealsSumary";
import Cart from "./components/Cart/Cart/Cart";

import CartProvider from "./store/CartProvider";

function App() {
  const [showCart, setShowCart] = useState<boolean>(false);

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
      <MealList />
    </CartProvider>
  );
}

export default App;
