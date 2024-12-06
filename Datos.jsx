import React, { useState } from "react";
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
    if (!name.trim()) newErrors.name = "Name or Company is required.";
    if (!ruc.trim()) newErrors.ruc = "RUC is required.";
    if (!address.trim()) newErrors.address = "Address is required.";
    if (!phone.trim()) newErrors.phone = "Phone is required.";
    if (!country) newErrors.country = "Country is required.";
    if (!region) newErrors.region = "Region is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const payload = {
        name,
        ruc,
        address,
        phone,
        country,
        region,
        email: formData?.username,
        password: formData?.password,
      };

      try {
        const response = await fetch("http://127.0.0.1:5001/correo", {
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

        <label htmlFor="ruc">Ruc: </label>
        <input
          name="ruc"
          id="ruc"
          value={ruc}
          onChange={(e) => setRuc(e.target.value)}
          placeholder="0000000000"
        />
        {errors.ruc && <p className="error">{errors.ruc}</p>}

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
  );
}

export default DataPage;
