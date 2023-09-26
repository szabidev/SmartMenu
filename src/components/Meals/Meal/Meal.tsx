import { FC, useContext } from "react";

import MealItemForm from "../MealItemForm/MealItemForm";

import "./Meal.css";
import { IMealData } from "../../../App";
import CartContext from "../../../store/cart-store";

const Meal: FC<IMealData> = ({ title, restaurantChain, price, id }) => {
  const cartCtx = useContext(CartContext);

  const handleAmount = (amountNumber: number) => {
    cartCtx.addItem({
      id: id,
      title: title,
      amount: amountNumber,
      price: price,
    });
  };

  return (
    <li className="meal">
      <div className="meal-item__info">
        <p className="meal-item__title">{title}</p>
        <p className="meal-item__description">{restaurantChain}</p>
        <p className="meal-item__price">${price}</p>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={handleAmount} />
      </div>
    </li>
  );
};

export default Meal;
