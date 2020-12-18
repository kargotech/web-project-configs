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
    'eslint-config-airbnb-base',
  ],
  overrides: [
    {
      files: testFiles,
      env: {
        "jest": true
      },
    },
  ],
  rules: {
    // Always better not not import extraneous dependencies
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: false,
      devDependencies: [
        ...testFiles,
        '**/jest.config.js', // jest config
        '**/jest.setup.js', // jest setup
        '**/vue.config.js', // vue-cli config
        '**/webpack.config.js', // webpack config
        '**/webpack.config.*.js', // webpack config
        '**/rollup.config.js', // rollup config
        '**/rollup.config.*.js', // rollup config
        '**/gulpfile.js', // gulp config
        '**/gulpfile.*.js', // gulp config
        '**/Gruntfile{,.js}', // grunt config
        '**/protractor.conf.js', // protractor config
        '**/protractor.conf.*.js', // protractor config
        '**/karma.conf.js', // karma config
        '**/.eslintrc.js', // eslint config
        '**/*.stories.{js,jsx}', // storybook files
      ],
      }
    ],

    // Allow to not use 'this' in a class with a warning because of not so wide brwoser supprort
    // https://eslint.org/docs/rules/class-methods-use-this
    'class-methods-use-this': 'warn',

    // Always use different name to avoid unexpected behavior
    // https://eslint.org/docs/rules/no-param-reassign
    'no-param-reassign': 'error',

    // Disallow console to avoid sending development code to production
    // https://eslint.org/docs/rules/no-console
    'no-console': 'error',

    // Avoid misconfusing others by mixing escape
    // https://eslint.org/docs/rules/no-useless-escape
    'no-useless-escape': 'error',

    // Disallow space after named function and force to add space after other function type
    // https://eslint.org/docs/rules/space-before-function-paren#anonymous-always-named-never-asyncarrow-always
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always',
    }],
  }
};
