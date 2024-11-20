import React from 'react';
import "./Home.css";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import banner0 from './resources/banner0.jpg';
import banner1 from './resources/banner1.jpg';
import banner2 from './resources/banner2.jpg';

function Home() {
  return (
    <>
    <Slide>
      <div className="each-slide-effect">
        <div style={{ 'backgroundImage': `url(${banner0})` }}>
        </div>
      </div>
      <div className="each-slide-effect">
        <div style={{ 'backgroundImage': `url(${banner1})` }}>
        </div>
      </div>
      <div className="each-slide-effect">
        <div style={{ 'backgroundImage': `url(${banner2})` }}>
          <span>Slide 3</span>
        </div>
      </div>
        </Slide>
    <div className="video-container">
      <h1>Sobre Nosotros</h1>
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
