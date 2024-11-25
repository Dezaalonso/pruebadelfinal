import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./css/Signup.css";
import axios from "axios";

function SignUp() {
  // State for form data
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  // Validate email input
  const validateEmailInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const feedbackElement = document.getElementById("emailFeedback");

    if (emailRegex.test(formData.username)) {
      feedbackElement.textContent = ""; // Email is valid
    } else {
      feedbackElement.textContent = "Please enter a valid email address.";
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
    if (formData.username && formData.password) {
      navigate("/SignUp/Datos", { state: formData });
    } else {
      alert("Please fill in all fields before continuing.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
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
        <h2>Registrarse</h2>
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
            placeholder="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="button" onClick={goToNewPage} className="btn">
            Registrarse
          </button>
        </form>

        <p>
          Ya tienes una cuenta?{" "}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "signInPrompt active" : "signInPrompt"
            }
          >
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
