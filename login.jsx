import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./css/Signup.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const language = (localStorage.getItem("language") || "0");

  // Scroll to top on render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Validar email
  const validateEmailInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setErrorMessage("");
      setIsEmailValid(true);
    } else {
      setErrorMessage("Por favor, introduce un email válido.");
      setIsEmailValid(false);
    }
  };

  const translations = {
    "0": { // Spanish
        Iniciar: "Iniciar Sesion",
        Ingresar: "Ingresar",
        Cuenta: "No tienes cuenta aun?",
        Registrate : "Registrate",
        Contrseña: "Contrseña"
    },
    "1": { // English
      Iniciar: "Sign In",
      Ingresar: "Log In",
      Cuenta: "Dont have an account?",
      Registrate : "Register",
      Contrseña: "Password"
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid) {
      alert("Por favor, introduce un email válido antes de continuar.");
      return;
    }
    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    const payload = { email, password };

    try {
      const response = await fetch("http://127.0.0.1:5001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();

      if (response.ok) {
        console.log("Server Response:", data);
        localStorage.setItem("cotizaciones", data.cotizaciones);
        localStorage.setItem("token", data.token); 
        
        // Redirect and refresh the page
        window.location.href = "/profile";
      } else {
        alert("Error: " + (data.error || "Credenciales incorrectas."));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Ocurrió un error al enviar el formulario.");
    }
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-form">
        <h2>{translations[language].Iniciar}</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="inputField"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmailInput}
          />
          {errorMessage && <div className="feedback">{errorMessage}</div>}

          <input
            className="inputField"
            placeholder={translations[language].Contrseña}
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">{translations[language].Ingresar}</button>
        </form>

        <p>
        {translations[language].Cuenta}{" "}
          <NavLink to="/signup" className="signInPrompt">
          {translations[language].Registrate}
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
