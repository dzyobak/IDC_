import React, { useState, useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import classes from "./AdminPage.module.css";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const { addProduct } = useContext(ProductContext);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "", // Зберігаємо URL фото
  });
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Функція для перевірки пароля
  const checkPassword = () => {
    if (password === "123") {
      setIsAuthenticated(true);
    } else {
      alert("Невірний пароль!");
      navigate("/");
    }
  };

  // Функція для додавання нового продукту
  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.price && newProduct.image) {
      try {
        // Створюємо об'єкт продукту
        const product = {
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          image: newProduct.image, // Використовуємо URL фото
        };

        // Додаємо продукт до Firestore
        await addProduct(product);

        // Очищуємо форму
        setNewProduct({ name: "", price: "", image: "" });
        alert("Продукт успішно додано!");
      } catch (error) {
        console.error("Помилка при додаванні продукту: ", error);
        alert("Помилка при додаванні продукту!");
      }
    } else {
      alert("Будь ласка, заповніть всі поля!");
    }
  };

  // Якщо користувач не автентифікований, показуємо форму для введення пароля
  if (!isAuthenticated) {
    return (
      <div className={classes.admin_wrapper}>
        <h1 className={classes.enter_password_input_text}>Enter Password</h1>
        <hr className={classes.hr2} />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={checkPassword} className={classes.login_button}>
          Log In
        </button>
      </div>
    );
  }

  // Якщо користувач автентифікований, показуємо сторінку адміна
  return (
    <div className={classes.admin_wrapper}>
      <div className={classes.add_product_form}>
        <h1>Admin Panel</h1>
        <h2>Add new staff</h2>
        <input
          type="text"
          placeholder="Product name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="URL to image"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
        />
        <button onClick={handleAddProduct}>Add new product</button>
      </div>
    </div>
  );
};

export default AdminPage;
