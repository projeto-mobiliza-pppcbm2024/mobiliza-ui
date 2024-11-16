import React, { useState, useEffect } from 'react';
import CarDetailsModal from '../../components/CarDetails/CarDetailsModal';
import { fetchCars } from '../../services/carService';

interface Car {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    pricePerDay: number;
    seats: number;
    transmission: string;
    doors: number;
}

const CarListingPage: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCars, setFilteredCars] = useState<Car[]>([]);
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    useEffect(() => {
        fetchCarsData();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchTerm, cars]);

    const fetchCarsData = async () => {
        try {
            const carList = await fetchCars();
            setCars(carList.map((car: any) => ({
                ...car,
                description: car.desription || car.description, // Corrigindo erro de grafia na API
                imageUrl: `https://via.placeholder.com/300x200?text=${(car.name)}`, // Gerando imagem para demonstração
                seats: car.seats || 4,
                transmission: car.transmission || 'Manual',
                doors: car.doors || 4,
                pricePerDay: parseFloat(car.pricePerDay)
            })));
        } catch (error) {
            console.error('Erro ao carregar os dados dos carros:', error);
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

    const openModal = (car: Car) => {
        setSelectedCar(car);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCar(null);
        setIsModalOpen(false);
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen w-screen" >
            {/* Barra de Pesquisa e Filtros */}
            <div className="flex items-center space-x-4 mb-6 flex-wrap">
                <input
                    type="text"
                    placeholder="Pesquisar carro..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 w-full md:w-1/4 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="px-4 py-2 w-full md:w-1/5 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="px-4 py-2 w-full md:w-1/5 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                {/* <select
                    className="px-4 py-2 w-full md:w-1/4 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    <option value="">Todas as categorias</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Esportivo">Esportivo</option>
                </select> */}
            </div>

            {/* Lista de Carros */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map(car => (
                    <div key={car.id} className="bg-white p-4 rounded shadow hover:shadow-md">
                        <img src={car.imageUrl} alt={car.name} className="w-full h-40 object-cover rounded mb-4" />
                        <h3 className="text-gray-600 text-lg font-semibold mb-2">{car.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{car.description}</p>
                        <p className="text-red-500 font-bold mb-2">R$ {car.pricePerDay.toFixed(2)}/dia</p>
                        <button
                            onClick={() => openModal(car)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Alugar
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal para exibir detalhes do carro */}
            <CarDetailsModal
                isOpen={isModalOpen}
                onClose={closeModal}
                car={selectedCar}
                pickupDate={pickupDate}
                returnDate={returnDate}
            />
        </div>
    );
};

export default CarListingPage;
