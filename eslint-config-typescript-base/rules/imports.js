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
  },
};
