import React, { FC } from "react";
import Meal from "../Meal/Meal";
import "./MealList.css";
import Card from "../../UI/Card/Card";
import { IMealData } from "../../../App";

// export interface MealProps {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
// }

const MealList: FC<{ showCart: () => void; pricedMeals: IMealData[] }> = ({
  showCart,
  pricedMeals,
}) => {
  console.log(pricedMeals);

  return (
    <section className="meals">
      <Card>
        <ul className="">
          {pricedMeals.map((meals) => (
            <Meal
              key={meals.id}
              id={meals.id}
              title={meals.title}
              restaurantChain={meals.restaurantChain}
              price={meals.price}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default MealList;
