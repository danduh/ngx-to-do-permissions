/* eslint-disable */
const APP_NAME = `todo-app`;
const RESULTS_FOLDER = `test-results/${APP_NAME}`;

export default {
  displayName: APP_NAME,
  setupFilesAfterEnv: [
    '<rootDir>/src/test-setup.ts',
  ],
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  testResultsProcessor: 'jest-sonar-reporter',
  reporters: [
    [
      'jest-sonar',
      {
        outputDirectory: RESULTS_FOLDER,
        outputName: 'jest-sonar.xml',
        reportedFilePath: 'absolute',
      },
    ],
    'default',
    [
      'jest-junit',
      {
        outputDirectory: RESULTS_FOLDER,
        outputName: 'junit.xml',
      },
    ],
    [
      'jest-html-reporter',
      {
        pageTitle: 'Test Report',
        outputPath: `${RESULTS_FOLDER}/test-report.html`,
        includeConsoleLog: true,
        includeFailureMsg: true,
        includeSuiteFailure: true,
      },
    ],
  ],
  coverageReporters: ['json', 'lcov', 'text', 'cobertura'],
  coverageDirectory: `../../coverage/${APP_NAME}`,
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
