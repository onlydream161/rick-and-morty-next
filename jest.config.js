const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.ts'],
  coverageDirectory: '<rootDir>/jest/coverage',
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.stories.{ts,tsx}', '!**/*.d.{ts,tsx}'],
  coveragePathIgnorePatterns: [
    '<rootDir>/.*/index.ts$',
    'node_modules',
    '<rootDir>/src/shared/config',
    '<rootDir>/src/shared/@types',
  ],
  moduleNameMapper: {
    '^@/jest/(.*)': '<rootDir>/jest/$1',
    '^@/(.*)': '<rootDir>/src/$1',
    '^.+\\.(svg)$': '<rootDir>/jest/__mocks__/svg.ts',
  },
  testEnvironment: 'jest-environment-jsdom',
  resolver: '<rootDir>/jest/resolver.js',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
}

module.exports = async () => ({
  ...(await createJestConfig(customJestConfig)()),
  transformIgnorePatterns: ['node_modules/(?!(swiper|ssr-window|dom7)/)', '^.+\\.module\\.(css|sass|scss)$'],
})
