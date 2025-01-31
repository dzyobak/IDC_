import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase"; // Імпортуємо Firebase
import { collection, addDoc, getDocs } from "firebase/firestore"; // Імпортуємо Firestore функції

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Отримуємо продукти з Firestore при завантаженні додатка
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products")); // Отримуємо всі продукти
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  // Функція для додавання нового продукту до Firestore
  const addProduct = async (product) => {
    try {
      const docRef = await addDoc(collection(db, "products"), product); // Додаємо продукт до Firestore
      console.log("Product added with ID: ", docRef.id);

      // Оновлюємо локальний стан
      setProducts((prevProducts) => [
        ...prevProducts,
        { id: docRef.id, ...product },
      ]);
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
