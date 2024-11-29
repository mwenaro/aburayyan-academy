import React from "react";

export const Footer: React.FC = () => (
  <footer className="bg-blue-600 text-white text-center py-6">
    <div>
      <p>Contact us at 0722 299 287 / 0723 755 108</p>
      <p>P.O Box 86845- 80100 Mombasa</p>
    </div>

    <div className="text-center mt-8 text-gray-400">
      <h3>© Abu-Rayyan Academy @{new Date().getFullYear()} All rights reserved. {}</h3>
    </div>
  </footer>
);
