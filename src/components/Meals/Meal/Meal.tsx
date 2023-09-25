import React, { FC, useState } from "react";

import "./Meal.css";
import MealItemForm from "../MealItemForm/MealItemForm";
import { IMealData } from "../../../App";

const Meal: FC<IMealData> = ({ title, restaurantChain, price, id }) => {
  const [itemAmount, setItemAmount] = useState<number[]>([]);

  const handleAmount = (amountNumber: number) => {
    setItemAmount((prevState) => {
      return [...prevState, amountNumber];
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
