import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import CarListingPage from './pages/CarListing/CarListingPage';
import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      {/* HeaderBar será exibido em todas as páginas */}
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/car-list" element={<CarListingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
