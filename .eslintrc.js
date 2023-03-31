module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': [
      'off',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
    'import/extensions': 'off',
    'prettier/prettier': 0,
    // "prettier/prettier": [
    //   "error", {
    //     "endOfLine": "auto"
    //   }
    // ]
  },
}
