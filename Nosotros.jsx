import React from "react";
import "./css/Nosotros.css";

function Nosotros() {
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

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
          <h2>QUIENES SOMOS</h2>
          <p>
            Peru Tractor SRL, una empresa fundada en 1995 con capital
            estrictamente peruano, para ofrecer atención personalizada a cada
            cliente.
          </p>
          <p>
            Empresa dedicada a la venta de repuestos, maquinaria pesada usada,
            también alquilamos y reparamos. Tenemos un stock permanente de la
            línea Caterpillar®.
          </p>
          <p>
            Actualmente está consolidado como líder del sector, es reconocida
            como una TOP "Mejores empresas del Perú", ganadora de premios como
            la empresa peruana del año según estudios de opinión y Mercado.
          </p>
        </div>
        <div className="image-content">
          <img
            src="https://perutractor.com/img-productos/secciones/nosotros.jpg"
            alt="About Us"
          />
        </div>
        <hr />
      </div>

      {/* Section 2: Vision */}
      <div id="section2" className="section section-with-image">
        <div className="text-content">
          <h2>NUESTRA VISION</h2>
          <p>
            Fortalecer nuestro liderazgo en el mercado peruano, a fin de
            contribuir al éxito de nuestros clientes y alcanzar nuestras metas
            de crecimiento.
          </p>
        </div>
        <div className="image-content">
          <img
            src="https://perutractor.com/img-productos/secciones/vision.jpg"
            alt="Our Vision"
          />
        </div>
        <hr />
      </div>

      {/* Section 3: Mission */}
      <div id="section3" className="section section-with-image">
        <div className="text-content">
          <h2>NUESTRA MISION</h2>
          <p>
            Comercializar repuestos de maquinaria pesada para la marca
            Caterpillar®, en el mercado peruano a precios competitivos y
            excelentes tiempos de entrega.
          </p>
        </div>
        <div className="image-content">
          <img
            src="https://perutractor.com/img-productos/secciones/mision.jpg"
            alt="Our Mission"
          />
        </div>
        <hr />
      </div>
    </div>
  );
}

export default Nosotros;
