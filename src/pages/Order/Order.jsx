import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import classes from "./Order.module.css";

const Order = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    city: "",
    postalCode: "",
    street: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "orders"), {
        productId,
        ...formData,
        timestamp: new Date(),
      });
      alert("Замовлення успішно створено!");
      navigate("/");
    } catch (error) {
      console.error("Помилка створення замовлення: ", error);
    }
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Оформлення товару</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
        <input
          type="text"
          placeholder="Місто"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          className={classes.input}
          required
        />
        <input
          type="text"
          placeholder="Поштовий індекс"
          value={formData.postalCode}
          onChange={(e) =>
            setFormData({ ...formData, postalCode: e.target.value })
          }
          className={classes.input}
          required
        />
        <input
          type="text"
          placeholder="Вулиця (Нова Пошта)"
          value={formData.street}
          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          className={classes.input}
          required
        />
        <input
          type="text"
          placeholder="Ім'я"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          className={classes.input}
          required
        />
        <input
          type="text"
          placeholder="Прізвище"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          className={classes.input}
          required
        />
        <input
          type="tel"
          placeholder="Номер телефону"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={classes.input}
          required
        />
        <input
          type="email"
          placeholder="Електронна пошта"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={classes.input}
          required
        />
        <button type="submit" className={classes.button}>
          Підтвердити замовлення
        </button>
      </form>
    </div>
  );
};

export default Order;
