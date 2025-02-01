import React, { useState, useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import classes from "./AdminPage.module.css";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Імпортуємо Firebase Authentication

const AdminPage = () => {
  const { addProduct } = useContext(ProductContext);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });
  const [email, setEmail] = useState(""); // Емейл для входу
  const [password, setPassword] = useState(""); // Пароль для входу
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(); // Отримуємо об'єкт автентифікації

  // Функція для входу
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password); // Вхід через Firebase
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Помилка входу: ", error);
      alert("Невірний емейл або пароль!");
    }
  };

  // Функція для додавання нового продукту
  const handleAddProduct = async () => {
    if (
      newProduct.name &&
      newProduct.price &&
      newProduct.image &&
      newProduct.description
    ) {
      try {
        const product = {
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          image: newProduct.image,
          description: newProduct.description,
        };

        await addProduct(product);
        setNewProduct({ name: "", price: "", image: "", description: "" });
        alert("Продукт успішно додано!");
      } catch (error) {
        console.error("Помилка при додаванні продукту: ", error);
        alert("Помилка при додаванні продукту!");
      }
    } else {
      alert("Будь ласка, заповніть всі поля!");
    }
  };

  // Якщо користувач не автентифікований, показуємо форму для входу
  if (!isAuthenticated) {
    return (
      <div className={classes.admin_wrapper}>
        <h1 className={classes.enter_password_input_text}>ADMIN LOG IN</h1>
        <hr className={classes.hr2} />
        <input
          className={classes.password_input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={classes.password_input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className={classes.login_button}>
          Log In
        </button>
      </div>
    );
  }

  // Якщо користувач автентифікований, показуємо сторінку адміна
  return (
    <div className={classes.admin_wrapper}>
      <div className={classes.add_product_form}>
        <h1>ADMIN PANEL</h1>
        <hr className={classes.hr} />
        <h2>ADD NEW STAFF</h2>
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
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
        <button onClick={handleAddProduct}>Add new product</button>
      </div>
    </div>
  );
};

export default AdminPage;
