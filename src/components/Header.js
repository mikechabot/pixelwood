import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree } from '@fortawesome/free-solid-svg-icons';

const Header = () => (
  <section className="hero">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">
          <FontAwesomeIcon icon={faTree}/> Pixelwood
        </h1>
        <h2 className="subtitle">
          A survival city-builder
        </h2>
      </div>
    </div>
  </section>
);


export default Header;
