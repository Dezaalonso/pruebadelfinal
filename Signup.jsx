import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./css/Signup.css";
import axios from "axios";
import validator from 'validator';

function SignUp() {
  // State for form data
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  useEffect(() => {
        window.scrollTo(0, 0);
      });
  
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const language = (localStorage.getItem("language") || "0");

  const validate = (value) => { 
    if (validator.isStrongPassword(value, { 
        minLength: 8, minLowercase: 1, 
        minUppercase: 1, minNumbers: 1, minSymbols: 0
    })) { 
        setErrorMessage(''); // Clear error message if password is strong
        setIsPasswordValid(true);
        return true; // Password is strong
    } else { 
        setErrorMessage('Minimo: 1 Mayuscula, 1 numero '); 
        setIsPasswordValid(false);
        return false; // Password is not strong
    } 
  }; 

  const navigate = useNavigate();

  const translations = {
    "0": { // Spanish
        Cuenta: "Ya tienes una cuenta?",
        Inicia: "Inicia Sesión",
        Registrate : "Registrate",
        Contrseña: "Contrseña"
    },
    "1": { // English
      Cuenta: "Already have an account?",
      Inicia: "Log In",
      Registrate : "Register",
      Contrseña: "Password"
    }
  };

  // Validate email input
  const validateEmailInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const feedbackElement = document.getElementById("emailFeedback");

    if (emailRegex.test(formData.username)) {
      feedbackElement.textContent = ""; // Email is valid
      setIsEmailValid(true);
    } else {
      feedbackElement.textContent = "Please enter a valid email address.";
      setIsEmailValid(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Navigate to new page and pass data
  const goToNewPage = () => {
    if (isEmailValid && isPasswordValid) {
      navigate("/SignUp/Datos", { state: formData });
    } else {
      alert("Please fill in all fields correctly before continuing.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(formData.password)) {
      alert("Please enter a strong password."); // Alert if password is not strong
      return;
    }
    try {
      const response = await axios.post("/api/signup", formData); // Replace with your API endpoint
      console.log("Sign-up successful:", response.data);
      // Handle success (e.g., redirect or display message)
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-form">
        <h2>{translations[language].Registrate}</h2>
        <form onSubmit={handleSubmit}>
          <input
            id="emailInput"
            className="inputField"
            placeholder="Email"
            name="username"
            autoComplete="email"
            value={formData.username}
            onChange={handleChange}
            onBlur={validateEmailInput} /* Call validation on input blur */
          />
          <div id="emailFeedback" className="feedback"></div>

          <input
            className="inputField"
            placeholder={translations[language].Contrseña}
            type="password"
            name="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            onBlur={(e) => validate(e.target.value)}
          />
          <div className="error-message">{errorMessage}</div> {/* Display error message */}

          <button type="button" onClick={goToNewPage} className="btn" disabled={!isEmailValid || !isPasswordValid}>
          {translations[language].Registrate}
          </button>
        </form>

        <p>
        {translations[language].Cuenta}{" "}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "signInPrompt active" : "signInPrompt"
            }
          >
           {translations[language].Inicia}
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default SignUp;