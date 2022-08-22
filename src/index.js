import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routers>
      <Routes>
        <Route path='/*' element={<App />} />
      </Routes>
    </Routers>
  </React.StrictMode>
);
