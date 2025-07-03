import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://jwt.io',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: false
  }
});
