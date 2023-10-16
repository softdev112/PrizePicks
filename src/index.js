import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import reportWebVitals from './reportWebVitals';

import Store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
