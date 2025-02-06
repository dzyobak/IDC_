import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import { useCart } from "../../contexts/CartContext"; // Імпортуємо useCart
import classes from "./Store.module.css";

const Store = () => {
  const { products } = useContext(ProductContext);
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart(); // Отримуємо функції для додавання, видалення і оновлення кількості
  const [isCartVisible, setIsCartVisible] = useState(false); // Стан для відображення кошика

  const toggleCart = () => setIsCartVisible(!isCartVisible); // Функція для перемикання видимості кошика

  // Функція для обчислення загальної суми кошика
  const calculateTotal = () => {
    const total = cart.reduce(
      (total, item) => total + (Number(item.price) || 0) * item.quantity,
      0
    );
    return total.toFixed(2);
  };

  return (
    <div className={classes.store_wrapper}>
      {/* Кнопка для відкриття кошика */}
      <button className={classes.cart_button} onClick={toggleCart}>
        View Cart ({cart.length} items)
      </button>

      {/* Бічна панель кошика */}
      {isCartVisible && (
        <div className={classes.cart_sidebar}>
          <div className={classes.cart_sidebar_upper}>
            <h2>Your Cart</h2>
            <span className={classes.close_button} onClick={toggleCart}>
              ×
            </span>
          </div>

          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul className={classes.cart_item_wrapper}>
              {cart.map((item, index) => (
                <li key={index} className={classes.cart_item}>
                  <div className={classes.cart_image_and_text}>
                    <img
                      src={item.image} // Відображаємо фото продукту
                      alt={item.name}
                      className={classes.cart_item_image}
                    />
                    <p className={classes.cart_text}>
                      {item.name} - ${item.price} x {item.quantity}
                    </p>
                  </div>
                  <div className={classes.cart_functional}>
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
                  </div>
                </li>
              ))}
            </ul>
          )}

          <p className={classes.total_amount}>Total: ${calculateTotal()}</p>
          <button
            onClick={() => alert("Proceed to Checkout")}
            className={classes.cart_checkout_button}
          >
            Checkout
          </button>
        </div>
      )}

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
              <div className={classes.button_wrapper}>
                <Link to={`/order/${product.id}`}>
                  <button className={classes.order_button}>BUY IT!</button>
                </Link>
                <button
                  className={classes.add_to_cart_button}
                  onClick={() => addToCart(product)} // Додаємо продукт в кошик
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
