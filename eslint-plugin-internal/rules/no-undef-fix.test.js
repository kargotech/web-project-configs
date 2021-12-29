const { RuleTester } = require('eslint');
const noUndefFix = require('./no-undef-fix');

const tester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });

tester.run('no-undef-fix', noUndefFix, {
  valid: [],
  invalid: [
    {
      code: `function test() { return foo; }`,
      output: `function test() { return true; }`,
      errors: [{ message: "'foo' is not defined." }],
    },
  ],
});
