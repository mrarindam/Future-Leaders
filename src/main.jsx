import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Force dark theme — no theme switcher needed
document.documentElement.classList.add('dark');
document.documentElement.style.colorScheme = 'dark';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
