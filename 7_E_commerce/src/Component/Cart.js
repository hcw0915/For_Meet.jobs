import React, { useRef, useState } from 'react';

const Cart = () => {
  const [toggle1, setToggle1] = useState('toggle');
  const [toggle2, setToggle2] = useState('');
  const [toggle3, setToggle3] = useState('');
  const [toggle4, setToggle4] = useState('');

  const tagsHandler1 = () => {
    if (toggle1 === '') {
      setToggle1('toggle');
      setToggle2('');
      setToggle3('');
      setToggle4('');
    } else {
      setToggle1('');
    }
  };
  const tagsHandler2 = () => {
    if (toggle2 === '') {
      setToggle1('');
      setToggle2('toggle');
      setToggle3('');
      setToggle4('');
    } else {
      setToggle2('');
    }
  };
  const tagsHandler3 = () => {
    if (toggle3 === '') {
      setToggle1('');
      setToggle2('');
      setToggle3('toggle');
      setToggle4('');
    } else {
      setToggle3('');
    }
  };
  const tagsHandler4 = () => {
    if (toggle4 === '') {
      setToggle1('');
      setToggle2('');
      setToggle3('');
      setToggle4('toggle');
    } else {
      setToggle4('');
    }
  };
  return (
    <div>
      <div className="wrap">
        <div className="title">
          <h2 onClick={tagsHandler1}>CASE1</h2>
          <h2 onClick={tagsHandler2}>CASE2</h2>
          <h2 onClick={tagsHandler3}>CASE3</h2>
          <h2 onClick={tagsHandler4}>CASE4</h2>
        </div>
        <div className="tags">
          <div className={`tag-1 ${toggle1} `}>
            <div className="product">
              <img
                className="pic"
                src="https://picsum.photos/seed/picsum/200/200"
                alt=""
              />
              <div className="text">
                <h5>標題1</h5>
                <p>內文</p>
              </div>
            </div>
            <div className="product">
              <img
                className="pic"
                src="https://picsum.photos/seed/picsum/200/200"
                alt=""
              />
              <div className="text">
                <h5>標題1</h5>
                <p>內文</p>
              </div>
            </div>
            <div className="product">
              <img
                className="pic"
                src="https://picsum.photos/seed/picsum/200/200"
                alt=""
              />
              <div className="text">
                <h5>標題1</h5>
                <p>內文</p>
              </div>
            </div>
            <div className="product">
              <img
                className="pic"
                src="https://picsum.photos/seed/picsum/200/200"
                alt=""
              />
              <div className="text">
                <h5>標題1</h5>
                <p>內文</p>
              </div>
            </div>
          </div>

          <div className={`tag-2 ${toggle2}`}>
            <div className="product">
              <img
                className="pic"
                src="https://picsum.photos/seed/picsum/200/200"
                alt=""
              />
              <div className="text">
                <h5>標題1</h5>
                <p>內文</p>
              </div>
            </div>
          </div>
          <div className={`tag-3 ${toggle3}`}>
            <img
              className="pic"
              src="https://picsum.photos/seed/picsum/200/200"
              alt=""
            />
            <div className="text">
              <h5>標題3</h5>
              <p>內文</p>
            </div>
          </div>
          <div className={`tag-4 ${toggle4}`}>
            <img
              className="pic"
              src="https://picsum.photos/seed/picsum/200/200"
              alt=""
            />
            <div className="text">
              <h5>標題4</h5>
              <p>內文</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
