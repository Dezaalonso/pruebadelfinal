import React from "react";
import "./css/TopBar.css";
import "font-awesome/css/font-awesome.min.css";
import { NavLink } from "react-router-dom";

function TopBar() {
  const token = localStorage.getItem("token");

  return (
    <div className="navbar">
      {/* Home Link */}
      <NavLink to="/" className="nav-link" activeClassName="active">
        <i className="fa fa-fw fa-home"></i> Inicio
      </NavLink>

      {/* Dropdown Menu */}
      <div className="dropdown">
        <button className="dropbtn">
          <i className="fa fa-caret-down"></i> Buscar
        </button>
        <div className="dropdown-content">
          <NavLink to="/repuestos" className="nav-link" activeClassName="active">
            Repuestos
          </NavLink>
          <NavLink to="/maquinaria" className="nav-link" activeClassName="active">
            Maquinas y Motores
          </NavLink>
        </div>
      </div>

      {/* Contact Link */}
      <NavLink to="/nosotros" className="nav-link" activeClassName="active">
        <i class="fa fa-users" aria-hidden="true"></i> Nosotros 
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
        <NavLink to="/Cart" className="nav-link" activeClassName="active">
        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        </NavLink>
      </div>
    </div>
  );
}

export default TopBar;
