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
  const token = localStorage.getItem("token");

  const [client, setClient] = useState({
    nombre: "",
    email: "",
    direccion: "",
    telefono: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5001/perfil", {
          method: "GET",
          headers: { Authorization: `${token}` },
        });

        if (!response.ok) {
          localStorage.clear();
          navigate("/login");
        } else {
          const data = await response.json();
          setClient({
            id: data.id,
            nombre: data.nombre,
            email: data.email,
            direccion: data.direccion_empresa,
            telefono: data.telefono_empresa,
          });
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        localStorage.clear();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [navigate, token]);

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:5001/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
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
    navigate("/login");
    window.location.reload(false)
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
