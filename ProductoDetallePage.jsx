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
  const language = (localStorage.getItem("language") || "0");

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

  const translations = {
    "0": { // Spanish
      Serie: "Serie: ",
      Año: "Año de Fabricación: ",
      Horas: "Nº Horas: ",
      Dolares: "Precio USD: ",
      IGV: "IGV % USD: ",
      Soles: "Total S/.: ",
      Carrito: "Agregar al carrito",
      Volver: "Volver",
      Compartir: "Compartir",
      Consulta_producto: "Consultar sobre este producto",
      Correo: "Correo",
      Nombre: "Nombres",
      Telefono: "Teléfono",
      Consulta: "Consulta",
      Enviar: "Enviar Consulta"
    },
    "1": { // English
      Serie: "Serie: ",
      Año: "Year of production: ",
      Horas: "Nº Hours: ",
      Dolares: "Price USD: ",
      IGV: "IGV % USD: ",
      Soles: "Total S/.: ",
      Carrito: "Add to cart",
      Volver: "Go back",
      Compartir: "Share",
      Consulta_producto: "Get in touch about this product",
      Correo: "Email",
      Nombre: "Names",
      Telefono: "Phone",
      Consulta: "Consultation",
      Enviar: "Send consultation"
    }
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
            src={`http://localhost:3000/tractores/${img}`}
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
          src={`http://localhost:3000/tractores/${selectedImage}`}
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
        <p className="price">{translations[language].Serie} {product.serie}</p>
        <p className="price">{translations[language].Año} {product.año}</p>
        <p className="price">{translations[language].Horas} {product.horas}</p>
        <p className="price">{translations[language].Dolares} {product.precio}$</p>
        <p className="price">{translations[language].IGV} {product.precio * product.igv}$</p>
        <p className="price">{translations[language].Soles} {product.precio * product.venta}$</p>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => addToCart(product)}
        >
          {translations[language].Carrito}
        </Button>

        <p> </p>

        <Button variant="contained" color="primary" onClick={() => window.history.back()}>
        {translations[language].Volver}
        </Button>

        <p> </p>

        <Button variant="contained" color="success" onClick={handleShare}>
        {translations[language].Compartir}
        </Button>
      </div>

      {/* Inquiry Form */}
    <div className="inquiry-form">
      <h2>{translations[language].Consulta_producto}</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label={translations[language].Correo}
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleInputChange}
          fullWidth
          required
          margin="dense"
        />
        <TextField
          label={translations[language].Nombre}
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          fullWidth
          required
          margin="dense"
        />
        <TextField
          label={translations[language].Telefono}
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleInputChange}
          fullWidth
          required
          margin="dense"
        />
        <TextField
          label={translations[language].Consulta}
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
        {translations[language].Enviar}
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
