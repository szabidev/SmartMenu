import { FC } from "react";

import Meal from "../Meal/Meal";
import Card from "../../UI/Card/Card";

import "./MealList.css";
import { IMealData } from "../../../App";

const MealList: FC<{ pricedMeals: IMealData[] }> = ({ pricedMeals }) => {
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
