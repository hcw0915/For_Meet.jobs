import React from 'react';

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <ul>
          EXPLORE
          <li>
            <a href="#">News</a>
          </li>
          <li>
            <a href="#">New Products</a>
          </li>
          <li>
            <a href="#">Shop</a>
          </li>
        </ul>
        <ul>
          ABOUT
          <li>
            <a href="#">Gaming Setup</a>
          </li>
          <li>
            <a href="#">Faith</a>
          </li>
          <li>
            <a href="#">Future</a>
          </li>
        </ul>
        <ul>
          HELP
          <li>
            <a href="#">Q & A</a>
          </li>
          <li>
            <a href="#">Delivery</a>
          </li>
          <li>
            <a href="#">Shipping</a>
          </li>
        </ul>

        <div className="info">
          <div className="email">
            <input type="email" placeholder="Email to sign up" />
            <button>SIGN UP</button>
          </div>
          <div className="item">
            <i class="fa-brands fa-instagram icon"></i>
            <i class="fa-brands fa-facebook icon"></i>
            <i class="fa-brands fa-twitter icon"></i>
            <i class="fa-brands fa-youtube icon"></i>
            <i class="fa-solid fa-location-dot icon"></i>
          </div>
        </div>
      </div>
      <hr />
      <div className="bottom">
        <p>Copyright © 2022 2022. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
