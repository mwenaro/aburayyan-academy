import React from 'react';

export const weeklyTopics = [
  { week: 1, topic: 'Digital Literacy and Online Safety' },
  { week: 2, topic: 'Introduction to Coding (Scratch)' },
  { week: 3, topic: 'Computational Thinking' },
  { week: 4, topic: 'Web Development (HTML)' },
  { week: 5, topic: 'Web Development (CSS)' },
  { week: 6, topic: 'Introduction to AI and LLMs' },
  { week: 7, topic: 'Project Showcase' },
];

export const WeeklySchedule: React.FC = () => (
  <section className="px-6 py-10 bg-gray-100">
    <h2 className="text-2xl font-semibold mb-4">Weekly Curriculum</h2>
    <div className="space-y-4">
      {weeklyTopics.map(({ week, topic }) => (
        <div key={week} className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Week {week}: {topic}</h3>
        </div>
      ))}
    </div>
  </section>
);

