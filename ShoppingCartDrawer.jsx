import React from "react";
import { useShoppingCart } from "./ShoppingCartContext";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function ShoppingCartDrawer() {
  const { cart, removeFromCart, isDrawerOpen, toggleDrawer } = useShoppingCart();
  const token = localStorage.getItem("token");

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={() => toggleDrawer(false)}
    >
      <div style={{ width: 300, padding: 16 }}>
        <Typography variant="h6" style={{ marginBottom: 16 }}>
          Tus compras
        </Typography>
        {cart.length === 0 ? (
          <p>esta vacio.</p>
        ) : (
          cart.map((product, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 16,
                borderBottom: "1px solid #ddd",
                paddingBottom: 8,
              }}
            >
              <h4>{product.nombre}</h4>
              <img
                src={product.imagen}
                alt={product.descripcion}
                style={{ width: "100%", borderRadius: 8 }}
              />
              <p>{product.descripcion}</p>
              <p><strong>Precio:</strong> {product.precio}</p>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => removeFromCart(index)}
              >
                Remover
              </Button>
            </div>
          ))
        )}
        <Button 
          variant="contained"
          color="primary"
          onClick={() => toggleDrawer(false)}
          style={{ marginTop: 16 }}
        >
          Cerrar
        </Button>
      </div>
    </Drawer>
  );
}

export default ShoppingCartDrawer;