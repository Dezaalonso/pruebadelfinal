import React from 'react';
import './css/EndBar.css';

const EndBar = () => {
    return (
        <footer className="footer">
            <p className="footer-title">Síguenos a través de:</p>
            <div className="social-links">
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
                <div className="column">
                    <p className="footer-title">Nuestras Oficinas: </p>
                    <p>LOCAL PRINCIPAL : Av. Michael Faraday #475 Urb. Santa Rosa - Ate (Ref. al lado del mercado Santa Rosa)</p>
                </div>
            </div>
                <p className="footer-note">© CAT® y CATERPILLAR® es propiedad de sus respectivos dueños. Perú Tractor SRL®, todos los derechos reservados</p>
        </footer>
    );
};

export default EndBar;
