import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { registerUser } from '../../services/authService';

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [cnh, setCnh] = useState('');
    const [name, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await registerUser({ email, password, cpf, cnh, name, phone });
            console.log('Cadastro bem-sucedido:', response);
        } catch (error) {
            setError('Erro ao realizar cadastro. Tente novamente.');
        }
    };

    return (
        <div className="flex items-center justify-center 100vh min-h-dvh w-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">

                {/* Elemento de Boas-Vindas Centralizado */}
                <div className="flex items-center justify-center mb-4">
                    <p className="text-2xl font-bold text-red-500">Crie sua conta!</p>
                </div>

                <h2 className="text-2xl font-bold text-center">Cadastro</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleRegister} className="space-y-4">
                    <Input
                        label="Nome Completo"
                        type="text"
                        value={name}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
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
                    <Input
                        label="CPF"
                        type="text"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required
                    />
                    <Input
                        label="CNH"
                        type="text"
                        value={cnh}
                        onChange={(e) => setCnh(e.target.value)}
                        required
                    />
                    <Input
                        label="Celular"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <Button type="submit" label="Cadastrar" />
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
