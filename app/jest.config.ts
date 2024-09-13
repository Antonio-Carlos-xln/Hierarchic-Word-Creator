import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './', //base directory, here the 'app' folder lives
});

const customJestConfig = {
  preset: 'ts-jest', 
  setupFilesAfterEnv: ['./setupTests.ts'], 
  moduleNameMapper: {
    // handling import of static resources (CSS, images, etc.)
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom', 
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/app/tests/?(*.)+(spec|test).ts?(x)']
};

export default createJestConfig(customJestConfig);
