import axios from 'axios';

const API_BASE_URL = 'https://mobiliza.onrender.com';

export interface RentRequest {
    carId: string;
    startDate: string; // Alterado para string no formato yyyy-MM-dd
    finalDate: string; // Alterado para string no formato yyyy-MM-dd
    paymentDetails: PaymentDetails;
}

interface PaymentDetails {
    installmentNumber: number;
    installmentAmount: number;
    paymentDate: string; // Alterado para string no formato yyyy-MM-dd
    paymentMethod: string;
}

/**
 * Formata uma data para o formato yyyy-MM-dd.
 * @param date Objeto Date a ser formatado.
 * @returns String no formato yyyy-MM-dd.
 */
const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

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

        // Formatando as datas antes de enviar para a API
        rentData.startDate = formatDate(new Date(rentData.startDate));
        rentData.finalDate = formatDate(new Date(rentData.finalDate));
        rentData.paymentDetails.paymentDate = formatDate(new Date(rentData.paymentDetails.paymentDate));
        rentData.paymentDetails.paymentMethod = rentData.paymentDetails.paymentMethod.toUpperCase();

        // console.log('Dados formatados para envio:', rentData);

        const response = await axios.post(`${API_BASE_URL}/lease/confirm`, rentData, {
            headers: {
                Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
                'Content-Type': 'application/json',
            },
        });

        // console.log(response.status);
        return response.status; // Retorna a resposta da API
    } catch (error: any) {
        alert(`Erro ao confirmar o aluguel: ${error.message}`);
        console.error('Erro ao confirmar o aluguel:', error.response || error.message);
        throw error;
    }
};
