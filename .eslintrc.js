module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: "@babel/eslint-parser",
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: { 'operator-linebreak': ["error", "after"],
  },
};
