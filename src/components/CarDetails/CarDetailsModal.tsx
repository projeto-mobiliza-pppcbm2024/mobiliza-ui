import React from 'react';

interface CarDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    car: {
        name: string;
        description: string;
        pricePerDay: number;
        imageUrl: string;
        seats: number;
        transmission: string;
        doors: number;
    } | null;
    pickupDate?: string; // Data de retirada no formato ISO (YYYY-MM-DD)
    returnDate?: string; // Data de devolução no formato ISO (YYYY-MM-DD)
}

const CarDetailsModal: React.FC<CarDetailsModalProps> = ({ isOpen, onClose, car, pickupDate, returnDate }) => {
    if (!isOpen || !car) return null;

    const calculateTotalPrice = () => {
        if (!pickupDate || !returnDate) return null;

        const startDate = new Date(pickupDate);
        const endDate = new Date(returnDate);
        const timeDifference = endDate.getTime() - startDate.getTime();
        const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        return days > 0 ? days * car.pricePerDay : null;
    };

    const totalPrice = calculateTotalPrice();

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    X
                </button>
                <img
                    src={car.imageUrl}
                    alt={car.name}
                    className="w-full h-40 object-cover rounded mb-4"
                />
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">{car.name}</h2>
                <p className="text-gray-700 mb-4">{car.description}</p>
                <p className="text-gray-700 font-semibold">Preço por dia: R$ {car.pricePerDay.toFixed(2)}</p>
                <ul className="text-gray-700 mt-4 space-y-2">
                    <li><strong>Assentos:</strong> {car.seats}</li>
                    <li><strong>Câmbio:</strong> {car.transmission}</li>
                    <li><strong>Portas:</strong> {car.doors}</li>
                </ul>
                {pickupDate && returnDate && totalPrice !== null ? (
                    <div className="mt-6">
                        <p className="text-gray-700">
                            <strong>Retirada:</strong> {new Date(pickupDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700">
                            <strong>Devolução:</strong> {new Date(returnDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 font-semibold mt-2">
                            Valor Total: R$ {totalPrice.toFixed(2)}
                        </p>
                    </div>
                ) : (
                    <p className="text-red-600 mt-6">
                        Defina datas válidas para calcular o valor total.
                    </p>
                )}
                <button
                    onClick={() => alert('Função de aluguel em desenvolvimento')}
                    className="mt-6 w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                >
                    Confirmar Aluguel
                </button>
            </div>
        </div>
    );
};

export default CarDetailsModal;
