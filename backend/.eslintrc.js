module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: false,
    es2021: true
  },
  extends: ['standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: ['@typescript-eslint'],
  rules: {}
}
