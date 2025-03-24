import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Slide } from 'react-slideshow-image';
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-slideshow-image/dist/styles.css';
import "./css/Home.css";

function Home() {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [tractors, setTractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const language = localStorage.getItem("language") || "0";

  const theme = createTheme({
    palette: {
      primary: {
        main: '#FF5733', // Custom salmon color
      },
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const [bannersRes, tractorsRes] = await Promise.all([
          fetch("http://127.0.0.1:5001/banner"),
          fetch("http://127.0.0.1:5001/tractores")
        ]);

        if (!bannersRes.ok || !tractorsRes.ok) throw new Error("Failed to fetch data");

        const bannersData = await bannersRes.json();
        const tractorsData = await tractorsRes.json();

        setBanners(bannersData.map(item => `http://localhost:3000/banners/${item.banner}`));
        setTractors(tractorsData.map(item => ({
          cod_tractor: item.cod_tractor,
          cod_cate: item.cod_catractores,
          name: item.nombre,
          image: `http://localhost:3000/tractores/${item.imagen}`,
          price: item.precio
        })));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const translations = {
    "0": { // Spanish
      ourMachinery: "Nuestras Maquinarias",
      viewMore: "Ver más de nuestros productos",
      aboutUs: "Sobre Nosotros",
      Producto: "Caracteristicas"
    },
    "1": { // English
      ourMachinery: "Our Machinery",
      viewMore: "View More Products",
      aboutUs: "About Us",
      Producto: "Characteristics"
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ThemeProvider theme={theme}>
      <>
        <Slide>
          {banners.map((image, index) => (
            <div className="each-slide-effect" key={index}>
              <div style={{ backgroundImage: `url(${image})` }} />
            </div>
          ))}
        </Slide>

        <div className="tractors-container">
          <h1>{translations[language].ourMachinery}</h1>
          <div className="tractors-wrapper">
            {tractors.map((tractor, index) => (
              <div className="tractor-card" key={index}>
                <img src={tractor.image} alt={tractor.name} className="tractor-image" />
                <h2 className="tractor-name">{tractor.name}</h2>
                <p className="tractor-price">${tractor.price}</p>
                <Button
                  variant="contained"
                  color="primary" // Uses the theme color
                  onClick={() => navigate(`/detalle-producto/${tractor.cod_cate}/${tractor.cod_tractor}`)}
                >
                  {translations[language].Producto}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <button className="navigate-button" onClick={() => navigate('/maquinaria')}>
          {translations[language].viewMore}
        </button>

        <div className="video-container">
          <h1>{translations[language].aboutUs}</h1>
          <div className="video-wrapper">
            {["6MdPbytsyN4", "eAv3CElbwoY"].map((videoId, index) => (
              <iframe
                key={index}
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`Embedded youtube ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </>
    </ThemeProvider>
  );
}

export default Home;
