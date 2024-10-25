import React from 'react';

export const About: React.FC = () => (
  <section className="px-6 py-10 bg-gray-100 text-center">
    <h2 className="text-2xl font-semibold mb-4">About the Program</h2>
    <p className="max-w-2xl mx-auto">
      Our ICT Holiday Program is designed to introduce students to essential digital skills, coding, and creative
      projects in a fun, engaging way.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {["Digital Literacy", "Coding Skills", "AI Introduction"].map((point) => (
        <div key={point} className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold">{point}</h3>
        </div>
      ))}
    </div>
  </section>
);

