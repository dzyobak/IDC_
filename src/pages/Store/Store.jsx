import React from "react";
import { Link } from "react-router-dom";

const Store = () => {
  const products = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 400 },
    { id: 4, name: "Product 4", price: 350 },
    { id: 5, name: "Product 5", price: 450 },
  ];

  return (
    <div>
      <h1>Our Store:</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} грн
            <Link to={`/order/${product.id}`}>
              <button>Order!</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Store;
