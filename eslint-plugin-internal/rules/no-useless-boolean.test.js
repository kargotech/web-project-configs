const { RuleTester } = require('eslint');
const noUselessBoolean = require('./no-useless-boolean');

const DEFAULT_ERROR_MESSAGE = 'Useless boolean condition';

const tester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });

tester.run('no-useless-boolean', noUselessBoolean, {
  valid: [
    // Return one boolean in a function
    { code: `function test() { return true; }` },
    { code: `function test() { return false; }` },

    // Return multiple logical expression in a function
    { code: `function test() { return foo && bar; }` },
    { code: `function test() { return bar || baz; }` },

    // Define a variable with one boolean valuel
    { code: `const x = true;` },
    { code: `const x = false;` },

    // Define a variable with multiple logical expression
    { code: `const x = foo[bar] || baz;` },

    // If-else statement without constant condition
    { code: `if (foo) { console.log('foo'); } else { console.log('else'); }` },

    // If-else-if statement without constant condition
    { code: `if (foo) { console.log('foo'); } else if (bar) { console.log('bar'); } else { console.log('else'); }` },

    // Ternary operator with non-constant condition
    { code: `const x = foo ? 'bar' : 'baz';` },
  ],
  invalid: [
    // Function that returns logical expression with useless `true` on lefthand
    {
      code: `function test() { return true && 1; }`,
      output: `function test() { return 1; }`,
      errors: [{ message: DEFAULT_ERROR_MESSAGE }],
    },
    {
      code: `function test() { return !false && 1; }`,
      output: `function test() { return 1; }`,
      errors: [{ message: DEFAULT_ERROR_MESSAGE }],
    },
    {
      code: `
        function test() {
          return true
            && 1;
      }`,
      output: `
        function test() {
          return 1;
      }`,
      errors: [{ message: DEFAULT_ERROR_MESSAGE }],
    },

    // Function that returns logical expression with useless `true` on righthand
    {
      code: `function test() { return foo && bar && true; }`,
      output: `function test() { return foo && bar; }`,
      errors: [{ message: DEFAULT_ERROR_MESSAGE }],
    },
    {
      code: `function test() { return foo && bar && !false; }`,
      output: `function test() { return foo && bar; }`,
      errors: [{ message: DEFAULT_ERROR_MESSAGE }],
    },
    {
      code: `
        function test() {
          return foo
            && bar
            && true;
      }`,
      output: `
        function test() {
          return foo
            && bar;
      }`,
      errors: [{ message: DEFAULT_ERROR_MESSAGE }],
    },

    // Function that returns logical expression with `||` and useless boolean on lefthand
    {
      code: `function test() { return false || foo; }`,
      output: `function test() { return foo; }`,
      errors: [{ message: DEFAULT_ERROR_MESSAGE }],
    },
    {
      code: `function test() { return !true || foo; }`,
      output: `function test() { return foo; }`,
      errors: [{ message: DEFAULT_ERROR_MESSAGE }],
    },

    // Assign a variable using logical expression with useless `true` on lefthand
    {
      code: `const x = true && undefined;`,
      output: `const x = undefined;`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },
    {
      code: `const x = !false && undefined;`,
      output: `const x = undefined;`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },

    // Assign a variable using logical expression with useless `true` on lefthand and punctuator
    {
      code: `const x = true && ( 1 + 2 );`,
      output: `const x = ( 1 + 2 );`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },
    {
      code: `const x = !false && ( 1 + 2 );`,
      output: `const x = ( 1 + 2 );`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },

    // Assign a variable using logical expression with useless `true` on righthand
    {
      code: `const x = foo && bar.baz && true;`,
      output: `const x = foo && bar.baz;`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },

    // Assign a variable using logical expression with `||` and useless boolean on righthand
    {
      code: `const x = foo || true || bar.baz;`,
      output: `const x = foo || bar.baz;`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },
    {
      code: `const x = foo || !false || bar.baz;`,
      output: `const x = foo || bar.baz;`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },

    // if (false) { <useless-code> } ...
    {
      code: `if (false) { console.log('not executed'); } console.log('executed');`,
      output: ` console.log('executed');`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },

    // if (true) { ... }
    {
      code: `if (true) { console.log('executed'); } console.log('also executed');`,
      output: `console.log('executed'); console.log('also executed');`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },
    {
      code: `if (!false) { console.log('executed'); } console.log('also executed');`,
      output: `console.log('executed'); console.log('also executed');`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },

    // if (false) { <useless-code> } else { ... }
    {
      code: `if (false) { console.log('not executed'); } else { console.log('executed'); }`,
      output: `console.log('executed');`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },

    // if (true) { ... } else { <useless-code> }
    {
      code: `if (true) { console.log('executed'); } else { console.log('not executed'); }`,
      output: `console.log('executed');`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },
    {
      code: `if (!false) { console.log('executed'); } else { console.log('not executed'); }`,
      output: `console.log('executed');`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },

    // if (false) { <useless-code> } else if (...) { ... }
    {
      code: `if (false) { console.log('not executed'); } else if (foo) { console.log('executed'); }`,
      output: `if (foo) { console.log('executed'); }`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },

    // if (true) { ... } else if (...) { <useless-code> }
    {
      code: `if (true) { console.log('executed'); } else if (foo) { console.log('not executed'); }`,
      output: `console.log('executed');`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },

    // if (...) { ... } else if (false) { <useless-code> }
    {
      code: `if (foo) { console.log('executed'); } else if (false) { console.log('not executed'); }`,
      output: `if (foo) { console.log('executed'); }`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },

    // if (...) { ... } else if (true) { ... }
    {
      code: `if (foo) { console.log('executed'); } else if (true) { console.log('also executed'); }`,
      output: `if (foo) { console.log('executed'); } else { console.log('also executed'); }`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },

    // if (...) { ... } else if (false) { <useless-code> } else { ... }
    {
      code: `
        if (foo) {
          console.log('executed');
        } else if (false) {
          console.log('not executed');
        } else {
          console.log('also executed');
        }`,
      output: `
        if (foo) {
          console.log('executed');
        } else {
          console.log('also executed');
        }`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },

     // if (...) { ... } else if (true) { ... } else { <useless-code> }
     {
      code: `
        if (foo) {
          console.log('executed');
        } else if (true) {
          console.log('also executed');
        } else {
          console.log('not executed');
        }`,
      output: `
        if (foo) {
          console.log('executed');
        } else {
          console.log('also executed');
        }`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },

    // Ternary operator with constant condition (true)
    {
      code: `const x = true ? 'bar' : 'baz';`,
      output: `const x = 'bar';`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },
    {
      code: `function foo() { return true ? 'bar' : 'baz'; }`,
      output: `function foo() { return 'bar'; }`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },

    // Ternary operator with constant condition (false)
    {
      code: `const x = false ? 'bar' : 'baz';`,
      output: `const x = 'baz';`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },
    {
      code: `function foo() { return false ? 'bar' : 'baz'; }`,
      output: `function foo() { return 'baz'; }`,
      errors: [{
        message: DEFAULT_ERROR_MESSAGE
      }],
    },
  ],
});
