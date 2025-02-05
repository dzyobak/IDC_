import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext"; // Імпортуємо контекст
import classes from "./Store.module.css";

const Store = () => {
  const { products } = useContext(ProductContext); // Отримуємо продукти з контексту

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
              <Link to={`/order/${product.id}`}>
                <button className={classes.order_button}>BUY IT!</button>
              </Link>
            </div>
            {/* Передача id продукту через URL */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
