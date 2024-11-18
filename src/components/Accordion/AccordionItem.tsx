import { ChevronDownIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
import "./Accordion.css";

interface AccordionItemProps {
  index: number;
  title: string;
  content: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  index,
  title,
  content,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* <div className="accordion-item">
        <button
          className="accordion-header cursor-pointer"
          aria-expanded={isOpen}
          aria-controls={title}
          onClick={handleToggle}
        >
          {title}
        </button>
        <div
          id={title}
          className={`accordion-content ${isOpen ? "block" : "hidden"}`}
        >
          {content}
        </div>
      </div> */}
      <div className="accordion-item">
        <dt>
          <button
            className="accordion-button cursor-pointer uppercase"
            aria-expanded={isOpen}
            aria-controls={title}
            onClick={handleToggle}
          >
            <p>
              <span className="text-p03">{index}.</span> {title}
            </p>
            <ChevronDownIcon className="h-6 w-12 inline-block text-p03" />
          </button>
        </dt>
        <dd
          id={title}
          className={`accordion-content ${
            isOpen ? "block" : "hidden"
          } font-body text-c09 normal-case px-[1.25rem] py-[1.5rem]`}
        >
          {" "}
          {content}
        </dd>
      </div>
    </>
  );
};

export default AccordionItem;
