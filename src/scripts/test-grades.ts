// Test the calculateGrade function
import { calculateGrade } from "@/models/Exam";

// Test cases for CBC grading
const testCases = [
  { score: 85, outOf: 100, expected: { name: "E", points: 4 } }, // 85% -> E
  { score: 80, outOf: 100, expected: { name: "E", points: 4 } }, // 80% -> E (boundary)
  { score: 75, outOf: 100, expected: { name: "M", points: 3 } }, // 75% -> M
  { score: 70, outOf: 100, expected: { name: "M", points: 3 } }, // 70% -> M (boundary)
  { score: 60, outOf: 100, expected: { name: "A", points: 2 } }, // 60% -> A
  { score: 50, outOf: 100, expected: { name: "A", points: 2 } }, // 50% -> A (boundary)
  { score: 40, outOf: 100, expected: { name: "B", points: 1 } }, // 40% -> B
  { score: 0, outOf: 100, expected: { name: "B", points: 1 } }, // 0% -> B
  
  // Different outOf values
  { score: 16, outOf: 20, expected: { name: "E", points: 4 } }, // 80% -> E
  { score: 14, outOf: 20, expected: { name: "M", points: 3 } }, // 70% -> M
  { score: 10, outOf: 20, expected: { name: "A", points: 2 } }, // 50% -> A
  { score: 8, outOf: 20, expected: { name: "B", points: 1 } }, // 40% -> B
  
  // Edge cases
  { score: -5, outOf: 100, expected: { name: "B", points: 1 } }, // Invalid score
  { score: 50, outOf: 0, expected: { name: "B", points: 1 } }, // Invalid outOf
  { score: "80", outOf: "100", expected: { name: "E", points: 4 } }, // String inputs
];

export function testCalculateGrade() {
  console.log("Testing calculateGrade function...\n");
  
  let passed = 0;
  let failed = 0;
  
  testCases.forEach((testCase, index) => {
    const result = calculateGrade(testCase.score as number, testCase.outOf as number);
    const isCorrect = result.name === testCase.expected.name && result.points === testCase.expected.points;
    
    if (isCorrect) {
      passed++;
      console.log(`✅ Test ${index + 1}: ${testCase.score}/${testCase.outOf} = ${result.name} (${result.points} points)`);
    } else {
      failed++;
      console.log(`❌ Test ${index + 1}: ${testCase.score}/${testCase.outOf} = ${result.name} (${result.points} points) - Expected: ${testCase.expected.name} (${testCase.expected.points} points)`);
    }
  });
  
  console.log(`\nTest Results: ${passed} passed, ${failed} failed`);
  return { passed, failed, total: testCases.length };
}

// Uncomment to run tests
// testCalculateGrade();
