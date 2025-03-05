import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Grid,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    margin: "auto",
    width: 500,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

function ClientProfile() {
  const classes = useStyles();
  const navigate = useNavigate();
  const clientId = localStorage.getItem("id");

  const [client, setClient] = useState({
    id: clientId,
    nombre: "",
    email: "",
    direccion: "",
    telefono: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:5001/user/${clientId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error("Error fetching client:", data.error);
        } else {
          setClient({
            id: clientId,
            nombre: data[0].name, // Adjusted field name to match API
            email: data[0].email,
            direccion: data[0].direcion, // Fixed field name
            telefono: data[0].telefono, // Fixed field name
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [clientId]);

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:5001/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Actualización exitosa") {
          alert("Perfil actualizado correctamente");
        } else {
          alert("Error al actualizar el perfil");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("Error en la actualización");
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) {
    return <Typography>Cargando información...</Typography>;
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h4">Editar Perfil</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="nombre"
          value={client.nombre}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Correo"
          name="email"
          value={client.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Dirección"
          name="direccion"
          value={client.direccion}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Teléfono"
          name="telefono"
          value={client.telefono}
          onChange={handleChange}
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit">
          Guardar Cambios
        </Button>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </form>
    </Paper>
  );
}

export default function Profile() {
  return (
    <Grid container justifyContent="center">
      <Grid item>
        <ClientProfile />
      </Grid>
    </Grid>
  );
}
