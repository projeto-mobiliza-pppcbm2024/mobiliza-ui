import axios from 'axios';

const API_BASE_URL = 'https://mobiliza.onrender.com';

export interface Car {
    id: string;
    name: string;
    desription: string; // Correção na transformação será feita depois
    pricePerDay: string; // Continuará como string e será tratado no front-end
}

interface ApiResponse {
    content: Car[]; // Lista de carros no campo "content"
    pageable: object;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: object;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

interface CarsResponse {
    cars: Car[];
    totalPages: number;
    currentPage: number;
}

/**
 * Busca a lista de carros do endpoint, recebe a página desejada como parâmetro e retorna os dados paginados.
 *
 * @param page - Número da página (0-indexado).
 * @returns Promise com a lista de carros, total de páginas e a página atual.
 */
export const fetchCars = async (page: number = 0): Promise<CarsResponse> => {
    try {
        const response = await axios.get<ApiResponse>(`${API_BASE_URL}/cars?size=12&page=${page}`);

        const { content: cars, totalPages, number: currentPage } = response.data;

        if (!Array.isArray(cars)) {
            throw new Error('Formato inesperado na resposta da API.');
        }

        return {
            cars,
            totalPages,
            currentPage: currentPage + 1, // Convertendo para 1-indexado
        };
    } catch (error) {
        console.error('Erro ao buscar a lista de carros:', error);
        throw new Error('Não foi possível buscar a lista de carros.');
    }
};
