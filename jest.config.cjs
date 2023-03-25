module.exports = {
  testMatch: ['**/*.test.{js,ts}'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/backend/$1',
    '^__mocks__/(.*)$': '<rootDir>/__mocks__/$1',
  },
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'backend/**/*.{js,ts}',
    '!backend/handler.ts',
    '!backend/**/*.d.ts',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
      },
    ],
  ],
};
