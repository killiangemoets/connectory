module.exports = {
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ["classProperties", "typescript", "jsx"],
  plugins: [require("prettier-plugin-tailwindcss"), require("@trivago/prettier-plugin-sort-imports")],
  printWidth: 140,
};
