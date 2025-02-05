import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Отримуємо продукти з Firestore при завантаженні додатка
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  // Додавання нового продукту
  const addProduct = async (product) => {
    try {
      const docRef = await addDoc(collection(db, "products"), product);
      console.log("Product added with ID: ", docRef.id);
      setProducts((prevProducts) => [
        ...prevProducts,
        { id: docRef.id, ...product },
      ]);
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  // Оновлення продукту
  const updateProduct = async (id, updatedProduct) => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, ...updatedProduct } : product
        )
      );
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  // Видалення продукту
  const deleteProduct = async (id) => {
    try {
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);
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
