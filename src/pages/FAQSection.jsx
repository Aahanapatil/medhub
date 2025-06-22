import React, { useState } from 'react';
import '../css/FAQSection.css';

const faqs = [
  {
    question: "How can I book an appointment at Apollo Hospitals?",
    answer: "You can book an appointment online through the Apollo website, mobile app, or by calling their customer care center."
  },
  {
    question: "Can I seek an appointment with a specialist at Apollo Hospitals even if I don’t have a local referral?",
    answer: "Yes, you can directly request an appointment with a specialist without a referral."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-heading">Frequently Asked Questions</h2>
      <p className="faq-subtext">
        Find answers to common questions about our services, treatments, appointments, and patient care options to help you make informed health decisions.
      </p>

      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <button className="faq-question" onClick={() => toggleFAQ(index)}>
            <span>{faq.question}</span>
            <span className="faq-toggle">{openIndex === index ? '−' : '+'}</span>
          </button>
          {openIndex === index && (
            <div className="faq-answer">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
