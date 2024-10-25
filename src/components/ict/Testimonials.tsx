import React from 'react';

const testimonials = [
  "This program was a fantastic introduction to coding!",
  "My child learned so much and had a great time.",
  "I highly recommend this to anyone interested in tech!"
];

export const Testimonials: React.FC = () => (
  <section className="px-6 py-10">
    <h2 className="text-2xl font-semibold mb-4">What Participants Say</h2>
    <div className="space-y-4">
      {testimonials.map((quote, index) => (
        <blockquote key={index} className="italic text-gray-600">
          "{quote}"
        </blockquote>
      ))}
    </div>
  </section>
);

