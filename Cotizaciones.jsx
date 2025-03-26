import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  IconButton,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import * as XLSX from "xlsx";

export default function Cotizaciones() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [IGV, setIGV] = useState(0.18);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();
  const language = (localStorage.getItem("language") || "0");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchCotizaciones(token);
    fetchIGVAndExchangeRate();
  }, [navigate]);

  const fetchCotizaciones = async (token) => {
    try {
      const response = await fetch("http://127.0.0.1:5001/consultas_producto", {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching cotizaciones");
      }

      const data = await response.json();
      setCotizaciones(data);

      // Initialize quantities
      const initialQuantities = {};
      data.forEach((product) => {
        initialQuantities[product.modelo] = 1;
      });
      setQuantities(initialQuantities);

      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const translations = {
    "0": { // Spanish
      Cotizaciones: "Mis Cotizaciones",
      Descripcion: "Descripción",
      Marca: "Marca",
      Modelo: "Modelo",
      Dolares: "Precio (USD)",
      Soles: "Precio (Soles)",
      Cantidad: "Cantidad",
      SubTotal: "SubTotal",
      Impuesto: "Impuesto",
      Excel: "Descargar en Excel",
      Pedido: "Hacer Pedido"
    },
    "1": { // English
      Cotizaciones: "My Quotes",
      Descripcion: "Description",
      Marca: "Brand",
      Modelo: "Model",
      Dolares: "Price (USD)",
      Soles: "Price (Soles)",
      Cantidad: "Quantity",
      Impuesto: "tax",
      Excel: "Dowload to Excel",
      Pedido: "Make the order"
    }
  };

  const fetchIGVAndExchangeRate = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5001/tipo_cambio");
      const data = await res.json();
      setIGV(data[0]?.igv || 0.18);
      setExchangeRate(data[0]?.exchangeRate || 1);
    } catch (error) {
      console.error("Error fetching IGV and exchange rate:", error);
    }
  };

  const handleDelete = async (modelo) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No autorizado");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5001/eliminar_producto", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ modelo }),
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }
      setCotizaciones(cotizaciones.filter((product) => product.modelo !== modelo));
    } catch (error) {
      console.error("Error eliminando:", error);
      alert("Error al eliminar");
    }
  };

  const handleMakeOrder = () => {
    const orderId = Math.floor(100000 + Math.random() * 900000);
    const products = cotizaciones.map((product) => ({
      Modelo: product.modelo,
      Precio_Usd: product.vta_us,
      Precio_Soles: (product.vta_us * exchangeRate).toFixed(2),
      Cantidad: quantities[product.modelo] || 1,
      Stock: product.stock_f,
    }));

    const totalUSD = products.reduce((sum, item) => sum + item.Precio_Usd * item.Cantidad, 0);
    const totalSoles = totalUSD * exchangeRate;

    const orderData = {
      order_id: orderId,
      products,
      total: {
        USD: totalUSD.toFixed(2),
        igv: (totalUSD * exchangeRate).toFixed(2),
        Soles: totalSoles.toFixed(2)
      }
    };

    navigate("/Pedido", { state: { orderData } });
  };
  

  const handleDownloadExcel = () => {
    const data = cotizaciones.map((product) => ({
      Descripción: product.descripcion,
      Marca: product.marca,
      Modelo: product.modelo,
      Precio_Usd: `$${product.vta_us}`,
      Precio_Soles: `S/${(product.vta_us * exchangeRate).toFixed(2)}`,
      Cantidad: quantities[product.modelo] || 1,
      Subtotal_Usd: `$${((quantities[product.modelo] || 1) * product.vta_us).toFixed(2)}`,
      Subtotal_Soles: `S/${((quantities[product.modelo] || 1) * product.vta_us * exchangeRate).toFixed(2)}`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cotizaciones");
    XLSX.writeFile(workbook, "cotizaciones.xlsx");
  };

  const handleQuantityChange = (modelo, value) => {
    const newQuantity = Math.max(1, Number(value));
    setQuantities({ ...quantities, [modelo]: newQuantity });
  };

  const calculateTotal = () => {
    return cotizaciones.reduce((total, product) => {
      const quantity = quantities[product.modelo] || 1;
      return total + quantity * product.vta_us;
    }, 0);
  };

  const totalBeforeTax = calculateTotal();
  const taxAmount = totalBeforeTax * IGV;
  const totalWithTax = totalBeforeTax + taxAmount;
  const totalInSoles = totalWithTax * exchangeRate;

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{translations[language].Cotizaciones}</h1>

      {cotizaciones.length === 0 ? (
        <p>No hay cotizaciones guardadas.</p>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{translations[language].Descripcion}</TableCell>
                  <TableCell>{translations[language].Marca}</TableCell>
                  <TableCell>{translations[language].Modelo}</TableCell>
                  <TableCell>{translations[language].Dolares}</TableCell>
                  <TableCell>{translations[language].Soles}</TableCell>
                  <TableCell>{translations[language].Cantidad}</TableCell>
                  <TableCell>Subtotal (USD)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cotizaciones.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.descripcion}</TableCell>
                    <TableCell>{product.marca}</TableCell>
                    <TableCell>{product.modelo}</TableCell>
                    <TableCell>${product.vta_us}</TableCell>
                    <TableCell>S/{(product.vta_us * exchangeRate).toFixed(2)}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={quantities[product.modelo] || 1}
                        onChange={(e) => handleQuantityChange(product.modelo, e.target.value)}
                        inputProps={{ min: 1, max: product.stock_f }}
                        style={{ width: "60px" }}
                      />
                    </TableCell>
                    <TableCell>
                      ${((quantities[product.modelo] || 1) * product.vta_us).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <DeleteIcon onClick={() => handleDelete(product.modelo)} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <h3>Subtotal: ${totalBeforeTax.toFixed(2)}</h3>
            <h3>{translations[language].Impuesto} ({(IGV * 100).toFixed(2)}%): ${taxAmount.toFixed(2)}</h3>
            <h2>Total: ${totalWithTax.toFixed(2)} | S/{totalInSoles.toFixed(2)}</h2>
          </div>

          <Button variant="contained" color="primary" onClick={handleDownloadExcel}>
          {translations[language].Excel}
          </Button>
          <p></p>
          <Button variant="contained" color="primary" onClick={handleMakeOrder}>
          {translations[language].Pedido}
          </Button>
        </>
      )}
    </div>
  );
}
