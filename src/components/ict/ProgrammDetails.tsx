import React from 'react';

export const ProgramDetails: React.FC = () => (
  <section className="px-6 py-10">
    <h2 className="text-2xl font-semibold mb-4">Program Details</h2>
    <ul className="list-disc space-y-2 ml-6">
      <li>Days: Monday - Friday</li>
      <li>Sessions: Morning (8:30 AM - 10:30 AM) / Afternoon (4:00 PM - 6:00 PM)</li>
      <li>Duration: 2 hours per session, 7 weeks</li>
      <li>Skills: Digital Literacy, Coding, Web Development, AI Basics</li>
    </ul>
  </section>
);

