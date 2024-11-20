import React from 'react';

const EndBar = () => {
    return (
        <footer style={{ textAlign: 'left', padding: '1rem', background: '#A3A3A3' }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Síguenos a través de:</p>
            <a
                href="https://www.facebook.com/PeruTractor/?locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
                style={{ fontSize: '2rem', margin: '0.5rem' }} // Custom styling for size and spacing
            >
                <i className="fa fa-facebook" aria-hidden="true"></i>
            </a>
            <a
                href="https://x.com/i/flow/login?redirect_after_login=%2Fperutractor"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
                style={{ fontSize: '2rem', margin: '0.5rem' }} // Custom styling for size and spacing
            >
                <i className="fa fa-twitter" aria-hidden="true"></i>
            </a>
            <a
                href="https://pe.linkedin.com/company/peru-tractor"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
                style={{ fontSize: '2rem', margin: '0.5rem' }} // Custom styling for size and spacing
            >
                <i className="fa fa-linkedin" aria-hidden="true"></i>
            </a>
            <a
                href="https://www.youtube.com/channel/UC8cNOBTBV7G57gJpBpfamSw"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
                style={{ fontSize: '2rem', margin: '0.5rem' }} // Custom styling for size and spacing
            >
                <i class="fa fa-youtube-play" aria-hidden="true"></i>
            </a>
            <p>© CAT® y CATERPILLAR® es propiedad de sus respectivos dueños. Perú Tractor SRL®, todos los derechos reservados</p>
        </footer>
    );
};

export default EndBar;
