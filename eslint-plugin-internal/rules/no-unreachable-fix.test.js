const { RuleTester } = require('eslint');
const noUnreachableFix = require('./no-unreachable-fix');

const DEFAULT_ERROR_MESSAGE = 'Unreachable code.';

const tester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });

tester.run('no-unreachable-fix', noUnreachableFix, {
  valid: [],
  invalid: [
    {
      code: `function test() { return 1; return false; }`,
      output: `function test() { return 1;  }`,
      errors: [{ message: DEFAULT_ERROR_MESSAGE }],
    },
  ],
});
