import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import "./css/producto1.css";

export default function RepuestosInfo() {
  const { familiaId } = useParams(); // Get familiaId from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className="container">
      <h1>Productos</h1>
      <div className="product-list">
        {products.map((product) => (
          <Card key={product.cod_producto} className="product-card">
            <CardContent>
              <Typography variant="h6">{product.descripcion}</Typography>
              <Typography>Marca: {product.marca}</Typography>
              <Typography>Modelo: {product.modelo}</Typography>
              <Typography>Stock: {product.stock_f}</Typography>
              <Typography>Precio: ${product.vvta_us}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
