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

  useEffect(() => {
    const storedCotizaciones = localStorage.getItem("cotizaciones");
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
        body: JSON.stringify({ id }),
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
    } catch (error) {
      console.error("Error updating cotizaciones:", error);
      alert("Error al cotizar el producto.");
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
      <h1>Buscar Producto por Código</h1>
      <div className="input-container">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Ingrese el código exacto del producto porfavor"
        />
      </div>
      <button onClick={handleSearch}>Buscar</button>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      <div className="results">
        {currentProducts.map((product) => (
          <Card key={product.cod_producto} className="result-card">
            <CardContent>
              <Typography variant="h6">{product.descripcion}</Typography>
              <Typography>Marca: {product.marca}</Typography>
              <Typography>Modelo: {product.modelo}</Typography>
              <Typography>Stock: {product.stock_f}</Typography>
              {cotizaciones > 0 ? (
                <>
                  <Typography>Precio: ${product.vvta_us}</Typography>
                  {product.vvta_us > 0 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleCotizar(product)}
                    >
                      Cotizar Producto
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleCotizar(product)}
                    >
                      Contactarse con un Asesor
                    </Button>
                  )}
                </>
              ) : (
                <Typography color="textSecondary">
                  No tienes cotizaciones disponibles.
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
