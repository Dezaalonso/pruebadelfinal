import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./css/styles.css";
import Logo from './Logo';
import TopBar from './TopBar';
import Home from './Home';
import Contact from './Contact';
import Producto1 from './producto1';
import Producto2 from './producto2';
import EndBar from './EndBar';
import ProductoDetalle from './ProductoDetalle';
import SignUp from './Signup';
import Datos from './Datos';
import Nosotros from './Nosotros';
import Profile from './profile';
import ShoppingCartDrawer from './ShoppingCartDrawer'; // Import the drawer
import { useShoppingCart } from './ShoppingCartContext'; // Import the cart context
import ProductoDetallePage from "./ProductoDetallePage";
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function App() {
  const { toggleDrawer } = useShoppingCart(); // Access the toggle function from context

  return (
    <BrowserRouter>
      {/* Logo at the top */}
      <Logo />

      {/* Top bar (navigation, etc.) */}
      <TopBar />

      {/* Cart Icon for the Drawer */}

      {/* Shopping Cart Drawer */}
      <ShoppingCartDrawer />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repuestos" element={<Producto1 />} />
        <Route path="/maquinaria" element={<Producto2 />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/producto/:tipo" element={<ProductoDetalle />} />
        <Route
          path="/detalle-producto/:tipo/:nombre"
          element={<ProductoDetallePage />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/SignUp/Datos" element={<Datos />} />
      </Routes>

      {/* Footer */}
      <EndBar />
    </BrowserRouter>
  );
}

export default App;