import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";

export default function Pedido() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData; // Retrieve order data passed from Cotizaciones

  useEffect(() => {
    if (!orderData) {
      navigate("/cotizaciones"); // Redirect if there's no order data
    } else {
      sendOrderData(); // Send data to APIs if orderData is available
    }
  }, [orderData, navigate]);

  const sendOrderData = async () => {
    if (!orderData) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No autorizado");
      return;
    }

    try {
      // Send products + order ID to /pedido_detalles
      await fetch("http://127.0.0.1:5001/pedido_detalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: orderData.order_id,
          products: orderData.products,
        }),
      });

      // Send order ID + final price to /pedido_total
      await fetch("http://127.0.0.1:5001/pedido_total", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          order_id: orderData.order_id,
          total: orderData.total,
        }),
      });

      alert("Pedido enviado con éxito");
    } catch (error) {
      console.error("Error enviando pedido:", error);
      alert("Error al enviar el pedido");
    }
  };

  if (!orderData) return null; // Prevent rendering if no data

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4">Resumen del Pedido</Typography>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Modelo</strong></TableCell>
              <TableCell><strong>Precio (USD)</strong></TableCell>
              <TableCell><strong>Precio (Soles)</strong></TableCell>
              <TableCell><strong>Cantidad</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData.products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.Modelo}</TableCell>
                <TableCell>${product.Precio_Usd}</TableCell>
                <TableCell>S/{product.Precio_Soles}</TableCell>
                <TableCell>{product.Cantidad}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" style={{ marginTop: "20px" }}>
        <strong>Total (USD):</strong> ${orderData.total.USD}
      </Typography>
      <Typography variant="h6">
        <strong>Total (Soles):</strong> S/{orderData.total.Soles}
      </Typography>

      <Button 
        variant="contained" 
        color="primary" 
        style={{ marginTop: "20px" }} 
        onClick={() => navigate("/cotizaciones")}
      >
        Volver a Cotizaciones
      </Button>
    </div>
  );
}
