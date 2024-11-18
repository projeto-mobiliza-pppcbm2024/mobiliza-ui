import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface PaymentPopupProps {
    isOpen: boolean;
    totalAmount: number;
    onClose: () => void;
    onPaymentSuccess: () => void;
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({ totalAmount, onClose, onPaymentSuccess }) => {
    const [paymentMethod, setPaymentMethod] = useState<'credit' | 'debit' | 'pix'>('credit');
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [installments, setInstallments] = useState(1);
    const [pixCode, setPixCode] = useState('123.456.789-10');

    const handlePayment = () => {
        alert('Pagamento realizado com sucesso!');
        onPaymentSuccess();
        onClose();
    };

    const calculateInstallmentValue = (): string => {
        return (totalAmount / installments).toFixed(2);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">Pagamento</h2>
                <p className="mb-4">Valor total: <span className="text-red-500 font-bold">R$ {totalAmount.toFixed(2)}</span></p>

                <label className="block mb-2 font-semibold">Meio de pagamento:</label>
                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as 'credit' | 'debit' | 'pix')}
                    className="w-full px-4 py-2 mb-4 border rounded"
                >
                    <option value="credit">Cartão de Crédito</option>
                    <option value="debit">Cartão de Débito</option>
                    <option value="pix">PIX</option>
                </select>

                {paymentMethod !== 'pix' && (
                    <>
                        <label className="block mb-2 font-semibold">Número do Cartão:</label>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                            placeholder="Número do Cartão"
                            className="w-full px-4 py-2 mb-4 border rounded"
                        />

                        <label className="block mb-2 font-semibold">Nome no Cartão:</label>
                        <input
                            type="text"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder="Nome no Cartão"
                            className="w-full px-4 py-2 mb-4 border rounded"
                        />

                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label className="block mb-2 font-semibold">Validade:</label>
                                <input
                                    type="text"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value.replace(/\D/g, '').slice(0, 5))}
                                    placeholder="MM/AA"
                                    className="w-full px-4 py-2 mb-4 border rounded"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-2 font-semibold">CVV:</label>
                                <input
                                    type="text"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                    placeholder="CVV"
                                    className="w-full px-4 py-2 mb-4 border rounded"
                                />
                            </div>
                        </div>
                    </>
                )}

                {paymentMethod === 'credit' && (
                    <>
                        <label className="block mb-2 font-semibold">Parcelas:</label>
                        <select
                            value={installments}
                            onChange={(e) => setInstallments(Number(e.target.value))}
                            className="w-full px-4 py-2 mb-4 border rounded"
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
                        <p className="font-semibold mb-2">Código PIX:</p>
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
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handlePayment}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Confirmar Pagamento
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPopup;