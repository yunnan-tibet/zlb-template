module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    // 1.优先级prettier最高
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/no-commonjs': 0,
    'camelcase': 0,
    'eqeqeq': 0,
    // 3.对于不符合prettier规范的写法，eslint会提示报错
    'prettier/prettier': 'error',
    'react/display-name': 0,
    'no-console': 2,
    // 导入js
    'import/extensions': 0,
    'import/no-unresolved': 0,
    // jsx允许在tsx里面
    'react/jsx-filename-extension': 0,
    // react
    'no-use-before-define': 0,
    'import/prefer-default-export': 0,
    'no-debugger': 0,
    'no-undef': 0,
    'react/require-default-props': 0,
    'import/no-extraneous-dependencies': 0,
    'func-names': 0,
    'no-unused-vars': 0,
    'consistent-return': 0,
    'jsx-a11y/alt-text': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-underscore-dangle': 0,
    'react/jsx-props-no-spreading': 0,
    'no-nested-ternary': 0,
    'no-plusplus': 0,
    'no-unused-expressions': 0,
    'no-restricted-syntax': 0,
    'no-continue': 0,
    'prefer-promise-reject-errors': 0,
    'prefer-destructuring': 0,
    'no-lonely-if': 0,
    "react/prop-types": 0,
    "react/no-array-index-key": 0,
    "no-duplicate-case": 0,
    "no-param-reassign": 0
  },
};
