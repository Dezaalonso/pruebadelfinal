import { useState, useEffect } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from "@mui/material";
import * as XLSX from "xlsx";

export default function Cotizaciones() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [clientName, setClientName] = useState("");
  const [quantities, setQuantities] = useState({});
  const TAX_RATE = 0.18; // 18% tax

  useEffect(() => {
    const storedList = localStorage.getItem("cotizacionesList");
    if (storedList) {
      const parsedList = JSON.parse(storedList);
      setCotizaciones(parsedList);

      // Initialize quantities with default value of 1
      const initialQuantities = {};
      parsedList.forEach((product) => {
        initialQuantities[product.cod_producto] = 1;
      });
      setQuantities(initialQuantities);
    }
  }, []);

  const handleDownloadExcel = () => {
    const data = cotizaciones.map((product) => ({
      Descripción: product.descripcion,
      Marca: product.marca,
      Modelo: product.modelo,
      Precio: `$${product.vvta_us}`,
      Cantidad: quantities[product.cod_producto] || 1,
      Subtotal: `$${(quantities[product.cod_producto] || 1) * product.vvta_us}`,
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

    // Remove quantity reference
    const updatedQuantities = { ...quantities };
    delete updatedQuantities[cod_producto];
    setQuantities(updatedQuantities);
  };

  const handleQuantityChange = (cod_producto, value) => {
    const newQuantity = Math.max(1, Number(value)); // Ensure min quantity is 1
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
  const taxAmount = totalBeforeTax * TAX_RATE;
  const totalWithTax = totalBeforeTax + taxAmount;

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
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Subtotal</TableCell>
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
                    <TableCell>
                      <TextField
                        type="number"
                        value={quantities[product.cod_producto] || 1}
                        onChange={(e) => handleQuantityChange(product.cod_producto, e.target.value)}
                        inputProps={{ min: 1 }}
                        style={{ width: "60px" }}
                      />
                    </TableCell>
                    <TableCell>${(quantities[product.cod_producto] || 1) * product.vvta_us}</TableCell>
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
            <h3>Impuesto (18%): ${taxAmount.toFixed(2)}</h3>
            <h2>Total: ${totalWithTax.toFixed(2)}</h2>
          </div>

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
