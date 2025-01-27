import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

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
      console.error("Помилка при створенні замовлення: ", error);
    }
  };

  return (
    <div>
      <h1>Замовлення товару</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Місто"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Поштовий індекс"
          value={formData.postalCode}
          onChange={(e) =>
            setFormData({ ...formData, postalCode: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Вулиця"
          value={formData.street}
          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Ім'я"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Прізвище"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          required
        />
        <input
          type="tel"
          placeholder="Номер телефону"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <button type="submit">Підтвердити замовлення</button>
      </form>
    </div>
  );
};

export default Order;
