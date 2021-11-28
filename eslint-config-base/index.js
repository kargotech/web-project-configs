const { testFiles } = require('./file-glob-group');

module.exports = {
  extends: [
    // Open https://github.com/airbnb/javascript/tree/eslint-config-airbnb-base-v14.2.1/packages/eslint-config-airbnb-base/rules
    // to see the available rules from config-airbnb-base
    'eslint-config-airbnb-base',
    ...([
      './rules/best-practices',
      './rules/imports',
      './rules/style',
    ].map(require.resolve))
  ],
  plugins: ['@kargotech/internal'],
  overrides: [
    {
      files: testFiles,
      env: {
        "jest": true
      },
    },
  ],
};
