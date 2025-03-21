import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import "./css/Buscar_codigos.css";

export default function SearchPage() {
  const [code, setCode] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [cotizaciones, setCotizaciones] = useState(0);
  const language = (localStorage.getItem("language") || "0");
  const token = localStorage.getItem("token");

  const translations = {
    "0": { // Spanish
      Productos: "Buscar Producto por Código",
      Buscar: "Ingrese el código exacto del producto porfavor",
      Tipo: "Buscar",
      Marca: "Marca:",
      Modelo: "Modelo:",
      StockD: "Stock: Disponible",
      StockN: "Stock: No Disponible",
      Cotizar: "Cotizar Producto",
      Asesor: "Contactarse con un asesor",
      Disponibles: "No tienes cotizaciones disponibles."
    },
    "1": { // English
      Productos: "Search Product by Code",
      Buscar: "Introduce the exact code of the product please",
      Tipo: "Search",
      Marca: "Brand:",
      Modelo: "Model:",
      StockD: "Stock: Available",
      StockN: "Stock: Not Available",
      Cotizar: "Make a Quote",
      Asesor: "Contact a salesperson",
      Disponibles: "No more quotes available."
    }
  };

  useEffect(() => {
    const storedCotizaciones = localStorage.getItem("cotizaciones");
    window.scrollTo(0, 0);
    if (storedCotizaciones) {
      setCotizaciones(parseInt(storedCotizaciones, 10));
    }
  }, []);

  const handleSearch = () => {
    if (!code) return;
    setLoading(true);
    setError(null);

    fetch(`http://127.0.0.1:5001/producto/${code}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error fetching products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
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

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="buscar">
      <h1>{translations[language].Productos}</h1>
      <div className="input-container">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={translations[language].Buscar}
        />
      </div>
      <button onClick={handleSearch}>{translations[language].Tipo}</button>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      <div className="results">
        {currentProducts.map((product) => (
          <Card key={product.cod_producto} className="result-card">
            <CardContent>
              <Typography variant="h6">{product.descripcion}</Typography>
              <Typography>{translations[language].Marca} {product.marca}</Typography>
              <Typography>{translations[language].Modelo} {product.modelo}</Typography>
              {product.stock_f > 0 ?(
                <Typography>{translations[language].StockD}</Typography>
              ) : (
                <Typography>{translations[language].StockN}</Typography>
              )}
              {cotizaciones > 0 ? (
                <>
                  {product.vvta_us > 0 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleCotizar(product)}
                    >
                      {translations[language].Cotizar}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleCotizar(product)}
                    >
                      {translations[language].Asesor}
                    </Button>
                  )}
                </>
              ) : (
                <Typography color="textSecondary">
                  {translations[language].Disponibles}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length > 0 && (
        <Pagination
          count={Math.ceil(products.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          className="pagination"
        />
      )}
    </div>
  );
}
