/** @type {import('jest').Config} */
const config = {
  verbose: true,
};

module.exports = config;

module.exports = {
  preset: 'ts-jest', 
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], 
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!axios)',
  ],
};