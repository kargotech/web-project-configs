const { testFiles } = require('../file-glob-group');

// Overriding rules from https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
// with additional rules (if any).

module.exports = {
  rules: {
    'import/extensions': [
      'error',
      // Original CRA extension supports: https://github.com/facebook/create-react-app/blob/8fa0a26ea3e7a64660c607ee4e10d1896b9359fe/packages/react-scripts/config/paths.js#L35-L45
      // With addition for .gql and .graphql
      'ignorePackages',
      {
        'web.mjs': 'never',
        'web.js': 'never',
        'web.ts': 'never',
        'web.tsx': 'never',
        'web.jsx': 'never',
        mjs: 'never',
        js: 'never',
        ts: 'never',
        tsx: 'never',
        jsx: 'never',
      },
    ],

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
  }
};
