import React from "react";
import { useCart } from "../../contexts/CartContext";
import classes from "./Cart.module.css";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  return (
    <div className={classes.cart_wrapper}>
      <h1>Your Cart</h1>
      <div className={classes.cart_items}>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((product) => (
            <div key={product.id} className={classes.cart_item}>
              <img
                src={product.image}
                alt={product.name}
                className={classes.cart_item_image}
              />
              <div className={classes.cart_item_info}>
                <h3>{product.name}</h3>
                <p>{product.price} USD</p>
                <button
                  className={classes.remove_button}
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className={classes.cart_total}>
        <h3>Total: {totalPrice} USD</h3>
        <button className={classes.checkout_button}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
