module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {},
};
