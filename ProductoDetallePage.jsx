import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useShoppingCart } from "./ShoppingCartContext";
import "./css/ProductoDetallePage.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function ProductoDetallePage() {
  const location = useLocation();
  const { product } = location.state || {};
  const { tipo, nombre } = useParams();
  const [selectedImage, setSelectedImage] = useState(product?.imagen);
  const { addToCart } = useShoppingCart(); // Access addToCart function

  const [formData, setFormData] = useState({
    correo: "",
    nombre: "",
    telefono: "",
    consulta: "",
  });

  useEffect(() => {
      window.scrollTo(0, 0);
    });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  if (!product) {
    return <p>Product details not available for "{nombre}" in "{tipo}".</p>;
  }

  const images = product.imagenes || [product.imagen]; // Array of images, fallback to the main image

  const handleShare = async () => {
    const productUrl = window.location.href;
    const shareData = {
      title: product.nombre,
      text: `Mira este producto: ${product.nombre} - ${product.precio}$`,
      url: productUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(productUrl);
      alert("Enlace copiado al portapapeles.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5001/consulta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSnackbar({ open: true, message: "Consulta enviada con éxito!", severity: "success" });
        setFormData({ correo: "", nombre: "", telefono: "", consulta: "" });
      } else {
        throw new Error("Error al enviar la consulta");
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Error al enviar consulta", severity: "error" });
    }
  };

  return (
    <div className="product-detail-container">
      {/* Thumbnail Gallery */}
      <div className="thumbnail-gallery">
        {images.map((img, index) => (
          <img
            key={index}
            src={`http://localhost:3000/react/tractores/${img}`}
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
          src={`http://localhost:3000/react/tractores/${selectedImage}`}
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
        <p className="price">Igv USD: {product.precio * product.igv}$</p>
        <p className="price">Precio s/: {product.precio * product.venta}$</p>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => addToCart(product)}
        >
          Agregar al carrito
        </Button>

        <p> </p>

        <Button variant="contained" color="primary" onClick={() => window.history.back()}>
          Volver
        </Button>

        <p> </p>

        <Button variant="contained" color="success" onClick={handleShare}>
          Compartir
        </Button>
      </div>

      {/* Inquiry Form */}
    <div className="inquiry-form">
      <h2>Consulta sobre este producto</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Correo"
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleInputChange}
          fullWidth
          required
          margin="dense"
        />
        <TextField
          label="Nombre"
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          fullWidth
          required
          margin="dense"
        />
        <TextField
          label="Teléfono"
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleInputChange}
          fullWidth
          required
          margin="dense"
        />
        <TextField
          label="Consulta"
          name="consulta"
          value={formData.consulta}
          onChange={handleInputChange}
          fullWidth
          required
          multiline
          rows={4}
          margin="dense"
        />
        <Button type="submit" variant="contained" color="primary">
          Enviar Consulta
        </Button>
      </form>
    </div>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </div>
  );
}

export default ProductoDetallePage;
