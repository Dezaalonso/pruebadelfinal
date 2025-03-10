import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField
} from "@mui/material";
import * as XLSX from "xlsx";

export default function Cotizaciones() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [clientName, setClientName] = useState("");
  const [quantities, setQuantities] = useState({});
  const [IGV, setIGV] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
          window.scrollTo(0, 0);
        });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5001/perfil", {
          method: "GET",
          headers: { Authorization: `${token}` },
        });

        if (!response.ok) {
          localStorage.clear();
          navigate("/login");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        localStorage.clear();
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate]);

  useEffect(() => {
    fetchIGVAndExchangeRate();

    const storedList = localStorage.getItem("cotizacionesList");
    if (storedList) {
      const parsedList = JSON.parse(storedList);
      setCotizaciones(parsedList);

      const initialQuantities = {};
      parsedList.forEach((product) => {
        initialQuantities[product.cod_producto] = 1;
      });
      setQuantities(initialQuantities);
    }
  }, []);

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

  const handleDownloadExcel = () => {
    const data = cotizaciones.map((product) => ({
      Descripción: product.descripcion,
      Marca: product.marca,
      Modelo: product.modelo,
      Precio_Usd: `$${product.vvta_us}`,
      Precio_Soles: `S/${(product.vvta_us * exchangeRate).toFixed(2)}`,
      Cantidad: quantities[product.cod_producto] || 1,
      Subtotal_Usd: `$${((quantities[product.cod_producto] || 1) * product.vvta_us).toFixed(2)}`,
      Subtotal_Soles: `S/${((quantities[product.cod_producto] || 1) * product.vvta_us * exchangeRate).toFixed(2)}`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cotizaciones");
    XLSX.writeFile(workbook, "cotizaciones.xlsx");
  };

  const handleSubmit = async () => {
    if (!clientName) {
      alert("Por favor, ingrese el nombre del cliente.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5001/submit_cotizaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientName,
          cotizaciones: cotizaciones.map((product) => ({
            ...product,
            cantidad: quantities[product.cod_producto] || 1,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar la cotización.");
      }

      alert("Cotización enviada correctamente.");
      localStorage.removeItem("cotizacionesList");
      setCotizaciones([]);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al enviar la cotización.");
    }
  };

  const handleDelete = (cod_producto) => {
    const updatedList = cotizaciones.filter((product) => product.cod_producto !== cod_producto);
    setCotizaciones(updatedList);
    localStorage.setItem("cotizacionesList", JSON.stringify(updatedList));

    const updatedQuantities = { ...quantities };
    delete updatedQuantities[cod_producto];
    setQuantities(updatedQuantities);
  };

  const handleQuantityChange = (cod_producto, value) => {
    const newQuantity = Math.max(1, Number(value));
    setQuantities({ ...quantities, [cod_producto]: newQuantity });
  };

  const calculateTotal = () => {
    let total = 0;
    cotizaciones.forEach((product) => {
      const quantity = quantities[product.cod_producto] || 1;
      total += quantity * product.vvta_us;
    });
    return total;
  };

  const totalBeforeTax = calculateTotal();
  const taxAmount = totalBeforeTax * IGV;
  const totalWithTax = totalBeforeTax + taxAmount;
  const totalInSoles = totalWithTax * exchangeRate;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mis Cotizaciones</h1>

      {cotizaciones.length === 0 ? (
        <p>No hay cotizaciones guardadas.</p>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Marca</TableCell>
                  <TableCell>Modelo</TableCell>
                  <TableCell>Precio (USD)</TableCell>
                  <TableCell>Precio (Soles)</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Subtotal (USD)</TableCell>
                  <TableCell>Eliminar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cotizaciones.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.descripcion}</TableCell>
                    <TableCell>{product.marca}</TableCell>
                    <TableCell>{product.modelo}</TableCell>
                    <TableCell>${product.vvta_us}</TableCell>
                    <TableCell>S/{(product.vvta_us * exchangeRate).toFixed(2)}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={quantities[product.cod_producto] || 1}
                        onChange={(e) => handleQuantityChange(product.cod_producto, e.target.value)}
                        inputProps={{ min: 1 }}
                        style={{ width: "60px" }}
                      />
                    </TableCell>
                    <TableCell>${((quantities[product.cod_producto] || 1) * product.vvta_us).toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" onClick={() => handleDelete(product.cod_producto)}>
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <h3>Subtotal: ${totalBeforeTax.toFixed(2)}</h3>
            <h3>Impuesto ({IGV * 100}%): ${taxAmount.toFixed(2)}</h3>
            <h2>Total: ${totalWithTax.toFixed(2)} | S/{totalInSoles.toFixed(2)}</h2>
          </div>

          <Button variant="contained" color="primary" onClick={() => setOpenForm(true)}>
            Guardar en Base de Datos
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleDownloadExcel}>
            Descargar Excel
          </Button>
        </>
      )}
    </div>
  );
}
