import React from "react";
import { Link } from "react-router-dom";
import classes from "./Store.module.css"; // Імпортуємо CSS Module

const Store = () => {
  const products = [
    {
      id: 1,
      name: "Худі `Адмін`",
      price: 1200,
      image: "https://kappa.lol/0-aYY",
    },
    {
      id: 2,
      name: "Джинси `81600`",
      price: 1500,
      image: "https://kappa.lol/gXbR3",
    },
    {
      id: 3,
      name: "Футболка `Квартира`",
      price: 400,
      image: "https://kappa.lol/3hvdH",
    },
    {
      id: 4,
      name: "Термогорнятко `Я ❤️ Миколаївського Палія`",
      price: 400,
      image: "https://kappa.lol/84YES",
    },
    // Додайте інші продукти...
  ];

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Базар:</h1>
      <div className={classes.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={classes.productCard}>
            <img
              src={product.image}
              alt={product.name}
              className={classes.productImage}
            />
            <h3>{product.name}</h3>
            <p>{product.price}грн</p>
            <Link to={`/order/${product.id}`}>
              <button className={classes.orderButton}>Купити!</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
