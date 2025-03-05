import React from 'react';
import './css/EndBar.css';

const EndBar = () => {
    return (
        <footer className="footer">
            <div className="social-links">
                <p className="footer-title">Síguenos a través de:</p>
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
                <p className="footer-title">Nuestras Oficinas: </p>
                    <div className="locaciones">
                        <p>LOCAL PRINCIPAL: Av. Michael Faraday #475 Urb. Santa Rosa - Ate (Ref. al lado del mercado Santa Rosa)</p>
                        <p>Local de Arriola: Pasaje. Nicolas Arriola 182 Block B Tienda 14-B La Victoria en la rotonda del ovalo</p>
                        <p>Local de Arequipa: Av.Variante de Uchumayo Km 4 (Via de Evitamiento) Cerro Colorado</p>
                        <p>Huachipa Taller de Reparaciones: Calle Los Viquez Mz. A Lt. 10 Urb. Carapongo Huachipa final Ramiro Priale pasando puente derecha(Ref. al lado del mercado Santa Rosa)</p>
                    </div>
            </div>
        </footer>
    );
};

export default EndBar;
