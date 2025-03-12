import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./css/Logo.css";
import 'font-awesome/css/font-awesome.min.css';
import logo from './resources/blanco.jpg'; // Your logo path

function Logo() {
  const token = localStorage.getItem("token"); // Check for token to show login/profile
  const [cotizaciones, setCotizaciones] = useState(null);
  const language = (localStorage.getItem("language") || "0"); // Manage language state

  const translations = {
    "0": { // Spanish
      cotizaciones1: `Tienes hasta ${cotizaciones} consultas`,
      cotizaciones2: "Ya no puedes hacer más consultas, contacta a ventas@perutractor.com",
      perfil: "Perfil",
      reg: "Registrase"
    },
    "1": { // English
      cotizaciones1: `You have ${cotizaciones} quotes left`,
      cotizaciones2: "You can't make any more quotes, contact ventas@perutractor.com",
      perfil: "Profile",
      reg: "Sign up",
    }
  };

  // Toggle language function
  const changeLanguage = () => {
    const currentLang = localStorage.getItem("language") || "0"; // Default to Spanish
    const newLang = currentLang === "0" ? "1" : "0"; // Toggle language
    localStorage.setItem("language", newLang);
    window.location.reload(); // Refresh the page to apply changes
  };

  useEffect(() => { 
    const storedCotizaciones = localStorage.getItem("cotizaciones");
    if (storedCotizaciones) {
      setCotizaciones(storedCotizaciones);
    }
  }, []);

  const Callto = ({ phone, children }) => {
    return <a href={`tel:${phone}`}>{children}</a>;
  };

  const openEmail = () => {
    const recipient = "ventas@perutractor.com";
    const subject = encodeURIComponent("Consulta sobre maquinaria");
    const body = encodeURIComponent("Por favor, proporcione más detalles sobre la maquinaria disponible.");

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="logo-login-container">
      {/* Language Switcher with Images */}
      

      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo-image" />
        </Link>
      </div>

      <div className="language-toggle"> 
        <img 
          src={language === "0" ? "http://localhost:3000/react/imagenes/ingles.png" : "http://localhost:3000/react/imagenes/espanol.png"} 
          alt="Language Toggle" 
          onClick={changeLanguage}
          className="language-icon"
        />
        </div>

       {/* Display only if cotizaciones exists */}
       {cotizaciones > 0 &&(
        <div>
          <h3 className="cantt">
          {translations[language].cotizaciones1}
          </h3>
        </div>
      )}
      {cotizaciones == 0 && (
        <div>
          <h3 className="cantt">
          {translations[language].cotizaciones2}
          </h3>
        </div>
      )}

      <div>
        <h3 className="cantt">
          <a href="#" onClick={openEmail}>ventas@perutractor.com</a>
        </h3>
        <Callto phone="+51976450153">+51 976 450 153</Callto>
      </div>

      <NavLink to={token ? "/profile" : "/SignUp"} className="nav-link" activeClassName="active">
        <i className="fa fa-fw fa-user"></i> {token ? translations[language].perfil : translations[language].reg}
      </NavLink>
    </div>
  );
}

export default Logo;
