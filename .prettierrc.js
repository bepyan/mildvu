module.exports = {
  singleQuote: true,
  semi: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 90,
  arrowParens: 'always',
  bracketSpacing: true,

  importOrder: ['^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  plugins: [require('prettier-plugin-tailwindcss')],
};
