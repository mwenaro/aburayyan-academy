import React from 'react';

const faqItems = [
  { question: "What ages is this program suitable for?", answer: "Ages 5 to 18." },
  { question: "Do I need prior experience?", answer: "No prior experience is needed." },
];

export const FAQ: React.FC = () => (
  <section className="px-6 py-10">
    <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
    <div className="space-y-4">
      {faqItems.map(({ question, answer }, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded shadow">
          <h4 className="font-semibold">{question}</h4>
          <p>{answer}</p>
        </div>
      ))}
    </div>
  </section>
);

