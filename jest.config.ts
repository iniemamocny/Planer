const config: import('ts-jest').JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/core/$1',
    '^@api/(.*)$': '<rootDir>/api/$1',
    '^@ui/(.*)$': '<rootDir>/ui/$1',
  },
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};

export = config;
