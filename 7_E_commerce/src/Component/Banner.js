import React from 'react';

import red from '../assets/rangers/red.png';
const Banner = () => {
  return (
    <div className="banner">
      <div className="text">
        <img className="red" src={red} alt="" />
        <h1>
          <p>CREATE YOUR WORLD</p>
        </h1>
        <p>[ CLICK　↓　HERE ]</p>
        <button>MORE</button>
      </div>
    </div>
  );
};

export default Banner;
