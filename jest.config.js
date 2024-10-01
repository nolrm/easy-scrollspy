module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Use jsdom to simulate browser-like environment
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
