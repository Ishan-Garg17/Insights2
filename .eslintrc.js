// module.exports = {
//   root: true,
//   extends: '@react-native',
// };
// .eslintrc.js
module.exports = {
  parser: 'babel-eslint',
  plugins: ['react', 'react-native'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    // Your rules here
    'react-native/no-inline-styles': 'off', // Disable the inline styles rule
    'react-native/no-color-literals': 'error', // Enforce using variables for colors
  },
};
