import React from "react";
import mealsIMage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>

      <div className={styles["main-image"]}>
        <img src={mealsIMage} alt="A table of food" />
      </div>
    </>
  );
};

export default Header;
