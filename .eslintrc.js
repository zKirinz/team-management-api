module.exports = {
    env: {
        es6: true,
        node: true,
        jest: true,
    },
    extends: ["prettier", "plugin:prettier/recommended"],
    rules: {
        "prettier/prettier": "error",
        "arrow-body-style": "off",
        "prefer-arrow-callback": "off",
    },
    parser: "@babel/eslint-parser",
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
    },
};
