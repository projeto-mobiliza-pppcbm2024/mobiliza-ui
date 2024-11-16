import axios from 'axios';

interface LoginData {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>('https://mobiliza.onrender.com/login', data);
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

interface RegisterResponse {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    phone: string;
    cnh: string;
    token: string;
}


export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
    try {
        const response = await axios.post<RegisterResponse>('https://mobiliza.onrender.com/user', data);
        return response.data;
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        throw new Error('Não foi possível realizar o cadastro. Tente novamente.');
    }
};

