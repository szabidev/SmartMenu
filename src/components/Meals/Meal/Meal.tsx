import { FC, useContext } from "react";

import MealItemForm from "../MealItemForm/MealItemForm";
import { IMealData } from "../MealList/MealList";
import "./Meal.css";
import CartContext from "../../../store/cart-store";

const Meal: FC<IMealData> = ({ name, description, price, id }) => {
  const cartCtx = useContext(CartContext);

  const handleAmount = (amountNumber: number) => {
    cartCtx.addItem({
      id: id,
      name: name,
      amount: amountNumber,
      price: price,
    });
  };

  return (
    <li className="meal">
      <div className="meal-item__info">
        <p className="meal-item__title">{name}</p>
        <p className="meal-item__description">{description}</p>
        <p className="meal-item__price">${price}</p>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={handleAmount} />
      </div>
    </li>
  );
};

export default Meal;
