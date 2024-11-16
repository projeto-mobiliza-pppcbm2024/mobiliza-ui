import axios from 'axios';

const API_BASE_URL = 'https://mobiliza.onrender.com';

export interface Car {
    id: string;
    name: string;
    desription: string; // Corrigido na transformação
    pricePerDay: string; // Vem como string da API
}

export const fetchCars = async (): Promise<Car[]> => {
    try {
        const response = await axios.get<Car[]>(`${API_BASE_URL}/cars`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar a lista de carros:', error);
        throw new Error('Não foi possível buscar a lista de carros.');
    }
};
