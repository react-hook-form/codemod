module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    'space-before-function-paren': ['error', 'never']
  },
  overrides: [
    {
      files: 'transforms/__testfixtures__/**',
      rules: {
        'no-undef': 'off'
      }
    }
  ]
};
