import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header className="bg-red-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo ou Nome do Sistema */}
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => handleNavigation("/")}
        >
          Mobiliza
        </h1>

        {/* Botões de Navegação */}
        <div className="space-x-4">
          <button
            onClick={() => handleNavigation("/login")}
            className="bg-white text-red-600 px-4 py-2 rounded shadow hover:bg-gray-100 transition"
          >
            Login
          </button>
          <button
            onClick={() => handleNavigation("/register")}
            className="bg-white text-red-600 px-4 py-2 rounded shadow hover:bg-gray-100 transition"
          >
            Cadastro
          </button>
          <button
            onClick={() => handleNavigation("/car-list")}
            className="bg-white text-red-600 px-4 py-2 rounded shadow hover:bg-gray-100 transition"
          >
            Listagem de Carros
          </button>
          <button
            onClick={() => handleNavigation("/faq")}
            className="bg-white text-red-600 px-4 py-2 rounded shadow hover:bg-gray-100 transition"
          >
            FAQ
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
