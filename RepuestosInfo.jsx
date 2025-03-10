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

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    const storedCotizaciones = localStorage.getItem("cotizaciones");
    if (storedCotizaciones) {
      setCotizaciones(parseInt(storedCotizaciones, 10));
    }

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
    if (cotizaciones <= 0) return;

    const id = localStorage.getItem("id");
    if (!id) {
      alert("No ID found in localStorage.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5001/decrease_cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }), // Correctly sending as an object
      });

      if (!response.ok) {
        throw new Error("Failed to update cotizaciones.");
      }

      const newCotizaciones = cotizaciones - 1;
      setCotizaciones(newCotizaciones);
      localStorage.setItem("cotizaciones", newCotizaciones.toString());

      const storedList = localStorage.getItem("cotizacionesList");
      const cotizacionesList = storedList ? JSON.parse(storedList) : [];
      cotizacionesList.push(product);
      localStorage.setItem("cotizacionesList", JSON.stringify(cotizacionesList));

      alert("Producto agregado a cotización.");
      window.location.reload(false)
    } catch (error) {
      console.error("Error updating cotizaciones:", error);
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
      <h1>Productos y Repuestos</h1>
      <div className="product-list">
        {currentProducts.map((product) => (
          <Card key={product.cod_producto} className="product-card">
            <CardContent>
              <Typography variant="h6">{product.descripcion}</Typography>
              <Typography>Marca: {product.marca}</Typography>
              <Typography>Modelo: {product.modelo}</Typography>
              <Typography>Stock: {product.stock_f}</Typography>
              {cotizaciones > 0 && (
                <>
                  {product.vvta_us > 0 &&(
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleCotizar(product)}
                  >
                    Cotizar Producto
                  </Button>)}
                  {product.vvta_us == 0 &&(
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleCotizar(product)}
                  >
                    Contactarse con un Asesor 
                  </Button>)}
                </>
              )}
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
