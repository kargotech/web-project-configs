module.exports = {
  testFiles: [
    'test/**', // tape, common npm pattern
    'tests/**', // also common npm pattern
    'spec/**', // mocha, rspec-like pattern
    '**/__tests__/**', // jest pattern
    '**/__mocks__/**', // jest pattern
    '**/tests/*.*', // custom kargo pattern (legacy code)
    '**/tests/**/*.*', // custom kargo pattern (legacy code)
    'test.{js,jsx}', // repos with a single test file
    'test-*.{js,jsx}', // repos with multiple top-level test files
    '**/*{.,_}{test,spec}.{js,jsx}', // tests where the extension or filename suffix denotes that it is a test
  ],
};
