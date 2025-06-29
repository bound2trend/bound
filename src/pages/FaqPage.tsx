import React, { useState } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day return policy on all items. Products must be unworn, unwashed, and with original tags attached.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Standard shipping typically takes 5-7 business days within India. Expedited options are available at checkout.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes, we ship worldwide. Shipping times and costs vary depending on destination.',
  },
  {
    question: 'How do I track my order?',
    answer:
      'Once your order ships, you will receive an email with tracking details. You can also track via your account dashboard.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept credit/debit cards, net banking, UPI, digital wallets like Paytm and Google Pay, and PayPal.',
  },
];

const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-md">
            <button
              onClick={() => toggleIndex(index)}
              className="w-full text-left px-4 py-3 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-600"
              aria-expanded={openIndex === index}
              aria-controls={`faq-panel-${index}`}
              id={`faq-header-${index}`}
            >
              <span className="font-semibold text-lg">{faq.question}</span>
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div
                id={`faq-panel-${index}`}
                role="region"
                aria-labelledby={`faq-header-${index}`}
                className="px-4 py-3 text-gray-700"
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default FaqPage;
