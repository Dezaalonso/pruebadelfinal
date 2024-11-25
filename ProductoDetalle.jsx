import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import './css/ProductoDetalle.css'; // Add a new CSS file for styling
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};

function ProductoDetalle() {
  const { tipo } = useParams();
  const location = useLocation();
  const { products } = location.state || {}; // Access all products passed via state

  // Modal state
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  if (!products || products.length === 0) {
    return <p>No products available for "{tipo}".</p>;
  }

  return (
    <div>
      <h1>{tipo}</h1>
      <div className="product-detail-cards">
        {products.map((product, index) => (
          <div
            key={index}
            className="product-detail-card"
            onClick={() => handleOpen(product)} // Open modal on card click
          >
            <h2>{product.nombre}</h2>
            <img src={product.imagen} alt={product.descripcion} className="product-image" />
            <p>{product.descripcion}</p>
            <p>Precio: {product.precio}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          {selectedProduct && (
            <>
              <Typography id="modal-title" variant="h6" component="h2">
                {selectedProduct.nombre}
              </Typography>
              <img
                src={selectedProduct.imagen}
                alt={selectedProduct.descripcion}
                style={{ maxWidth: "100%", borderRadius: "10px", marginTop: "10px" }}
              />
              <Typography id="modal-description" sx={{ mt: 2 }}>
                {selectedProduct.descripcion}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Precio:</strong> {selectedProduct.precio}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClose}
                style={{ marginTop: "20px" }}
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default ProductoDetalle;
