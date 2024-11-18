import axios from 'axios';

const API_BASE_URL = 'https://mobiliza.onrender.com';

export interface RentRequest {
    carId: string;
    startDate: Date;
    finalDate: Date;
    paymentDetails: PaymentDetails;
}

interface PaymentDetails {
    installmentNumber: number;
    installmentAmount: number;
    paymentDate: Date;
    paymentMethod: string;
}

/**
 * Confirma o aluguel de um carro.
 * @param rentData Dados do aluguel a serem enviados.
 * @returns Resposta da API.
 */
export const confirmLease = async (rentData: RentRequest) => {
    try {
        const token = localStorage.getItem('authToken'); // Recupera o token do localStorage

        if (!token) {
            throw new Error('Usuário não autenticado. Token JWT não encontrado.');
        }

        const response = await axios.post(`${API_BASE_URL}/lease/confirm`, rentData, {
            headers: {
                Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
                'Content-Type': 'application/json',
            },
        });
        console.log(response.status)
        return response.status; // Retorna a resposta da API
    } catch (error: any) {
        alert(`Erro ao confirmar o aluguel: ${error.message}`);
        console.error('Erro ao confirmar o aluguel:', error.response || error.message);
        throw error;
    }
};
