// src/index.tsx - Application Entry Point
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

import * as React from 'react';
import * as ReactDOM from 'react-dom';

const App: React.FC = () => (
  <h1>Hello, world!</h1>
);

ReactDOM.render(<App />, document.getElementById('root'));
