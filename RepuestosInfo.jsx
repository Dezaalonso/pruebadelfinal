import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import "./css/RepuestosInfo.css";

export default function RepuestosInfo() {
  const { familiaId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const language = localStorage.getItem("language") || "0";
  
  // Replace this with actual client ID if needed
  const cod_cliente = localStorage.getItem("cod_cliente") || "12345"; 

  const translations = {
    "0": {
      Productos: "Productos y Repuestos",
      Marca: "Marca:",
      Modelo: "Modelo:",
      StockD: "Stock: Disponible",
      StockN: "Stock: No Disponible",
      Cotizar: "Cotizar Producto",
      Asesor: "Contactarse con un asesor",
    },
    "1": {
      Productos: "Products and Spare Parts",
      Marca: "Brand:",
      Modelo: "Model:",
      StockD: "Stock: Available",
      StockN: "Stock: Not Available",
      Cotizar: "Make a Quote",
      Asesor: "Contact a salesperson",
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(`http://127.0.0.1:5001/familia/${familiaId}`)
      .then((res) => res.ok ? res.json() : Promise.reject("Error fetching products"))
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [familiaId]);

  const handleCotizar = async (product) => {
    const payload = {
      modelo: product.modelo,
      precio: product.vvta_us,
      cod_cliente: cod_cliente,
      fecha_creacion: new Date().toISOString().split("T")[0], // Format YYYY-MM-DD
    };

    try {
      const response = await fetch("http://127.0.0.1:5001/guardar_cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save cotización.");
      }

      alert("Producto agregado a cotización.");
    } catch (error) {
      console.error("Error saving cotización:", error);
      alert("Error al cotizar el producto.");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div className="containerr">
      <h1>{translations[language].Productos}</h1>
      <div className="product-list">
        {products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((product) => (
          <Card key={product.cod_producto} className="product-card">
            <CardContent>
              <Typography variant="h6">{product.descripcion}</Typography>
              <Typography>{translations[language].Marca} {product.marca}</Typography>
              <Typography>{translations[language].Modelo} {product.modelo}</Typography>
              <Typography>{product.stock_f > 0 ? translations[language].StockD : translations[language].StockN}</Typography>
              <Button
                variant="contained"
                color={product.vvta_us > 0 ? "primary" : "secondary"}
                onClick={() => handleCotizar(product)}
              >
                {product.vvta_us > 0 ? translations[language].Cotizar : translations[language].Asesor}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Pagination
        count={Math.ceil(products.length / itemsPerPage)}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        color="primary"
        className="pagination"
      />
    </div>
  );
}
