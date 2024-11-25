  import React, { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import './css/producto2.css'; // Import the CSS file

  function Producto2() {
    const [itemsMap, setItemsMap] = useState(new Map());

    useEffect(() => {
      const simulatedApiResponse = [
        {
          tipo: "Motor",
          datos: {
            nombre: "rxk mama",
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgfsIuV9BPkBr2zvk3NxPjr2dm2aWMwzZKfg&s",
            descripcion: "Descripcion del motor",
            precio: 2222222
          }
        },
        {
          tipo: "Motor",
          datos: {
            nombre: "rxz lucas",
            imagen: "https://importfcb.com/wp-content/uploads/2022/10/motor-electrico-monofasico-1hp-en-alta-BM80C-2.jpg",
            descripcion: "Descripcion del motor",
            precio: 2222222
          }
        },
        {
          tipo: "Excavadora",
          datos: {
            nombre: "Excavadora1",
            imagen: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR4vYyHlLtYazHCRWDVksbbWAn-pV3jfLHtw6bT91dhGAwEtcXkFh5GTbZ7e-wesSNbkJPnS4do3fzfNWIvsGz2uDpa1i8SQkdDu0zLMjs",
            descripcion: "Descripcion de la excavadora",
            precio: 300000000
          }
        },
        {
          tipo: "Excavadoras de Cadenas",
          datos: {
            nombre: "EXCAVADORA 325CL Cat MOTOR 3126 SERIE CRBOO245",
            imagen: "https://perutractor.com/img-productos/tractores/325c.jpg",
            descripcion: "UBICADO calle los viquez Mz A lote 10 urb Carapomgo HUAOSCHIPA (ESPALDA ZOOLOGICO HUACHIPA)CON INYECTORES NUEVOS TOTALMENTE REPARADOSPISTONES DE LOS BASTAGOS  CROMADOS  Y REPARADOS TOTALMENTE.",
            precio: 550000
          }
        },

        {
          tipo: "Carro",
          datos: {
            nombre: "Fua",
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqAIdpSgPeWh4_R8BGrXPZ6be-nSH4wTykmg&s",
            descripcion: "Descripcion del Camion",
            precio: 3
          }
        },

        {
          tipo: "Cargadores",
          datos: {
            nombre: "Fua",
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqAIdpSgPeWh4_R8BGrXPZ6be-nSH4wTykmg&s",
            descripcion: "Descripcion del Camion",
            precio: 3
          }
        },
    
        {
          tipo: "Camion",
          datos: {
            nombre: "Fua",
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqAIdpSgPeWh4_R8BGrXPZ6be-nSH4wTykmg&s",
            descripcion: "Descripcion del Camion",
            precio: 3
          }
        }
      ];

      setTimeout(() => {
        const map = new Map();
        simulatedApiResponse.forEach(item => {
          if (!map.has(item.tipo)) {
            map.set(item.tipo, []);
          }
          map.get(item.tipo).push({
            nombre: item.datos.nombre,
            imagen: item.datos.imagen,
            descripcion: item.datos.descripcion,
            precio: item.datos.precio
          });
        });

        setItemsMap(map);
      }, 200);
    }, []);

    return (
      <div>
        <h1>Items</h1>
        <div className="cards">
          {Array.from(itemsMap.keys()).map((tipo, index) => {
            const items = itemsMap.get(tipo);
            const firstItem = items[0]; // Get the first item of this type for the image
            return (
              <Link
                to={`/producto/${tipo}`}
                key={index}
                state={{ products: items }}
                className="card-link"
              >
                <div className="card">
                  <h2>{tipo}</h2>
                  <img src={firstItem.imagen} alt={tipo} className="card-image" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  export default Producto2;
