import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './css/producto2.css'; // Import the CSS file

function Producto2() {
  const [itemsMap, setItemsMap] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = "http://127.0.0.1:5001/info";

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // Group items by tipo.nombre
        const map = new Map();
        data.forEach(item => {
          const tipoNombre = item.tipo.nombre;
          const tipoImagen = item.tipo.imagen;

          if (!map.has(tipoNombre)) {
            map.set(tipoNombre, { items: [], tipoImagen });
          }

          // Check if the image is missing or empty, then set default
          if (!item.datos.imagen || item.datos.imagen.trim() === "") {
            item.datos.imagen = 'blanco.jpg';
          }

          map.get(tipoNombre).items.push({
            nombre: item.datos.nombre,
            imagen: item.datos.imagen,
            imagen2: item.datos.imagen2,
            imagen3: item.datos.imagen3,
            serie: item.datos.serie,
            descripcion: item.datos.caracteristicas,
            precio: item.datos.precio,
            año: item.datos.año,
            horas: item.datos.horas,
            venta: item.datos.venta,
            igv: item.datos.igv
          });
        });
        setItemsMap(map);
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
      <h1>Maquinarias</h1>
      <div className="cards">
        {Array.from(itemsMap.entries()).map(([tipoNombre, { items, tipoImagen }], index) => (
          <Link
            to={`/producto/${tipoNombre}`}
            key={index}
            state={{ products: items }}
            className="card-link"
          >
            <div className="card"> 
              <h2>{tipoNombre}</h2>
              <img
                src={`http://localhost/react/categoria-tractores/${tipoImagen}`} // Use tipoImagen for the card image
                alt={tipoNombre}
                className="card-image"
              />
              <p className="product-count">Cantidad: {items.length}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Producto2;
