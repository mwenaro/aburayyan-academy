import { GradingSystemType, GRADING_SYSTEMS } from "@/models/Exam";

// Grading system display options for UI components
export const GRADING_SYSTEM_OPTIONS = [
  {
    value: "general" as GradingSystemType,
    label: "General Grading System",
    description: "75-100: E.E, 50-74: M.E, 25-49: A.E, 0-24: B.E"
  },
  {
    value: "lower" as GradingSystemType,
    label: "Lower Grading System", 
    description: "80-100: E.E, 60-79: M.E, 50-59: A.E, 0-49: B.E"
  },
  {
    value: "cbc" as GradingSystemType,
    label: "CBC Grading System",
    description: "80-100: E.E, 70-79: M.E, 50-69: A.E, 0-49: B.E"
  }
];

// Helper function to get grading system display name
export const getGradingSystemDisplayName = (type: GradingSystemType): string => {
  return GRADING_SYSTEMS[type]?.name || "Unknown Grading System";
};

// Helper function to get grading system description
export const getGradingSystemDescription = (type: GradingSystemType): string => {
  const system = GRADING_SYSTEMS[type];
  if (!system) return "Unknown grading system";
  
  return system.bands
    .map(band => `${band.min}-${band.max}: ${band.grade.name}`)
    .join(", ");
};

// Helper function to format grade with points
export const formatGrade = (grade: { name: string; points: number }): string => {
  return `${grade.name} (${grade.points} points)`;
};
