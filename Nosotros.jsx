import React, { useState, useEffect } from "react";
import "./css/Nosotros.css";

function Nosotros() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const language = (localStorage.getItem("language") || "0");

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const translations = {
    "0": { // Spanish
      NOSOTROS: "ACERCA DE NOSOTROS",
      VISION: "NUESTRA VISION",
      MISION: "NUESTRA MISION"
    },
    "1": { // English
      NOSOTROS: "ABOUT US",
      VISION: "OUR VISION",
      MISION: "OUR MISION"
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const apiUrl = "http://127.0.0.1:5001/data";

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setContent(data);
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
    <div className="no">
      {/* Secondary Top Bar */}
      <nav className="top-bar">
        <a onClick={() => handleScroll("section1")} className="link">
          {translations[language].NOSOTROS}
        </a>
        <a onClick={() => handleScroll("section2")} className="link">
          {translations[language].VISION}
        </a>
        <a onClick={() => handleScroll("section3")} className="link">
          {translations[language].MISION}
        </a>
      </nav>

      {/* Section 1: About Us */}
      <div id="section1" className="section section-with-image">
        <div className="text-content1">
          <h3>-----</h3>
          <h2>{language == 0 ? content.aboutUs.title: content.aboutUs.title_ing}</h2>
          <div dangerouslySetInnerHTML={{ __html: language == 0 ? content.aboutUs.paragraphs: content.aboutUs.paragraphs_ing}} />
        </div>
        <div className="image-content">
          <img
            src={`http://localhost:3000/secciones/${content.aboutUs.image}`}
            alt="About Us"
          />
        </div>
        <hr />
      </div>

      {/* Section 2: Vision */}
      <div id="section2" className="section section-with-image">
        <div className="text-content">
          <h2>{language == 0 ? content.vision.title: content.vision.title_ing}</h2>
          <div dangerouslySetInnerHTML={{ __html: language == 0 ? content.vision.paragraphs: content.vision.paragraphs_ing }} />
        </div>
        <div className="image-content">
          <img
            src={`http://localhost:3000/secciones/${content.vision.image}`}
            alt="Our Vision"
          />
        </div>
        <hr />
      </div>

      {/* Section 3: Mission */}
      <div id="section3" className="section section-with-image">
        <div className="text-content">
          <h2>{language == 0 ? content.mission.title: content.mission.title_ing}</h2>
          <div dangerouslySetInnerHTML={{ __html: language == 0 ? content.mission.paragraphs: content.mission.paragraphs_ing }} />
        </div>
        <div className="image-content">
          <img
            src={`http://localhost:3000/secciones/${content.mission.image}`}
            alt="Our Mission"
          />
        </div>
        <hr />
      </div>
    </div>
  );
}

export default Nosotros;
