import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useShoppingCart } from "./ShoppingCartContext"; // Import the context
import "./css/ProductoDetalle.css";
import Button from "@mui/material/Button";

function ProductoDetalle() {
  const { tipo } = useParams();
  const location = useLocation();
  const { products } = location.state || {};
  const { addToCart } = useShoppingCart(); // Access addToCart function

  if (!products || products.length === 0) {
    return <p>No products available for "{tipo}".</p>;
  }

  return (
    <div>
      <h1>{tipo}</h1>
      <div className="product-detail-cards">
        {products.map((product, index) => (
          <div key={index} className="product-detail-card">
            <h2>{product.nombre}</h2>
            <img
              src={`/tractores/${product.imagen}`}
              alt={product.descripcion}
              className="product-image"
            />
            <p>Precio: {product.precio}</p>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => addToCart(product)} // Add product to cart
            >
              Añadir al carro
            </Button>
            <Link
              to={`/detalle-producto/${tipo}/${product.nombre}`}
              state={{ product }}
              style={{ textDecoration: "none" }}
            >
              <Button variant="outlined">Ver detalles</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductoDetalle;
