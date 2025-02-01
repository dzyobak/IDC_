import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import classes from "./Order.module.css";

const Order = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false); // Стан для алерту

  const [formData, setFormData] = useState({
    city: "",
    country: "",
    postalCode: "",
    street: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    size: "S",
  });

  useEffect(() => {
    const selectedProduct = products.find((p) => p.id === productId);
    setProduct(selectedProduct);
  }, [productId, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "orders"), {
        productId,
        ...formData,
        timestamp: new Date(),
      });

      setOrderSuccess(true); // Показати повноекранний алерт
      setTimeout(() => {
        setOrderSuccess(false);
        navigate("/");
      }, 2000); // Закрити через 3 секунди і перенаправити
    } catch (error) {
      console.error("Помилка при створенні замовлення: ", error);
      alert("Помилка при створенні замовлення!");
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.order_wrapper}>
      {orderSuccess && (
        <div className={classes.fullscreen_alert}>
          <h1>Order successfully created!</h1>
        </div>
      )}
      <div className={classes.your_order}>
        <h1>YOUR ORDER:</h1>
        <div className={classes.your_order_wrapper}>
          <div className={classes.imgs_wrapper}>
            <img
              src={product.image}
              alt="Product Images"
              className={classes.img}
            />
            <img
              src={product.image}
              alt="Product Images"
              className={classes.img}
            />
          </div>
          <h1 className={classes.title}>{product.name}</h1>
          <h2 className={classes.price}>{product.price} USD</h2>
          <div>
            <h2 className={classes.choose_size_text}>CHOOSE YOUR SIZE</h2>
            <select
              name="size"
              id="size"
              className={classes.choose_size}
              value={formData.size}
              onChange={(e) =>
                setFormData({ ...formData, size: e.target.value })
              }
              required
            >
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div>
          <h3 className={classes.description}>
            DESCRIPTION:
            <h4 className={classes.description_text}>{product.description}</h4>
          </h3>
        </div>
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
