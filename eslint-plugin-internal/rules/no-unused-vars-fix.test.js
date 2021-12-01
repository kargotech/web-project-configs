const { RuleTester } = require('eslint');
const noUnusedVarsFix = require('./no-unused-vars-fix');

const tester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });

tester.run('no-unreachable-fix', noUnusedVarsFix, {
  valid: [],
  invalid: [
    {
      code: `const x = 1; console.log(1 + 2);`,
      output: ` console.log(1 + 2);`,
      errors: [{ type: "Identifier" }]
    },
  ],
});
