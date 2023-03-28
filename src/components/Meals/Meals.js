import React from "react";

import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";

//import styles from "./Meals.module.css";

const Meals = () => {
  return (
    <>
      <MealsSummary />
      <AvailableMeals />
    </>
  );
};

export default Meals;
