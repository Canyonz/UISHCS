import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './app/styles/index.css';
import { Provider, rootStore } from './app/providers/store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider value={rootStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
