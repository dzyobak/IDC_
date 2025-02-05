import React from "react";
import { useCart } from "../../contexts/CartContext"; // Імпортуємо useCart
import classes from "./Cart.module.css"; // Ваш CSS

const Cart = ({ toggleCart }) => {
  const { cart, removeFromCart, updateQuantity } = useCart(); // Отримуємо кошик і функції для роботи з ним

  // Функція для обчислення загальної суми кошика
  const calculateTotal = () => {
    const total = cart.reduce(
      (total, item) => total + (Number(item.price) || 0) * item.quantity,
      0
    );
    return total.toFixed(2);
  };

  return (
    <div className={classes.cart_sidebar}>
      <span className={classes.close_button} onClick={toggleCart}>
        ×
      </span>{" "}
      {/* Хрестик для закриття */}
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className={classes.cart_item}>
              <p>
                {item.name} - ${item.price} x {item.quantity}
              </p>
              {/* Кнопки для зменшення та збільшення кількості продукту */}
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className={classes.decrement_button}
              >
                -
              </button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value))
                }
                className={classes.quantity_input}
              />
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className={classes.increment_button}
              >
                +
              </button>

              {/* Кнопка для видалення продукту з кошика */}
              <button
                onClick={() => removeFromCart(item.id)}
                className={classes.remove_button}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className={classes.total_amount}>Total: ${calculateTotal()}</p>
      <button onClick={() => alert("Proceed to Checkout")}>Checkout</button>
    </div>
  );
};

export default Cart;
