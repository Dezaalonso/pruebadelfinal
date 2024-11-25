import React, { useState, useEffect } from "react";
import './css/producto2.css'; // Import the CSS file

function Producto2() {
  const [itemsMap, setItemsMap] = useState(new Map());
  const [cart, setCart] = useState([]); // State for cart items
  const [isCartOpen, setIsCartOpen] = useState(false); // State for cart page visibility

  useEffect(() => {
    const simulatedApiResponse = [
      {
        tipo: "Motor",
        datos: {
          nombre: "rxk mama",
          imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgfsIuV9BPkBr2zvk3NxPjr2dm2aWMwzZKfg&s",
          descripcion: "Descripcion del motor",
          precio: 2222222,
        },
      },
      // More items here...
    ];

    setTimeout(() => {
      const map = new Map();
      simulatedApiResponse.forEach((item) => {
        if (!map.has(item.tipo)) {
          map.set(item.tipo, []);
        }
        map.get(item.tipo).push({
          nombre: item.datos.nombre,
          imagen: item.datos.imagen,
          descripcion: item.datos.descripcion,
          precio: item.datos.precio,
        });
      });
      setItemsMap(map);
    }, 200);
  }, []);

  // Add item to cart
  const addToCart = (item) => {
    setCart([...cart, item]);
    setIsCartOpen(true); // Open cart page when an item is added
  };

  return (
    <div>
      <h1>Items</h1>
      <div className="cards">
        {Array.from(itemsMap.keys()).map((tipo, index) => {
          const items = itemsMap.get(tipo);
          const firstItem = items[0];
          return (
            <div className="card" key={index}>
              <h2>{tipo}</h2>
              <img src={firstItem.imagen} alt={tipo} className="card-image" />
              <button onClick={() => addToCart(firstItem)}>Add to Cart</button>
            </div>
          );
        })}
      </div>

      {/* Full-page Cart Page Popup */}
      <div className={`cart-page ${isCartOpen ? "open" : ""}`}>
        <button className="close-cart" onClick={() => setIsCartOpen(false)}>
          Close
        </button>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.imagen} alt={item.nombre} className="cart-image" />
                <div>
                  <p>{item.nombre}</p>
                  <p>Price: ${item.precio}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Producto2;
