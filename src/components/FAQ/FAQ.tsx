import React from "react";
import "./FAQ.css";

import Accordion from "../Accordion/Accordion";

const faqItems = [
  {
    title: "Como funciona o aluguel de carros na Mobiliza?",
    content:
      "Na Mobiliza, você pode visualizar uma lista de carros disponíveis para aluguel. Basta selecionar o carro de sua preferência, escolher o período de aluguel desejado e concluir a reserva. Nós cuidamos do resto para garantir que você tenha uma experiência de aluguel sem complicações.",
  },
  {
    title: "Quais são os requisitos para alugar um carro?",
    content:
      "Para alugar um carro na Mobiliza, você precisa ter pelo menos 21 anos de idade, possuir uma carteira de motorista válida e apresentar um documento de identificação com foto. Além disso, é necessário um cartão de crédito para a garantia do aluguel.",
  },
  {
    title: "Como faço para cancelar uma reserva?",
    content:
      'Você pode cancelar sua reserva acessando a seção "Minhas Reservas" no seu perfil. As políticas de cancelamento podem variar dependendo do carro e do período de aluguel, então recomendamos verificar os detalhes antes de concluir o cancelamento.',
  },
  {
    title: "Quais métodos de pagamento são aceitos?",
    content:
      "Aceitamos diversos métodos de pagamento, incluindo cartões de crédito (Visa, MasterCard, American Express) e transferências bancárias. Todos os pagamentos são processados de forma segura para garantir a sua proteção.",
  },
  {
    title: "O que acontece se eu devolver o carro com atraso?",
    content:
      "Caso você devolva o carro após o horário combinado, poderá ser cobrada uma taxa adicional. O valor da taxa depende do tempo de atraso e das políticas específicas do aluguel. Recomendamos entrar em contato conosco caso precise estender o período de aluguel.",
  },
];

const FAQ: React.FC = () => {
  return (
    <>
      <section className="bg-c00">
        <div className="faq container py-[7.5rem]">
          <h2 className="section-title text-c08">
            Dúvidas frequentes<span className="text-p03">.</span>
          </h2>

          <Accordion items={faqItems} />
        </div>
      </section>
    </>
  );
};

export default FAQ;
