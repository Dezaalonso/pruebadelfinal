import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './css/producto2.css';

function Producto2() {
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const language = localStorage.getItem("language") || "0";

  const translations = {
    "0": { // Spanish
      Maquinarias: "Maquinarias",
      Cantidad: "Cantidad"
    },
    "1": { // English
      Maquinarias: "Machinery",
      Cantidad: "Quantity"
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const apiUrl = "http://127.0.0.1:5001/tractores_tipo"; // API for fetching only tipo data

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTipos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>

      <div className="cards">
        {tipos.map((tipo) => (
          <Link
            to={`/producto/${tipo.cod_catractores}`}
            key={tipo.codigo}
            className="card-link"
          >
            <div className="card"> 
              <h2>{language === "0" ? tipo.nombre : tipo.nombre_ing}</h2>
              <img
                src={`/categoria-tractores/${tipo.imagen}`}
                alt={tipo.nombre}
                className="card-image"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Producto2;
