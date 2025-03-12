import React from 'react';
import './css/EndBar.css';

const EndBar = () => {
    const language = (localStorage.getItem("language") || "0");

    const translations = {
        "0": { // Spanish
            Síguenos: "Síguenos a través de:",
            Oficinas: "Nuestras Oficinas:",
            Principal: "LOCAL PRINCIPAL:",
            Huachipa : "Taller de Huachipa",
            Arriola: "Taller de Arriola",
            Arequipa: "Local de Arequipa"
        },
        "1": { // English
            Síguenos: "Follow us in our social media",
            Oficinas: "Our Offices:",
            Principal: "MAIN HEADQUARTERS:",
            Huachipa : "Huachipa Workshop",
            Arriola: "Arriola Workshop",
            Arequipa: "Arequipa Office"
        }
      };
    return (
        <footer className="footer">
            <div className="social-links">
                <p className="footer-title">{translations[language].Síguenos}</p>
                <div className="column">
                <a
                    href="https://www.facebook.com/PeruTractor/?locale=es_LA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link"
                >
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
                <a
                    href="https://x.com/i/flow/login?redirect_after_login=%2Fperutractor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link"
                >
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
                <a
                    href="https://wa.me/+51976450153"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link"
                >
                    <i className="fa fa-whatsapp" aria-hidden="true"></i>
                </a>
                <a
                    href="https://www.youtube.com/channel/UC8cNOBTBV7G57gJpBpfamSw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link"
                >
                    <i className="fa fa-youtube-play" aria-hidden="true"></i>
                </a>
                </div>
            </div>
            <div>
                <p className="footer-title">{translations[language].Oficinas} </p>
                    <div className="locaciones">
                        <p>{translations[language].Principal} Av. Michael Faraday #475 Urb. Santa Rosa - Ate (Ref. al lado del mercado Santa Rosa)</p>
                        <p>{translations[language].Arriola} Pasaje. Nicolas Arriola 182 Block B Tienda 14-B La Victoria en la rotonda del ovalo</p>
                        <p>{translations[language].Arequipa} Av.Variante de Uchumayo Km 4 (Via de Evitamiento) Cerro Colorado</p>
                        <p>{translations[language].Huachipa} Calle Los Viquez Mz. A Lt. 10 Urb. Carapongo Huachipa final Ramiro Priale pasando puente derecha(Ref. al lado del mercado Santa Rosa)</p>
                    </div>
            </div>
        </footer>
    );
};

export default EndBar;
