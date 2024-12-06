import React from "react";
import "./css/TopBar.css";
import "font-awesome/css/font-awesome.min.css";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "./ShoppingCartContext"; // Import the cart context
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function TopBar() {
  const token = localStorage.getItem("token");
  const { cart, toggleDrawer } = useShoppingCart(); // Access cart and drawer toggle

  return (
    <div className="navbar">
      {/* Home Link */}
      <NavLink to="/" className="nav-link" activeClassName="active">
        <i className="fa fa-fw fa-home"></i> Inicio
      </NavLink>

      <NavLink to="/maquinaria" className="nav-link" activeClassName="active">
      <i class="fa fa-wrench" aria-hidden="true"></i> Repuestos
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

      {/* Cart Icon with Drawer */}
      <div className="carro">
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
