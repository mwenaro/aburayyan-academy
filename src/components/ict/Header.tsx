import { ModernHeader } from "./ModernHeader";

export const Header: React.FC = () => (
  <ModernHeader>
    <div>
      <h1 className="font-bold text-lg lg:text-xl transition-colors">
        Abu Rayyan Academy
      </h1>
      <p className="text-xs lg:text-sm transition-colors">
        Excellence in Education
      </p>
    </div>
  </ModernHeader>
);
