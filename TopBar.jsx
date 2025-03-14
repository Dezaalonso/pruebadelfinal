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
  const language = (localStorage.getItem("language") || "0");


  const translations = {
    "0": { // Spanish
      Inicio: "Inicio",
      Repuestos: "Repuestos",
      Maquinaria: "Maquinaria",
      Nosotros: "Nosotros",
      Contactanos: "Contactanos",
      Perfil: "Perfil",
      Registrarse: "Registrarse"
    },
    "1": { // English
      Inicio: "Home",
      Repuestos: "Spare Parts",
      Maquinaria: "Machinary",
      Nosotros: "Us",
      Contactanos: "Contact Us",
      Perfil: "Profile",
      Registrarse: "Sign in"
    }
  };

  return (
    
    <div className="navbar">
      {/* Home Link */}
      <NavLink to="/" className="nav-link" activeClassName="active">
        <i className="fa fa-fw fa-home"></i> {translations[language].Inicio}
      </NavLink>

      <NavLink to="/repuestos" className="nav-link" activeClassName="active">
        <i class="fa fa-cog" aria-hidden="true"></i> {translations[language].Repuestos}
      </NavLink>

      <NavLink to="/maquinaria" className="nav-link" activeClassName="active">
        <i class="fa fa-truck" aria-hidden="true"></i> {translations[language].Maquinaria}
      </NavLink>

      {/* Contact Links */}
      <NavLink to="/nosotros" className="nav-link" activeClassName="active">
        <i className="fa fa-users" aria-hidden="true"></i> {translations[language].Nosotros}
      </NavLink>

      <NavLink to="/contact" className="nav-link" activeClassName="active">
        <i className="fa fa-fw fa-envelope"></i> {translations[language].Contactanos}
      </NavLink>

      {/* Conditional Links for Logged-in Users */}
      {token ? (
        <NavLink to="/profile" className="nav-link" activeClassName="active">
          <i className="fa fa-fw fa-user"></i> {translations[language].Perfil}
        </NavLink>
      ) : (
        <NavLink to="/SignUp" className="nav-link" activeClassName="active">
          <i className="fa fa-fw fa-sign-in"></i> {translations[language].Registrarse}
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
