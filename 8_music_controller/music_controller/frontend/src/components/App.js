// import React, { Component } from 'react';
// import { render } from 'react-dom';

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return <h1>Testing React Code</h1>;
//   }
// }

import React from 'react';
import Homepage from './Homepage';

export default function App() {
  return (
    <div className="center">
      <Homepage />
    </div>
  );
}
