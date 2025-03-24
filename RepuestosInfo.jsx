import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const itemsPerPage = 10;
  const language = localStorage.getItem("language") || "0";
  const token = localStorage.getItem("token");
  const cotizaciones = localStorage.getItem("cotizaciones");
  
  // Replace this with actual client ID if needed


  const translations = {
    "0": {
      Productos: "Productos y Repuestos",
      Marca: "Marca:",
      Modelo: "Modelo:",
      StockD: "Stock: Disponible",
      StockN: "Stock: No Disponible",
      Cotizar: "Cotizar Producto",
      Asesor: "Contactarse con un asesor",
      Token: "Inicia sesion para cotizar"
    },
    "1": {
      Productos: "Products and Spare Parts",
      Marca: "Brand:",
      Modelo: "Model:",
      StockD: "Stock: Available",
      StockN: "Stock: Not Available",
      Cotizar: "Make a Quote",
      Asesor: "Contact a salesperson",
      Token: "Sign in to make a quote"
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

  const handleLogout = () => {
    navigate("/login");
    window.location.reload(false)
  };

  const handleCotizar = async (product) => {
    const payload = {
      modelo: product.modelo,
      precio: product.vvta_us,
    };
  
    try {
      // Enviar cotización del producto
      const response = await fetch("http://127.0.0.1:5001/producto_consultado", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `${token}` },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send cotización.");
      }
  
      // Llamar a la API para disminuir stock
      const decreaseResponse = await fetch("http://127.0.0.1:5001/decrease_cotizacion", {
        method: "GET",
        headers: { Authorization: `${token}` },
      });
  
      if (!decreaseResponse.ok) {
        throw new Error("Failed to decrease stock.");
      }

      if (decreaseResponse.ok) {
        localStorage.setItem('cotizaciones', cotizaciones - 1);
        window.location.reload(false);
      }
  
      
    } catch (error) {
      console.error("Error:", error);
      alert("Error al procesar la cotización del producto.");
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
              {token ? (
                <Button
                  variant="contained"
                  color={product.vvta_us > 0 ? "primary" : "secondary"}
                  onClick={() => handleCotizar(product)}
                >
                {product.vvta_us > 0 ? translations[language].Cotizar : translations[language].Asesor}
              </Button>): 
              (<Button
                variant="contained"
                color="secondary"
                onClick={() => handleLogout()}
              >
              {translations[language].Token}
            </Button>)}
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
