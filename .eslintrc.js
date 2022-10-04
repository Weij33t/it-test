module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "simple-import-sort",
    "unused-imports",
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/no-empty-function": "off",
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
}
