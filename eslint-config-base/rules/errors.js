// Overriding rules from https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/errors.js
// with additional rules (if any).

module.exports = {
  rules: {
    // Disallow console to avoid sending development code to production
    // https://eslint.org/docs/rules/no-console
    'no-console': 'error',
  }
}
