// module.exports = {
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     project: 'tsconfig.json',
//     tsconfigRootDir: __dirname,
//     sourceType: 'module',
//   },
//   plugins: ['@typescript-eslint/eslint-plugin'],
//   extends: [
//     'plugin:@typescript-eslint/recommended',
//     'plugin:prettier/recommended',
//   ],
//   root: true,
//   env: {
//     node: true,
//     jest: true,
//     es6: true,
//   },
//   ignorePatterns: ['.eslintrc.js'],
//   rules: {
//     'prettier/prettier': 'error',
//     '@typescript-eslint/member-delimiter-style': 'off',
//     // JavaScript
//     'indent': 'off',
//     "@typescript-eslint/naming-convention": [
//       "error",
//       {
//         "selector": "interface",
//         "format": ["PascalCase"],
//         "custom": {
//           "regex": "^I[A-Z]",
//           "match": true
//         }
//       }
//     ],
//     '@typescript-eslint/no-explicit-any': 'off',
//   },
// }
module.exports ={
  "parserOptions": {
  "sourceType": "module",
    "ecmaVersion": 2020
}
}