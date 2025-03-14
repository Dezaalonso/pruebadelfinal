import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactSearchBox from "react-search-box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import "./css/producto1.css"; // Import the CSS file

export default function ProductGroups() {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const language = (localStorage.getItem("language") || "0");

  const translations = {
    "0": { // Spanish
      Productos: "Productos y Repuestos",
      Buscar: "Buscar con Codigos",
      Tipo: "Buscar tipos de productos"
    },
    "1": { // English
      Productos: "Products and Spare Parts",
      Buscar: "Search with Codes",
      Tipo: "Search types of products in spanish"
    }
  };

  useEffect(() => {
        window.scrollTo(0, 0);
      });

  useEffect(() => {
    fetch("http://127.0.0.1:5001/familia")
      .then((res) => res.json())
      .then((data) => setGroups(data))
      .catch((err) => console.error("Error fetching groups:", err));
  }, []);

  const Buscar_Codigos = ()=>{
    window.location.href = "/Buscar_Codigos";
  }

  const handleNavigation = (familiaId) => {
    navigate(`/repuestos/${familiaId}`);
  };

  return (
    <div className="container">
      <div className="row">
        <h1>{translations[language].Productos}</h1>
        <button onClick={(Buscar_Codigos)}>{translations[language].Buscar}</button>
      </div>
      
      <ReactSearchBox
        placeholder={translations[language].Tipo}
        data={groups.map((group) => ({
          key: group.familia,
          value: group.nom_familia
        }))}
        onSelect={(record) => handleNavigation(record.item.key)} // Corrected here
      />
      <div className="group-list">
        {groups.map((group) => (
          <Card key={group.familia} className="group-card">
            <CardContent>
              <Button
                variant="contained"
                className="button w-full"
                onClick={() => handleNavigation(group.familia)}
              >
                {group.nom_familia}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
