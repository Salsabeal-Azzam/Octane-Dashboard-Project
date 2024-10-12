import '@testing-library/jest-dom/extend-expect';

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Handle TypeScript files
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Your setup file
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"], // Add file extensions Jest should recognize
};
