import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import "./css/Datos.css";

function DataPage() {
  const location = useLocation();
  const formData = location.state;


  // State for form fields
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [name, setName] = useState("");
  const [ruc, setRuc] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate required fields
    if (!name.trim()) newErrors.name = "Nombre o Compañia es requerido.";
    if (!address.trim()) newErrors.address = "Direccion es requerido.";
    if (!phone.trim()) newErrors.phone = "Telefono es requerido.";
    if (!country) newErrors.country = "Pais es requerido.";
    if (!region) newErrors.region = "Region es requerido.";

    // Validate RUC only if the country is Peru
    if (country === "Peru" && !ruc.trim()) {
      newErrors.ruc = "RUC is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const payload = {
        name,
        address,
        ruc: country === "Peru" ? ruc : null, // Only include RUC if th e country is Peru
        phone,
        country,
        region,
        email: formData?.username,
        password: formData?.password,
      };

      try {
        const response = await fetch("http://127.0.0.1:5001/registrar", {
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
    <div className="es">
      <div clasName="Forms"> 
        <h3>Informacion Adicional</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre o Empresa: </label>
          <input
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name or company"
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <label htmlFor="country">Pais: </label>
          <div>
            <CountryDropdown
              value={country}
              onChange={(val) => setCountry(val)}
              className="dropdown"
            />
            {errors.country && <p className="error">{errors.country}</p>}
            <RegionDropdown
              country={country}
              value={region}
              onChange={(val) => setRegion(val)}
              className="dropdown"
            />
            {errors.region && <p className="error">{errors.region}</p>}
          </div>

          {country === "Peru" && ( // Show RUC field only if the country is Peru
            <>
              <label htmlFor="ruc">Ruc: </label>
              <input
                name="ruc"
                id="ruc"
                value={ruc}
                onChange={(e) => setRuc(e.target.value)}
                placeholder="0000000000"
              />
              {errors.ruc && <p className="error">{errors.ruc}</p>}
            </>
          )}

          <label htmlFor="address">Direccion: </label>
          <input
            name="address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
          />
          {errors.address && <p className="error">{errors.address}</p>}

          <label htmlFor="phone">Telefono: </label>
          <input
            name="phone"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
          />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="image">
      <img
            src={`C:/Users/Contador/Music/paginaweb-perutractor/frontend/public/photo-daros.jpeg`}
            alt="Our Mission"
          />
      </div>
    </div>
  );
}

export default DataPage;
