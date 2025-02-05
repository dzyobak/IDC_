import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex === -1) {
      setCart([...cart, { ...product, quantity: 1 }]); // Якщо продукт не існує, додаємо його з кількістю 1
    } else {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1; // Збільшуємо кількість на 1
      setCart(updatedCart);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId)); // Видаляємо продукт з кошика
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId); // Якщо кількість <= 0, видаляємо продукт
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      ); // Оновлюємо кількість
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
