import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import "./Datos.css";

function DataPage() {
  const location = useLocation();
  const formData = location.state;

  // State for country and region
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  return (
    <div className="es">
      <h2>Data Page</h2>
      <p>Email: {formData?.username}</p>
      <p>Password: {formData?.password}</p>

      <h3>En donde se encuentra</h3>
      <div >
        <CountryDropdown
          value={country}
          onChange={(val) => setCountry(val)}
          className="dropdown"
        />
        <RegionDropdown
          country={country}
          value={region}
          onChange={(val) => setRegion(val)}
          className="dropdown"
        />
      </div>

      <p>
        Escoge su pais de origen: <strong>{country}</strong>
      </p>
      <p>
        Escoja su region: <strong>{region}</strong>
      </p>
    </div>
  );
}

export default DataPage;
