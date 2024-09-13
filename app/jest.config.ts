import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './', // Diretório da aplicação Next.js
});

// Configurações personalizadas do Jest
const customJestConfig = {
  preset: 'ts-jest', // Define o preset para usar ts-jest
  setupFilesAfterEnv: ['./setupTests.ts'], // Arquivo de configuração pós-inicialização
  moduleNameMapper: {
    // Lidando com importações de módulos estáticos (CSS, imagens, etc.)
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom', 
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/app/tests/?(*.)+(spec|test).ts?(x)']
};

export default createJestConfig(customJestConfig);
