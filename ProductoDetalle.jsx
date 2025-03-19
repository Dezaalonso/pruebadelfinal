import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useShoppingCart } from "./ShoppingCartContext";
import "./css/ProductoDetalle.css";
import Button from "@mui/material/Button";

function ProductoDetalle() {
  const { tipo } = useParams();
  const { addToCart } = useShoppingCart();
  const navigate = useNavigate();
  const language = localStorage.getItem("language") || "0";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    const apiUrl = `http://127.0.0.1:5001/tractores/${tipo}`;

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tipo]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!products || products.length === 0) {
    return <p>No products available for "{tipo}".</p>;
  }

  return (
    <div>
      <h1>{tipo}</h1>
      <div className="product-detail-cards">
        {products.map((product, index) => (
          <div 
            key={index} 
            className="product-detail-card" 
            onClick={() => navigate(`/detalle-producto/${tipo}/${product.cod_tractor}`, { state: { product } })}
            style={{ cursor: "pointer" }}
          >
            <h2>{product.nombre}</h2>
            <img
              src={`http://localhost:3000/tractores/${product.imagen && product.imagen.trim() !== "" ? product.imagen : "blanco.jpg"}`}
              alt={product.descripcion}
              className="product-image"
            />
            <p>{translations[language].Precio} {product.precio}</p>
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) => {
                e.stopPropagation();
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
