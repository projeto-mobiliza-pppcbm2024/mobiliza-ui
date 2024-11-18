import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import CarListingPage from "./pages/CarListing/CarListingPage";
import Header from "./components/Header/Header";
import HomePage from "./pages/Home/HomePage";
import AdminDashboard from "./pages/Admin/Users/Users";
import FaqPage from "./pages/FAQ/FAQ";

function App() {
  return (
    <Router>
      {/* HeaderBar será exibido em todas as páginas */}
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/car-list" element={<CarListingPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
