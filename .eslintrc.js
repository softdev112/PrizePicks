module.exports = {
  extends: [
    'eslint:recommended', 'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  env: {
    browser: true,
    "amd": true,
    node: true
  },
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use.
      version: 'detect'
    },
    // Tells eslint how to resolve imports
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.ts', '.tsx']
      }
    }
  },
  // Custom rules to override from the extended configs.
  rules: {
    "comma-dangle": [
      "error",
      "never"
    ],
    curly: ['error', 'multi-line'],
    "@typescript-eslint/no-explicit-any": "off",
    "no-const-assign": 1,
    "no-irregular-whitespace": 1,
    "no-trailing-spaces": 1
  }
};
