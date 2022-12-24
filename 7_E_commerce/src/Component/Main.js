import React from 'react';
import blue from '../assets/setupvertical/blue.jpg';
import green1 from '../assets/setupvertical/green1.jpg';
import rgb1 from '../assets/setupvertical/rgb1.jpg';

const Main = () => {
  return (
    <div>
      <div className="icons">
        <p>SERVICE</p>
        <div className="icon">
          <div className="single">
            <i class="fa-solid fa-lightbulb"></i>
            <h5>Ideas into reality</h5>
          </div>
          <div className="single">
            <i class="fa-solid fa-truck-fast"></i>
            <h5>Delivery ontime</h5>
          </div>
          <div className="single">
            <i class="fa-solid fa-hammer"></i>
            <h5>Install & Warranty</h5>
          </div>
        </div>
      </div>

      <div className="main">
        <div className="title">
          <h3>WE PROVIDE </h3>
        </div>
        <div className="wrap">
          <div className="cards">
            <div className="card blue">
              <img src={blue} alt="" />
              <div className="text">
                <h1>Working</h1>
                <p>qwe</p>
              </div>
              <button>MORE</button>
            </div>
            <div className="card green">
              <img src={green1} alt="" />
              <div className="text">
                <h1>Styling</h1>
                <p>qwe</p>
              </div>
              <button>MORE</button>
            </div>
            <div className="card purple">
              <img src={rgb1} alt="" />
              <div className="text">
                <h1>Gaming</h1>
                <p>qwe</p>
              </div>
              <button>MORE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
