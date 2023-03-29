import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import styles from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  const fetchingData = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://food-order-app-76f9f-default-rtdb.firebaseio.com/meals.json"
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
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
    setMeals(loadedMeals);
    setIsLoading(false);
    console.log(responseData.m1);
  };

  useEffect(() => {
    fetchingData().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={styles.mealsLoading}>
        <Card>
          <p>Loading...</p>
        </Card>
      </section>
    );
  }

  if (httpError) {
    return (
      <Card>
        <section className={styles.mealsError}>
          <p>{httpError}</p>
        </section>
      </Card>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
    />
  ));
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
