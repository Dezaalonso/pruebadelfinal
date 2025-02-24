import { useState, useEffect } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from "@mui/material";
import * as XLSX from "xlsx";

export default function Cotizaciones() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [clientName, setClientName] = useState("");

  useEffect(() => {
    const storedList = localStorage.getItem("cotizacionesList");
    if (storedList) {
      setCotizaciones(JSON.parse(storedList));
    }
  }, []);

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(cotizaciones);
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
          cotizaciones,
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
                  <TableCell>Precio</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cotizaciones.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.descripcion}</TableCell>
                    <TableCell>{product.marca}</TableCell>
                    <TableCell>{product.modelo}</TableCell>
                    <TableCell>${product.vvta_us}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div style={{ marginTop: "20px" }}>
            <TextField
              label="Nombre del Cliente"
              variant="outlined"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              fullWidth
            />
          </div>

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Enviar Cotización
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleDownloadExcel}>
              Descargar Excel
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
