import { FC, useEffect, useState } from "react";

import Meal from "../Meal/Meal";
import Card from "../../UI/Card/Card";

import "./MealList.css";

export interface IMealData {
  id: string;
  name: string;
  description: string;
  price: number;
}

const MealList: FC = () => {
  const [mealData, setMealData] = useState<IMealData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-7cab8-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMealData(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setIsError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className="meals-loading">
        <p>Loading...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="meals-error">
        <p>{isError}</p>
      </section>
    );
  }

  const mealsList = mealData.map((meal) => (
    <Meal
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className="meals">
      <Card>
        <ul className="">{mealsList}</ul>
      </Card>
    </section>
  );
};

export default MealList;
