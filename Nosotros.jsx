import React, { useState, useEffect } from "react";
import "./css/Nosotros.css";

function Nosotros() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
        window.scrollTo(0, 0);
      });

  useEffect(() => {
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
          ACERCA DE NOSOTROS
        </a>
        <a onClick={() => handleScroll("section2")} className="link">
          NUESTRA VISION
        </a>
        <a onClick={() => handleScroll("section3")} className="link">
          NUESTRA MISION
        </a>
      </nav>

      {/* Section 1: About Us */}
      <div id="section1" className="section section-with-image">
        <div className="text-content1">
          <h3>-----</h3>
          <h2>{content.aboutUs.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: content.aboutUs.paragraphs }} />
        </div>
        <div className="image-content">
          <img
            src={`http://localhost/react/secciones/${content.aboutUs.image}`}
            alt="About Us"
          />
        </div>
        <hr />
      </div>

      {/* Section 2: Vision */}
      <div id="section2" className="section section-with-image">
        <div className="text-content">
          <h2>{content.vision.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: content.vision.paragraphs }} />
        </div>
        <div className="image-content">
          <img
            src={`http://localhost/react/secciones/${content.vision.image}`}
            alt="Our Vision"
          />
        </div>
        <hr />
      </div>

      {/* Section 3: Mission */}
      <div id="section3" className="section section-with-image">
        <div className="text-content">
          <h2>{content.mission.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: content.mission.paragraphs }} />
        </div>
        <div className="image-content">
          <img
            src={`http://localhost/react/secciones/${content.mission.image}`}
            alt="Our Mission"
          />
        </div>
        <hr />
      </div>
    </div>
  );
}

export default Nosotros;
