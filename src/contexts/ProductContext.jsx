import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase"; // Імпортуємо Firebase
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore"; // Імпортуємо Firestore функції

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

  // Функція для оновлення продукту в Firestore
  const updateProduct = async (id, updatedProduct) => {
    try {
      const productRef = doc(db, "products", id); // Отримуємо посилання на продукт
      await updateDoc(productRef, updatedProduct); // Оновлюємо дані в Firestore

      // Оновлюємо локальний стан
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, ...updatedProduct } : product
        )
      );
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  // Функція для видалення продукту з Firestore
  const deleteProduct = async (id) => {
    try {
      const productRef = doc(db, "products", id); // Отримуємо посилання на продукт
      await deleteDoc(productRef); // Видаляємо продукт з Firestore

      // Оновлюємо локальний стан
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
