import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import "./Logo.css";
import 'font-awesome/css/font-awesome.min.css';
import logo from './resources/blanco.jpg'; // Your logo path

function Logo() {
  const token = localStorage.getItem("token"); // Check for token to show login/profile

  return (
    <div className="logo-login-container">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo-image" />
        </Link>
      </div>
      <NavLink to={token ? "/profile" : "/SignUp"} className="nav-link" activeClassName="active">
        <i className="fa fa-fw fa-user"></i> {token ? "Perfil" : "Registrarse"}
      </NavLink>
    </div>
  );
}

export default Logo;
