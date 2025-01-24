import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useShoppingCart } from "./ShoppingCartContext";
import "./css/ProductoDetallePage.css";
import Button from "@mui/material/Button";

function ProductoDetallePage() {
  const location = useLocation();
  const { product } = location.state || {};
  const { tipo, nombre } = useParams();
  const [selectedImage, setSelectedImage] = useState(product?.imagen);
  const { addToCart } = useShoppingCart(); // Access addToCart function


  if (!product) {
    return <p>Product details not available for "{nombre}" in "{tipo}".</p>;
  }

  const images = product.imagenes || [product.imagen]; // Array of images, fallback to the main image

  return (
    <div className="product-detail-container">
      {/* Thumbnail Gallery */}
      <div className="thumbnail-gallery">
        {images.map((img, index) => (
          <img
            key={index}
            src={`/tractores/${img}`}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setSelectedImage(img)}
            style={{
              border: selectedImage === img ? "2px solid #007bff" : "none",
            }}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="product-image-container">
        <img
          src={`/tractores/${selectedImage}`}
          alt={product.descripcion}
        />
      </div>

      {/* Product Details */}
      <div className="product-details">
        <h1>{product.nombre}</h1>
        <div
          className="product-description"
          dangerouslySetInnerHTML={{ __html: product.descripcion }}
        />
        <p className="price">Serie: {product.serie}</p>
        <p className="price">Año: {product.año}</p>
        <p className="price">Horas: {product.horas}</p>
        <p className="price">Precio USD: {product.precio}$</p>
        <p className="price">Igv USD: {product.precio*product.igv}$</p>
        <p className="price">Precio s/: {product.precio * product.venta }$</p>
        <Button
              variant="contained"
              color="secondary"
              onClick={() => addToCart(product)} // Add product to cart
            ></Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.history.back()}
        >
          Volver
        </Button>
      </div>
    </div>
  );
}

export default ProductoDetallePage;
