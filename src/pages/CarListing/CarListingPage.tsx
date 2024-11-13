import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Car {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    pricePerDay: number;
}

const CarListingPage: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCars, setFilteredCars] = useState<Car[]>([]);

    useEffect(() => {
        fetchCars();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchTerm, cars]);

    const fetchCars = async () => {
        try {
            //const response = await axios.get('/cars');
            //setCars(response.data);
            const defaultCars: Car[] = [
                {
                    id: '1',
                    name: 'SUV Compacto',
                    description: 'Um SUV compacto confortável para a cidade.',
                    imageUrl: 'https://via.placeholder.com/300x200?text=SUV+Compacto',
                    pricePerDay: 150.00,
                },
                {
                    id: '2',
                    name: 'Sedan Luxo',
                    description: 'Um sedan de luxo com todos os recursos de conforto.',
                    imageUrl: 'https://via.placeholder.com/300x200?text=Sedan+Luxo',
                    pricePerDay: 300.00,
                },
                {
                    id: '3',
                    name: 'Esportivo Conversível',
                    description: 'Carro esportivo conversível para uma experiência inesquecível.',
                    imageUrl: 'https://via.placeholder.com/300x200?text=Esportivo+Conversível',
                    pricePerDay: 500.00,
                },
                {
                    id: '4',
                    name: 'SUV Família',
                    description: 'SUV espaçoso e ideal para toda a família.',
                    imageUrl: 'https://via.placeholder.com/300x200?text=SUV+Família',
                    pricePerDay: 200.00,
                },
            ];
            setCars(defaultCars);
        } catch (error) {
            console.error('Erro ao buscar carros:', error);
        }
    };

    const applyFilters = () => {
        const term = searchTerm.toLowerCase();
        const filtered = cars.filter(car =>
            car.name.toLowerCase().includes(term) ||
            car.description.toLowerCase().includes(term)
        );
        setFilteredCars(filtered);
    };

    return (
        <div className="p-4 bg-gray-100 h-screen">
            {/* Barra de Pesquisa e Filtros */}
            <div className="flex items-center space-x-4 mb-6">
                <input
                    type="text"
                    placeholder="Pesquisar carro..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 w-full md:w-1/2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* Adicionar aqui filtros adicionais, como categoria, preço, etc. */}
                <select className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Todas as categorias</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Esportivo">Esportivo</option>
                    {/* Outros filtros podem ser adicionados conforme necessário */}
                </select>
            </div>

            {/* Lista de Carros */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map(car => (
                    <div key={car.id} className="bg-white p-4 rounded shadow hover:shadow-md">
                        <img src={car.imageUrl} alt={car.name} className="w-full h-40 object-cover rounded mb-4" />
                        <h3 className="text-lg font-semibold mb-2">{car.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{car.description}</p>
                        <p className="text-blue-600 font-bold mb-2">R$ {car.pricePerDay.toFixed(2)}/dia</p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Alugar</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarListingPage;
