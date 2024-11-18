import React from "react";
import AccordionItem from "./AccordionItem";

interface AccordionProps {
  items: { index: number; title: string; content: string }[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <>
      {/* <div className="accordion">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
          />
        ))}
      </div> */}

      <dl className="mt-10 font-display uppercase">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            index={index + 1}
            title={item.title}
            content={item.content}
          />
        ))}
      </dl>
    </>
  );
};

export default Accordion;
