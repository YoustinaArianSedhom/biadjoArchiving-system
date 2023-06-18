module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ["prettier"],
  extends: ["plugin:vue/essential", "eslint:recommended", "prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    curly: "warn",
    "prettier/prettier": "warn"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
