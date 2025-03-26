import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./css/styles.css";
import Logo from './Logo';
import TopBar from './TopBar';
import Home from './Home';
import Contact from './Contact';
import Producto1 from './producto1';
import Producto2 from './producto2';
import RepuestosInfo from "./RepuestosInfo";
import EndBar from './EndBar';
import ProductoDetalle from './ProductoDetalle';
import SignUp from './Signup';
import Datos from './Datos';
import Pedido from './Pedido';
import Nosotros from './Nosotros';
import Profile from './profile';
import ShoppingCartDrawer from './ShoppingCartDrawer'; // Import the drawer
import { useShoppingCart } from './ShoppingCartContext'; // Import the cart context
import ProductoDetallePage from "./ProductoDetallePage";
import Login from "./login";
import Cotizaciones from './Cotizaciones';
import Buscar_Codigos from './Buscar_codigos';

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
        <Route path="/repuestos/:familiaId" element={<RepuestosInfo />} />
        <Route path="/Buscar_codigos" element={<Buscar_Codigos />} />
        <Route
          path="/detalle-producto/:tipo/:nombre"
          element={<ProductoDetallePage />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Cotizaciones" element={<Cotizaciones />} />
        <Route path="/Pedido" element={<Pedido />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp/Datos" element={<Datos />} />
      </Routes>

      {/* Footer */}
      <EndBar />
    </BrowserRouter>
  );
}

export default App;