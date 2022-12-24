import React, { useState } from 'react';
import logo from '../assets/logo/logo.png';

const Header = () => {
  const [toggle, setToggle] = useState('');
  const activeHandler = () => {
    if (toggle === 'toggle-btn') {
      setToggle('active');
    } else {
      setToggle('toggle-btn');
    }
  };
  return (
    <div>
      <div className="header-container">
        <nav>
          <a href="index.html">
            <img src={logo} alt="" />
            <p>GAMING SETUP</p>
            <br />
          </a>
          <a onClick={activeHandler} className="toggle-btn" href="#">
            <i class="fa-solid fa-bars"></i>
          </a>
        </nav>

        <ul>
          <li className={`tags ${toggle}`}>
            <a href="#">HOME</a>
          </li>
          <li className={`tags ${toggle}`}>
            <a href="#">NEWS</a>
          </li>
          <li className={`tags ${toggle}`}>
            <a href="#">PRODUCT</a>
          </li>
          <li className={`tags login ${toggle}`}>
            <a href="#">LOGIN</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
