import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import { confirmLease } from '../../services/rentService';

interface PaymentPopupProps {
    isOpen: boolean;
    totalAmount: number;
    onClose: () => void;
    onPaymentSuccess: () => void;
    rentDetails: {
        carId: string;
        startDate: string; // Mantém o formato esperado no serviço
        finalDate: string; // Mantém o formato esperado no serviço
    };
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({
    totalAmount,
    onClose,
    onPaymentSuccess,
    rentDetails,
}) => {
    const [paymentMethod, setPaymentMethod] = useState<'credit' | 'debit' | 'pix'>('credit');
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [installments, setInstallments] = useState(1);
    const [pixCode] = useState('123.456.789-10');

    const navigate = useNavigate();

    const validatePaymentDetails = (): boolean => {
        if (paymentMethod === 'pix') {
            return true;
        }
        return (
            cardNumber.length === 16 &&
            cardHolder.trim() !== '' &&
            expiryDate.length === 5 &&
            cvv.length === 3
        );
    };

    const handlePayment = async () => {
        if (!validatePaymentDetails()) {
            alert('Por favor, preencha todas as informações de pagamento corretamente.');
            return;
        }

        try {
            const paymentDetails = {
                installmentNumber: installments,
                installmentAmount: Number((totalAmount / installments).toFixed(2)),
                paymentDate: new Date().toISOString().split('T')[0], // Formata como yyyy-MM-dd
                paymentMethod: paymentMethod.toUpperCase(), // Converte para letras maiúsculas
            };

            const rentData = {
                carId: rentDetails.carId,
                startDate: rentDetails.startDate, // Já deve estar no formato yyyy-MM-dd
                finalDate: rentDetails.finalDate, // Já deve estar no formato yyyy-MM-dd
                paymentDetails,
            };

            await confirmLease(rentData);

            alert('Aluguel confirmado com sucesso!');
            onPaymentSuccess();
            onClose();
        } catch (error: any) {
            if (error.message.includes('Token JWT não encontrado')) {
                alert('Você precisa estar autenticado para confirmar o aluguel. Redirecionando para a página de login.');
                navigate('/login');
            } else {
                console.error('Erro ao confirmar o aluguel:', error);
                alert('Ocorreu um erro ao processar o pagamento. Tente novamente.');
            }
        }
    };

    const calculateInstallmentValue = (): string => {
        return (totalAmount / installments).toFixed(2);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-700">Pagamento</h2>
                <p className="mb-4 text-gray-700">
                    Valor total: <span className="text-red-500 font-bold">R$ {totalAmount.toFixed(2)}</span>
                </p>

                <label className="block mb-2 font-semibold text-gray-700">Meio de pagamento:</label>
                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as 'credit' | 'debit' | 'pix')}
                    className="w-full px-4 py-2 mb-4 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700"
                >
                    <option value="credit">Cartão de Crédito</option>
                    <option value="debit">Cartão de Débito</option>
                    <option value="pix">PIX</option>
                </select>

                {paymentMethod !== 'pix' && (
                    <>
                        <label className="block mb-2 font-semibold text-gray-700">Número do Cartão:</label>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                            placeholder="Número do Cartão"
                            className="w-full px-4 py-2 mb-4 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700"
                        />

                        <label className="block mb-2 font-semibold text-gray-700">Nome no Cartão:</label>
                        <input
                            type="text"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder="Nome no Cartão"
                            className="w-full px-4 py-2 mb-4 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700"
                        />

                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label className="block mb-2 font-semibold text-gray-700">Validade:</label>
                                <input
                                    type="text"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value.replace(/\D/g, '').slice(0, 5))}
                                    placeholder="MM/AA"
                                    className="w-full px-4 py-2 mb-4 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-2 font-semibold text-gray-700">CVV:</label>
                                <input
                                    type="text"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                    placeholder="CVV"
                                    className="w-full px-4 py-2 mb-4 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700"
                                />
                            </div>
                        </div>
                    </>
                )}

                {paymentMethod === 'credit' && (
                    <>
                        <label className="block mb-2 font-semibold text-gray-700">Parcelas:</label>
                        <select
                            value={installments}
                            onChange={(e) => setInstallments(Number(e.target.value))}
                            className="w-full px-4 py-2 mb-4 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700"
                        >
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>
                                    {num}x de R$ {calculateInstallmentValue()}
                                </option>
                            ))}
                        </select>
                    </>
                )}

                {paymentMethod === 'pix' && (
                    <div className="mb-4">
                        <p className="font-semibold mb-2 text-gray-700">Código PIX:</p>
                        <div className="p-2 bg-gray-100 rounded border text-sm mb-4">
                            {pixCode}
                        </div>
                        <div className="flex justify-center">
                            <QRCodeSVG value={pixCode} />
                        </div>
                    </div>
                )}

                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handlePayment}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                    >
                        Confirmar Pagamento
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPopup;
