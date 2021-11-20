const testFiles = [
  'test/**', // tape, common npm pattern
  'tests/**', // also common npm pattern
  'spec/**', // mocha, rspec-like pattern
  '**/__tests__/**', // jest pattern
  '**/__mocks__/**', // jest pattern
  'test.{js,jsx}', // repos with a single test file
  'test-*.{js,jsx}', // repos with multiple top-level test files
  '**/*{.,_}{test,spec}.{js,jsx}', // tests where the extension or filename suffix denotes that it is a test
];

module.exports = {
  extends: [
    // Open https://github.com/airbnb/javascript/tree/eslint-config-airbnb-base-v14.2.1/packages/eslint-config-airbnb-base/rules
    // to see the available rules from config-airbnb-base
    'eslint-config-airbnb-base',
    ...([
      './rules/best-practices',
      './rules/imports',
    ].map(require.resolve))
  ],
  overrides: [
    {
      files: testFiles,
      env: {
        "jest": true
      },
    },
  ],
};
