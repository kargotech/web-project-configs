const baseStyleRules = require('./lib/list-existing-rules');
const { rules: tsRules } = require('@typescript-eslint/eslint-plugin');

const tsRulesKeys = Object.keys(tsRules);
const baseStyleRulesKeys = Object.keys(baseStyleRules);
const intersectKeys = tsRulesKeys.filter(key => baseStyleRulesKeys.includes(key));

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ...([
      './rules/imports',
      './rules/style',
    ].map(require.resolve))
  ],
  rules: {
    ...(intersectKeys.reduce((acc, val) => ({
      ...acc,
      [val]: 'off', // override base eslint config by turning the default to off
      [`@typescript-eslint/${val}`]: baseStyleRules[val], // apply ts specific config with existing rule
    }), {})),

    // Replace Airbnb 'camelcase' rule with '@typescript-eslint/naming-convention'
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
    camelcase: 'off',
    // The `@typescript-eslint/naming-convention` rule allows `leadingUnderscore` and `trailingUnderscore` settings. However, the existing `no-underscore-dangle` rule already takes care of this.
    '@typescript-eslint/naming-convention': [
      'error',
      // Allow camelCase variables, PascalCase variables, and UPPER_CASE variables
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      // Allow camelCase functions, and PascalCase functions
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      // Airbnb recommends PascalCase for classes, and although Airbnb does not make TypeScript recommendations, we are assuming this rule would similarly apply to anything "type like", including interfaces, type aliases, and enums
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],

    // Replace Airbnb 'comma-dangle' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-dangle.md
    // The TypeScript version also adds 3 new options, all of which should be set to the same value as the base config
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': [
      baseStyleRules['comma-dangle'][0],
      {
        ...baseStyleRules['comma-dangle'][1],
        enums: baseStyleRules['comma-dangle'][1].arrays,
        generics: baseStyleRules['comma-dangle'][1].arrays,
        tuples: baseStyleRules['comma-dangle'][1].arrays,
      },
    ],

    'dot-notation': 'off',
    '@typescript-eslint/dot-notation': [
      'error',
      {
        allowKeywords: true
      }
    ],
  }
};
