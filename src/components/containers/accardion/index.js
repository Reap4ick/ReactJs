import React, { useState } from 'react';
import './Accordion.css';

const Accordion = () => {
  const [activeIndexes, setActiveIndexes] = useState([]);

  const toggleAccordion = (index) => {
    if (activeIndexes.includes(index)) {
      setActiveIndexes(activeIndexes.filter((item) => item !== index));
    } else {
      setActiveIndexes([...activeIndexes, index]);
    }
  };

  return (
    <div className="accordion-container">
      <div className="accordion">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${activeIndexes.includes(0) ? 'active' : ''}`}
              onClick={() => toggleAccordion(0)}
            >
              Accordion Item #1
              <span className="plus"></span>
            </button>
          </h2>
          <div className={`accordion-collapse ${activeIndexes.includes(0) ? 'show' : ''}`}>
            <div className="accordion-body">
              Placeholder content for this accordion, which is intended to demonstrate a simple accordion without Bootstrap.
              This is the first item's accordion body.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${activeIndexes.includes(1) ? 'active' : ''}`}
              onClick={() => toggleAccordion(1)}
            >
              Accordion Item #2
              <span className="plus"></span>
            </button>
          </h2>
          <div className={`accordion-collapse ${activeIndexes.includes(1) ? 'show' : ''}`}>
            <div className="accordion-body">
              Placeholder content for this accordion, which is intended to demonstrate a simple accordion without Bootstrap.
              This is the second item's accordion body. Let's imagine this being filled with some actual content.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${activeIndexes.includes(2) ? 'active' : ''}`}
              onClick={() => toggleAccordion(2)}
            >
              Accordion Item #3
              <span className="plus"></span>
            </button>
          </h2>
          <div className={`accordion-collapse ${activeIndexes.includes(2) ? 'show' : ''}`}>
            <div className="accordion-body">
              Placeholder content for this accordion, which is intended to demonstrate a simple accordion without Bootstrap.
              This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
