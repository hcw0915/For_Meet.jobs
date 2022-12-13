import React from 'react';

const Pictures = ({ data }) => {
  return (
    <div className="picture">
      <p>{data.photographer}</p>
      <div className="imageContainer">
        <a target="_blank" href={data.src.large} rel="noreferrer noopener">
          <img src={data.src.large} alt="" />
        </a>
      </div>
      <p>Download Image↑</p>
    </div>
  );
};

export default Pictures;
