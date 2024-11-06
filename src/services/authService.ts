import axios from 'axios';

interface LoginData {
    email: string;
    password: string;
}

export const loginUser = async (data: LoginData) => {
    try {
        const response = await axios.post('/api/login', data);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao fazer login');
    }
};
