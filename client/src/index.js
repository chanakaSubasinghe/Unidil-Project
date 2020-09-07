import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "popper.js";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

