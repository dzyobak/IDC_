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
        const updatedData = { ...newProduct };
        delete updatedData.id; // Firestore не дозволяє змінювати id

        await updateProduct(editProduct.id, updatedData);
        setEditProduct(null); // Очищення стану редагування
        alert("Продукт оновлено!");
      } else {
        await addProduct({
          ...newProduct,
          price: parseFloat(newProduct.price),
        });
        alert("Продукт додано!");
      }
      setNewProduct({ name: "", price: "", image: "", description: "" });
    } catch (error) {
      console.error("Помилка при збереженні продукту:", error); // Логування помилки
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

  // Додавання продукту без редагування
  const handleAddNewProduct = () => {
    setEditProduct(null);
    setNewProduct({ name: "", price: "", image: "", description: "" });
  };

  if (!isAuthenticated) {
    return (
      <div className={classes.admin_wrapper}>
        <h1>ADMIN LOG IN</h1>
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
      <h1 className={classes.admin_panel_text}>ADMIN PANEL</h1>
      <h2>{editProduct ? "EDIT PRODUCT" : "ADD NEW PRODUCT"}</h2>

      <input
        className={classes.admin_panel_inputs}
        type="text"
        name="name"
        placeholder="Name"
        value={newProduct.name}
        onChange={handleInputChange}
      />
      <input
        className={classes.admin_panel_inputs}
        type="number"
        name="price"
        placeholder="Price"
        value={newProduct.price}
        onChange={handleInputChange}
      />
      <input
        className={classes.admin_panel_inputs}
        type="text"
        name="image"
        placeholder="Image URL"
        value={newProduct.image}
        onChange={handleInputChange}
      />
      <textarea
        className={classes.admin_panel_inputs}
        name="description"
        placeholder="Description"
        value={newProduct.description}
        onChange={handleInputChange}
      />

      <button onClick={handleSaveProduct} className={classes.buttons}>
        {editProduct ? "UPDATE PRODUCT" : "ADD"}
      </button>

      {/* Кнопка для додавання нового продукту */}
      <button onClick={handleAddNewProduct} className={classes.buttons}>
        ADD NEW PRODUCT
      </button>

      <h2 className={classes.prodcut_list_text}>PRODUCT LIST</h2>
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
              <td className={classes.name_td}>{product.name}</td>
              <td className={classes.price_td}>{product.price} USD</td>
              <td className={classes.img_td}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={classes.product_image}
                />
              </td>
              <td className={classes.button_td}>
                <button
                  onClick={() => handleEditClick(product)}
                  className={classes.buttons}
                >
                  EDIT
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className={classes.buttons}
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
