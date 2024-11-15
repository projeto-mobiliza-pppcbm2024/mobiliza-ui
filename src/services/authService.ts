import axios from 'axios';

interface LoginData {
    email: string;
    password: string;
}

export const loginUser = async (data: LoginData) => {
    try {
        const response = await axios.post('https://mobiliza.onrender.com/login', data);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao fazer login');
    }
};

interface RegisterData {
    email: string;
    password: string;
    cpf: string;
    cnh: string;
    name: string;
    phone: string;
}

export const registerUser = async (data: RegisterData) => {
    try {
        const response = await axios.post('https://mobiliza.onrender.com/user', data);
        return response.data;
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        throw new Error('Não foi possível realizar o cadastro. Tente novamente.');
    }
};