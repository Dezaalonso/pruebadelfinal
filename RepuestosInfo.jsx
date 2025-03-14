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
  const [cotizaciones, setCotizaciones] = useState(0);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const language = localStorage.getItem("language") || "0";

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
  }, [familiaId]);

  const handleCotizar = async (product) => {

    const payload = {
      userId: "",
      productId: product.cod_producto,
      description: product.descripcion,
      brand: product.marca,
      model: product.modelo,
      stock: product.stock_f,
      price: product.vvta_us,
    };

    try {
      const response = await fetch("http://127.0.0.1:5001/cotizaciones", {
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

  // Pagination Logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="containerr">
      <h1>{translations[language].Productos}</h1>
      <div className="product-list">
        {currentProducts.map((product) => (
          <Card key={product.cod_producto} className="product-card">
            <CardContent>
              <Typography variant="h6">{product.descripcion}</Typography>
              <Typography>{translations[language].Marca} {product.marca}</Typography>
              <Typography>{translations[language].Modelo} {product.modelo}</Typography>
              {product.stock_f > 0 ? (
                <Typography>{translations[language].StockD}</Typography>
              ) : (
                <Typography>{translations[language].StockN}</Typography>
              )}
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

      {/* Pagination Controls */}
      <Pagination
        count={Math.ceil(products.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        className="pagination"
      />
    </div>
  );
}
