import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { loginUser } from '../../services/authService';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await loginUser({ email, password });

            if (response.token) {
                localStorage.setItem('authToken', response.token); // Armazena o token no localStorage
                navigate('/car-list'); // Redireciona para a página de listagem de carros
            } else {
                setError('Erro ao autenticar. Tente novamente.');
            }
        } catch (err: unknown) {
            // Tratamento genérico de erro
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Erro desconhecido. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
                <div className="flex items-center justify-center mb-4">
                    <p className="text-2xl font-bold text-red-500">Bem-vindo de volta!</p>
                </div>

                <h2 className="text-2xl font-bold text-center">Login</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        label={loading ? 'Entrando...' : 'Entrar'}
                        disabled={loading}
                    />
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
