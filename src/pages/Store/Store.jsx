import React from "react";
import { Link } from "react-router-dom";
import classes from "./Store.module.css";

const Store = () => {
  const products = [
    {
      id: 1,
      name: "UZI BARTER16",
      price: 100,
      image: "https://kappa.lol/To-pe",
    },
    {
      id: 2,
      name: "THUGG BARTER6",
      price: 200,
      image: "https://kappa.lol/fAEmh",
    },
  ];

  return (
    <div className={classes.store_wrapper}>
      <div className={classes.product_grid}>
        {products.map((product) => (
          <div key={product.id} className={classes.product_card}>
            <img
              src={product.image}
              alt={product.name}
              className={classes.product_image}
            />
            <div className={classes.product_info}>
              <h2 className={classes.product_name}>{product.name}</h2>
              <p className={classes.product_price}>{product.price} USD</p>
            </div>
            <Link to={`/order/${product.id}`}>
              <button className={classes.order_button}>ORDER!</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
