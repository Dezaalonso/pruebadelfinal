import React, { useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useShoppingCart } from "./ShoppingCartContext";
import "./css/ProductoDetalle.css";
import Button from "@mui/material/Button";

function ProductoDetalle() {
  const { tipo } = useParams();
  const location = useLocation();
  const { products } = location.state || {};
  const { addToCart } = useShoppingCart();
  const navigate = useNavigate();
  const language = localStorage.getItem("language") || "0";

  if (!products || products.length === 0) {
    return <p>No products available for "{tipo}".</p>;
  }

  const translations = {
    "0": {
      Precio: "Precio:",
      Detalles: "Ver detalles",
      Carro: "Añadir al carro"
    },
    "1": {
      Precio: "Price:",
      Detalles: "See more details",
      Carro: "Add to cart"
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1>{tipo}</h1>
      <div className="product-detail-cards">
        {products.map((product, index) => (
          <div 
            key={index} 
            className="product-detail-card" 
            onClick={() => navigate(`/detalle-producto/${tipo}/${product.nombre}`, { state: { product } })}
            style={{ cursor: "pointer" }}
          >
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
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigating when clicking the button
                addToCart(product);
              }}
            >
              {translations[language].Carro}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductoDetalle;
