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

  useEffect(() => {
    fetch("http://127.0.0.1:5001/familia")
      .then((res) => res.json())
      .then((data) => setGroups(data))
      .catch((err) => console.error("Error fetching groups:", err));
  }, []);

  const handleNavigation = (familiaId) => {
    navigate(`/familia/${familiaId}`);
  };

  return (
    <div className="container">
      <h1>Productos y Repuestos</h1>
      <ReactSearchBox
        placeholder="Buscar tipos de productos..."
        data={groups.map((group) => ({ key: group.familia, value: group.nom_familia }))}
        onSelect={(record) => handleNavigation(record.key)}
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
