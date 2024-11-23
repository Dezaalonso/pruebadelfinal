import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./styles.css";
import Logo from './Logo';
import TopBar from './TopBar';
import Home from './Home';
import Search from './Search';
import Contact from './Contact';
import Producto1 from './producto1';
import Producto2 from './producto2';
import EndBar from './EndBar';
import ProductoDetalle from './ProductoDetalle';
import SignUp from './Signup';
import Datos from './Datos'
import Nosotros from './Nosotros'
import Cart from './Cart'

function App() {
  return (
    <BrowserRouter>
      <Logo />
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/repuestos" element={<Producto1 />} />
        <Route path="/search/maquinaria" element={<Producto2 />} />
        <Route path="/producto/:tipo" element={<ProductoDetalle />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/SignUp/Datos" element={<Datos />} />
      </Routes>
      <EndBar />
    </BrowserRouter>
  );
}

export default App;