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
    country: "",
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
    <div className={classes.order_wrapper}>
      <div className={classes.your_order}>
        <h1>YOUR ORDER:</h1>
      </div>
      <div className={classes.order_form_wrapper}>
        <h1 className={classes.check_out_text}>CHECK OUT:</h1>
        <hr className={classes.hr} />
        <form onSubmit={handleSubmit} className={classes.form}>
          <input
            className={classes.input}
            type="text"
            placeholder="First name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
          />
          <input
            className={classes.input}
            type="text"
            placeholder="Last name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            required
          />
          <input
            className={classes.input}
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
          <input
            className={classes.input}
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            className={classes.input}
            type="text"
            placeholder="Country"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            required
          />
          <input
            className={classes.input}
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
          <input
            className={classes.input}
            type="text"
            placeholder="Street"
            value={formData.street}
            onChange={(e) =>
              setFormData({ ...formData, street: e.target.value })
            }
            required
          />
          <input
            className={classes.input}
            type="text"
            placeholder="Postal index"
            value={formData.postalCode}
            onChange={(e) =>
              setFormData({ ...formData, postalCode: e.target.value })
            }
            required
          />
          <button type="submit">CONFIRM ORDER!</button>
        </form>
      </div>
    </div>
  );
};

export default Order;
