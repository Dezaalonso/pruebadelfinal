import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import "./css/RepuestosInfo.css";

export default function RepuestosInfo() {
  const { familiaId } = useParams(); // Get familiaId from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cotizaciones, setCotizaciones] = useState(0);

  useEffect(() => {
    // Get cotizaciones from localStorage
    const storedCotizaciones = localStorage.getItem("cotizaciones");
    if (storedCotizaciones) {
      setCotizaciones(parseInt(storedCotizaciones, 10));
    }

    // Fetch product data
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
    if (cotizaciones <= 0) return; // Prevent negative values

    const payload = localStorage.getItem("id")

    try {
      // Call API to decrease cotizaciones count
      const response = await fetch("http://127.0.0.1:5001/decrease_cotizacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Send decrement request
      });

      if (!response.ok) {
        throw new Error("Failed to update cotizaciones.");
      }

      // Update localStorage and state
      const newCotizaciones = cotizaciones - 1;
      setCotizaciones(newCotizaciones);
      localStorage.setItem("cotizaciones", newCotizaciones.toString());

      // Get existing cotizaciones list from localStorage
      const storedList = localStorage.getItem("cotizacionesList");
      const cotizacionesList = storedList ? JSON.parse(storedList) : [];

      // Add new product to the list
      cotizacionesList.push(product);
      localStorage.setItem("cotizacionesList", JSON.stringify(cotizacionesList));

      alert("Producto agregado a cotización.");
    } catch (error) {
      console.error("Error updating cotizaciones:", error);
      alert("Error al cotizar el producto.");
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className="containerr">
      <h1>Productos</h1>
      <div className="product-list">
        {products.map((product) => (
          <Card key={product.cod_producto} className="product-card">
            <CardContent>
              <Typography variant="h6">{product.descripcion}</Typography>
              <Typography>Marca: {product.marca}</Typography>
              <Typography>Modelo: {product.modelo}</Typography>
              <Typography>Stock: {product.stock_f}</Typography>
              {cotizaciones > 0 && (
                <>
                  <Typography>Precio: ${product.vvta_us}</Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleCotizar(product)}
                  >
                    Cotizar Producto
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
