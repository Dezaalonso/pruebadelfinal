import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useShoppingCart } from "./ShoppingCartContext";
import "./css/ProductoDetallePage.css";
import Button from "@mui/material/Button";

function ProductoDetallePage() {
  const { tipo, nombre } = useParams();
  const { addToCart } = useShoppingCart();
  const language = localStorage.getItem("language") || "0";
  const [data, setData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  // Default image if no product image is found
  const defaultImage = "/tractores/default.jpg";

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5001/tractore/${nombre}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setData(data);
        setSelectedImage(data[0].imagen || defaultImage);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [tipo, nombre]);



  const [formData, setFormData] = useState({
    correo: "",
    header: "",
    name: "",
    phone: "",
    consulta: "",
  });

  const handleShare = async () => {
    const productUrl = window.location.href;
    const shareData = {
      title: data[0].nombre,
      text: `Mira este producto: ${data[0].nombre} - ${data[0].precio}$`,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.correo.trim()) newErrors.correo = "El correo es requerido.";
    if (!formData.name.trim()) newErrors.name = "Nombre o empresa es requerido.";
    if (!formData.phone.trim()) newErrors.phone = "Teléfono es requerido.";
    if (!formData.consulta.trim()) newErrors.consulta = "Consulta es requerida.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const payload = { ...formData, header: "Consulta" };

      try {
        const response = await fetch("http://127.0.0.1:5001/contactenos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          alert("Formulario enviado con éxito!");
          setFormData({ correo: "", name: "", phone: "", consulta: "" });
        } else {
          const errorData = await response.json();
          alert("Error al enviar: " + errorData.message);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Ocurrió un error al enviar el formulario.");
      }
    }
  };

  const translations = {
    "0": { // Spanish
      Serie: "Serie: ",
      Año: "Año de Fabricación: ",
      Horas: "Nº Horas: ",
      Dolares: "Precio USD: ",
      IGV: "IGV % USD: ",
      Soles: "Total S/: ",
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
      Soles: "Total S/: ",
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Product details not available for "{nombre}" in "{tipo}".</p>;

  const images = data[0].imagenes?.length > 0 ? data[0].imagenes : [defaultImage];

  return (
    
    <div className="product-detail-container">
      <h1>{data[0].nombre}</h1>
      {/* Thumbnail Gallery */}
      <div className="thumbnail-gallery">
        {images.map((img, index) => (
          <img
            key={index}
            src={`/tractores/${img}`}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setSelectedImage(img)}
            style={{ border: selectedImage === img ? "2px solid #007bff" : "none" }}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="product-image-container">
        <img src={`/tractores/${selectedImage}`} alt={data[0].descripcion} />
      </div>

      {/* Product Details */}
      <div className="product-details">
        <h1>{data[0].nombre}</h1>
        <div className="product-description" dangerouslySetInnerHTML={{ __html: data[0].descripcion }} />
        <p className="price">{translations[language].Serie} {data[0].serie}</p>
        <p className="price">{translations[language].Año} {data[0].año}</p>
        <p className="price">{translations[language].Horas} {data[0].horas}</p>
        <p className="price">{translations[language].Dolares} {data[0].precio}$</p>
        <p className="price">{translations[language].IGV} {data[0].precio * data[0].igv}$</p>
        <p className="price">{translations[language].Soles} {data[0].precio * data[0].compra}$</p>

        <Button variant="contained" color="secondary" onClick={() => addToCart(data[0])}>
          {translations[language].Carrito}
        </Button>
        <p></p>
        <Button variant="contained" color="primary" onClick={() => window.history.back()}>
          {translations[language].Volver}
        </Button>
        <p></p>
        <Button variant="contained" color="success" onClick={handleShare}>
          {translations[language].Compartir}
        </Button>
      </div>

      {/* Inquiry Form */}
      
    {/* Inquiry Form */}
<div className="con">
  <h1>{translations[language].Consulta_producto}</h1>
  <form onSubmit={handleSubmit}>
    {/* Correo (Email) */}
    <div>
      <label htmlFor="correo">{translations[language].Correo}</label>
      <input
        type="email"
        name="correo"
        id="correo"
        value={formData.correo}
        onChange={handleChange}
        placeholder={translations[language].Correo}
      />
      {errors.correo && <p className="error">{errors.correo}</p>}
    </div>

    {/* Nombre o Empresa */}
    <div>
      <label htmlFor="name">{translations[language].Nombre}</label>
      <input
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        placeholder={translations[language].Nombre}
      />
      {errors.name && <p className="error">{errors.name}</p>}
    </div>

    {/* Teléfono */}
    <div>
      <label htmlFor="phone">{translations[language].Telefono}</label>
      <input
        type="tel"
        name="phone"
        id="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder={translations[language].Telefono}
      />
      {errors.phone && <p className="error">{errors.phone}</p>}
    </div>

    {/* Consulta (Textarea) */}
    <div>
      <label htmlFor="consulta">{translations[language].Consulta}</label>
      <textarea
        rows="6"
        name="consulta"
        id="consulta"
        value={formData.consulta}
        onChange={handleChange}
        placeholder={translations[language].Consulta}
      />
      {errors.consulta && <p className="error">{errors.consulta}</p>}
    </div>

    <button type="submit">{translations[language].Enviar}</button>
  </form>
</div>
    </div>
  );
}

export default ProductoDetallePage;
