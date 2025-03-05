import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./css/Contac.css";

function Contactos() {
  const location = useLocation();

  // State for form fields
  const [correo, setCorreo] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [name, setName] = useState("");
  const [ruc, setRuc] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [consulta, setConsulta] = useState(""); // New state for consulta

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate required fields
    if (!correo.trim()) newErrors.correo = "el correo es requerido.";
    if (!name.trim()) newErrors.name = "Name or Company is required.";
    if (!phone.trim()) newErrors.phone = "Phone is required.";
    if (!consulta.trim()) newErrors.consulta = "Consulta is required."; // Validate consulta



    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const payload = {
        correo, 
        name,
        phone,
        consulta, // Include consulta in the payload
        header: "Consulta"
      };

      try {
        const response = await fetch("http://127.0.0.1:5001/consulta", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          alert("Form submitted successfully!");
          console.log("Server Response:", data);
        } else {
          const errorData = await response.json();
          alert("Failed to submit form. " + errorData.message);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form.");
      }
    }
  };

  return (
    <div className="con">
      <h1>Contactenos</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="correo">Correo: </label>
        <input
          name="correo"
          id="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)} // Corrected to setCorreo
          placeholder="Correo"
        />
        {errors.correo && <p className="error">{errors.correo}</p>} 

        <label htmlFor="name">Nombre o Empresa: </label>
        <input
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name or company"
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label htmlFor="phone">Teléfono: </label>
        <input
          name="phone"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Teléfono"
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <label htmlFor="consulta">Consulta: </label>
        <textarea
          rows="6" 
          cols="65"
          name="consulta"
          id="consulta"
          value={consulta}
          onChange={(e) => setConsulta(e.target.value)} // Controlled textarea
          placeholder="Escriba su consulta aquí"
        />
        {errors.consulta && <p className="error">{errors.consulta}</p>} 

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Contactos;