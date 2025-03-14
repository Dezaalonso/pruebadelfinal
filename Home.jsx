import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./css/Home.css";
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';

function Home() {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [tractors, setTractors] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [loadingTractors, setLoadingTractors] = useState(true);
  const [errorBanners, setErrorBanners] = useState(null);
  const [errorTractors, setErrorTractors] = useState(null);
  const language = (localStorage.getItem("language") || "0");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5001/banner");
        if (!response.ok) throw new Error("Failed to fetch banners");
        const data = await response.json();
        setBanners(data.map(item => `http://localhost:3000/banners/${item.banner}`));
      } catch (err) {
        setErrorBanners(err.message);
      } finally {
        setLoadingBanners(false);
      }
    };

    const fetchTractors = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5001/tractores");
        if (!response.ok) throw new Error("Failed to fetch tractors");
        const data = await response.json();
        setTractors(data.map(item => ({
          name: item.nombre,
          image: `http://localhost:3000/tractores/${item.imagen}`,
          price: item.precio
        })));
      } catch (err) {
        setErrorTractors(err.message);
      } finally {
        setLoadingTractors(false);
      }
    };

    fetchBanners();
    fetchTractors();
  }, []);

  const translations = {
    "0": { // Spanish
      ourMachinery: "Nuestras Maquinarias",
      viewMore: "Ver más de nuestros productos",
      aboutUs: "Sobre Nosotros",
      switchLanguage: "Switch to English"
    },
    "1": { // English
      ourMachinery: "Our Machinery",
      viewMore: "View More Products",
      aboutUs: "About Us",
      switchLanguage: "Cambiar a Español"
    }
  };

  

  if (loadingBanners || loadingTractors) return <div>Loading...</div>;
  if (errorBanners || errorTractors) return <div>{errorBanners || errorTractors}</div>;

  return (
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
          <iframe
            width="853"
            height="480"
            src="https://www.youtube.com/embed/6MdPbytsyN4"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube 1"
          />
          <iframe
            width="853"
            height="480"
            src="https://www.youtube.com/embed/eAv3CElbwoY"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube 2"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
