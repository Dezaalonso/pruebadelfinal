import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./css/Logo.css";
import 'font-awesome/css/font-awesome.min.css';
import logo from './resources/blanco.jpg'; // Your logo path

function Logo() {
  const token = localStorage.getItem("nombre"); // Check for token to show login/profile
  const [cotizaciones, setCotizaciones] = useState(null);

  useEffect(() => {
    const storedCotizaciones = localStorage.getItem("cotizaciones");
    if (storedCotizaciones) {
      setCotizaciones(storedCotizaciones);
    }
  }, []); // Runs once when component mounts

  const Callto = ({ phone, children }) => {
    return <a href={`tel:${phone}`}>{children}</a>;
  };

  const openEmail = () => {
    const recipient = "example@example.com";
    const subject = encodeURIComponent("Subject Here");
    const body = encodeURIComponent("Please fill the following detail:\n\n1. Detail 1\n2. Detail 2\n3. Detail 3");
  
    // Check if default email client exists (mailto)
    try {
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    } catch (e) {
      // Fallback to Outlook Web App
      window.open(
        `https://outlook.office.com/mail/deeplink/compose?to=${recipient}&subject=${subject}&body=${body}`,
        '_blank'
      );
    }
  };

  return (
    <div className="logo-login-container">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo-image" />
        </Link>
      </div>

      {/* Display only if cotizaciones exists */}
      {cotizaciones > 0 &&(
        <div>
          <h3 className="cantt">
            Tienes hasta {cotizaciones} consultas
          </h3>
        </div>
      )}
      {cotizaciones == 0 && (
        <div>
          <h3 className="cantt">
            Ya no puedes hacer mas consultas, contacta a 
            ventas@perutractor.com
          </h3>
        </div>
      )}

      <div>
        <h3 className="cantt">
          <a href="#" color="red" onClick={openEmail}>ventas@perutractor.com</a>
        </h3>
        <Callto phone="+51976450153">+51 976 450 153</Callto>
      </div>

      <NavLink to={token ? "/profile" : "/SignUp"} className="nav-link" activeClassName="active">
        <i className="fa fa-fw fa-user"></i> {token ? "Perfil" : "Registrarse"}
      </NavLink>
    </div>
  );
}

export default Logo;
