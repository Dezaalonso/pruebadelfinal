import React from "react";
import "./css/TopBar.css";
import "font-awesome/css/font-awesome.min.css";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "./ShoppingCartContext"; // Import the cart context
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function TopBar() { 
  const token = localStorage.getItem("nombre");
  const { cart, toggleDrawer } = useShoppingCart(); // Access cart and drawer toggle

  return (
    <div className="navbar">
      {/* Home Link */}
      <NavLink to="/" className="nav-link" activeClassName="active">
        <i className="fa fa-fw fa-home"></i> Inicio
      </NavLink>

      <NavLink to="/repuestos" className="nav-link" activeClassName="active">
        <i class="fa fa-cog" aria-hidden="true"></i> Repuestos
      </NavLink>

      <NavLink to="/maquinaria" className="nav-link" activeClassName="active">
        <i class="fa fa-truck" aria-hidden="true"></i> Maquinaria
      </NavLink>

      {/* Contact Links */}
      <NavLink to="/nosotros" className="nav-link" activeClassName="active">
        <i className="fa fa-users" aria-hidden="true"></i> Nosotros
      </NavLink>

      <NavLink to="/contact" className="nav-link" activeClassName="active">
        <i className="fa fa-fw fa-envelope"></i> Contactanos
      </NavLink>

      {/* Conditional Links for Logged-in Users */}
      {token ? (
        <NavLink to="/profile" className="nav-link" activeClassName="active">
          <i className="fa fa-fw fa-user"></i> Perfil
        </NavLink>
      ) : (
        <NavLink to="/SignUp" className="nav-link" activeClassName="active">
          <i className="fa fa-fw fa-sign-in"></i> Registrarse
        </NavLink>
      )}
      <div className="carro">
      {token ? (
        <NavLink to="/Cotizaciones" className="nav-link" activeClassName="active">
          <i class="fa fa-file-text" aria-hidden="true"></i> 
        </NavLink>
      ):( <></>)}

      {/* Cart Icon with Drawer */}
      
        <IconButton onClick={() => toggleDrawer(true)}>
          <Badge badgeContent={cart.length} color="secondary">
            <ShoppingCartIcon className="cart-icon" />
          </Badge>
        </IconButton>
      </div>
    </div>
  );
}

export default TopBar;
