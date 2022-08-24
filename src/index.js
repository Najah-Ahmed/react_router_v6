import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import { DataProvider } from './context/DataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routers>
      <DataProvider>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </DataProvider>
    </Routers>
  </React.StrictMode>
);
