import React from "react";
import "./FAQ.css";

import { ChevronDownIcon } from "@heroicons/react/16/solid";

const FAQ: React.FC = () => {
  return (
    <>
      <section className="faq-bg bg-c00">
        <div className="faq container py-[7.5rem]">
          <h2 className="section-title text-c08">
            Dúvidas frequentes<span className="text-p03">.</span>
          </h2>

          <ol className="faq-list mt-10 font-display uppercase">
            <li className="faq-item">
              <p>
                <span className="text-p03">1.</span> Posso alugar um carro por
                um período específico?
              </p>
              <ChevronDownIcon className="h-6 w-12 inline-block text-p03" />
            </li>
            <li className="faq-item">
              <p>
                <span className="text-p03">2.</span> Posso alugar um carro por
                um período específico?
              </p>
              <ChevronDownIcon className="h-6 w-12 inline-block text-p03" />
            </li>
            <li className="faq-item">
              <p>
                <span className="text-p03">3.</span> Posso alugar um carro por
                um período específico?
              </p>
              <ChevronDownIcon className="h-6 w-12 inline-block text-p03" />
            </li>
            <li className="faq-item">
              <p>
                <span className="text-p03">4.</span> Posso alugar um carro por
                um período específico?
              </p>
              <ChevronDownIcon className="h-6 w-12 inline-block text-p03" />
            </li>
            <li className="faq-item">
              <p>
                <span className="text-p03">5.</span> Posso alugar um carro por
                um período específico?
              </p>
              <ChevronDownIcon className="h-6 w-12 inline-block text-p03" />
            </li>
          </ol>
        </div>
      </section>
    </>
  );
};

export default FAQ;
