import React, { useState, useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import classes from "./AdminPage.module.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const AdminPage = () => {
  const { products, addProduct, updateProduct, deleteProduct } =
    useContext(ProductContext);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });
  const [editProduct, setEditProduct] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth();

  // Вхід в адмінку
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
    } catch {
      alert("Невірний емейл або пароль!");
    }
  };

  // Зміна полів продукту
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Додавання або оновлення продукту
  const handleSaveProduct = async () => {
    if (Object.values(newProduct).some((field) => !field.trim())) {
      return alert("Будь ласка, заповніть всі поля!");
    }

    try {
      if (editProduct) {
        await updateProduct(editProduct.id, newProduct);
        setEditProduct(null);
      } else {
        await addProduct({
          ...newProduct,
          price: parseFloat(newProduct.price),
        });
      }
      setNewProduct({ name: "", price: "", image: "", description: "" });
      alert(editProduct ? "Продукт оновлено!" : "Продукт додано!");
    } catch {
      alert("Помилка при збереженні продукту!");
    }
  };

  // Видалення продукту
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      alert("Продукт видалено!");
    } catch {
      alert("Не вдалося видалити продукт!");
    }
  };

  // Заповнення форми для редагування
  const handleEditClick = (product) => {
    setEditProduct(product);
    setNewProduct({ ...product });
  };

  // Скидання форми для додавання нового продукту
  const handleAddNewProduct = () => {
    setEditProduct(null);
    setNewProduct({
      name: "",
      price: "",
      image: "",
      description: "",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className={classes.admin_wrapper}>
        <h1 className={classes.enter_password_input_text}>ADMIN LOG IN</h1>
        <hr className={classes.hr2} />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
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

  return (
    <div className={classes.admin_wrapper}>
      <div className={classes.add_product_form}>
        <h1>ADMIN PANEL</h1>
        {/* <hr className={classes.hr} /> */}
        <h2>{editProduct ? "EDIT PRODUCT" : "ADD NEW PRODUCT"}</h2>

        {["name", "price", "image", "description"].map((field) => (
          <input
            key={field}
            type={field === "price" ? "number" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={newProduct[field]}
            onChange={handleInputChange}
          />
        ))}

        <button onClick={handleSaveProduct}>
          {editProduct ? "UPDATE PRODUCT" : "ADD"}
        </button>
        {/* Кнопка для додавання нового продукту */}
        <button
          onClick={handleAddNewProduct}
          className={classes.add_new_product_button}
        >
          ADD NEW PRODUCT!
        </button>
      </div>
      {/* Список продуктів */}
      <div className={classes.product_list}>
        <h2>PRODUCT LIST</h2>
        {/* <hr className={classes.hr2} /> */}
        <table className={classes.product_table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price} USD</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={classes.product_image}
                  />
                </td>
                <td>
                  <button
                    className={classes.edit_button}
                    onClick={() => handleEditClick(product)}
                  >
                    EDIT
                  </button>
                  <button
                    className={classes.delete_button}
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
