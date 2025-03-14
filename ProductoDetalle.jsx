import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useShoppingCart } from "./ShoppingCartContext"; // Import the context
import "./css/ProductoDetalle.css";
import Button from "@mui/material/Button";

function ProductoDetalle() {
  const { tipo } = useParams();
  const location = useLocation();
  const { products } = location.state || {};
  const { addToCart } = useShoppingCart(); // Access addToCart function
  const language = (localStorage.getItem("language") || "0");

  if (!products || products.length === 0) {
    return <p>No products available for "{tipo}".</p>;
  }

  const translations = {
    "0": { // Spanish
      Precio: "Precio:",
      Detalles: "Ver detalles",
      Carro: "Añadir al carro"
    },
    "1": { // English
      Precio: "Price:",
      Detalles: "See more details",
      Carro: "Add to cart"
    }
  };

  useEffect(() => {
        window.scrollTo(0, 0);
      });

  return (
    <div>
      <h1>{tipo}</h1>
      <div className="product-detail-cards">
        {products.map((product, index) => (
          <div key={index} className="product-detail-card">
            <h2>{product.nombre}</h2>
            <img
              src={`http://localhost:3000/tractores/${product.imagen}`}
              alt={product.descripcion}
              className="product-image"
            />
            <p>{translations[language].Precio} {product.precio}</p>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => addToCart(product)} // Add product to cart
            >
              {translations[language].Carro}
            </Button>
            <Link
              to={`/detalle-producto/${tipo}/${product.nombre}`}
              state={{ product }}
              style={{ textDecoration: "none" }}
            >
              <Button variant="outlined">{translations[language].Detalles}</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductoDetalle;
