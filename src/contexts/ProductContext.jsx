import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Функція отримання всіх продуктів
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    } catch (error) {
      console.error("Помилка завантаження продуктів:", error);
    }
  };

  // Завантаження продуктів при старті
  useEffect(() => {
    fetchProducts();
  }, []);

  // Додавання нового продукту
  const addProduct = async (product) => {
    try {
      const docRef = await addDoc(collection(db, "products"), product);
      setProducts((prev) => [...prev, { id: docRef.id, ...product }]);
    } catch (error) {
      console.error("Помилка додавання продукту:", error);
    }
  };

  // Оновлення продукту
  const updateProduct = async (id, updatedProduct) => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, updatedProduct);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { id, ...updatedProduct } : p))
      );
    } catch (error) {
      console.error("Помилка оновлення продукту:", error);
    }
  };

  // Видалення продукту
  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Помилка видалення продукту:", error);
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
