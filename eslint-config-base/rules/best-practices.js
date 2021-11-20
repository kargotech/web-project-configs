// Overriding rules from https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js
// with additional rules (if any).

module.exports = {
  rules: {
    // Allow to not use 'this' in a class with a warning because of not so wide brwoser supprort
    // https://eslint.org/docs/rules/class-methods-use-this
    'class-methods-use-this': 'never',
  }
}
