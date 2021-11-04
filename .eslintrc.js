module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/prettier",'standard'],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "semi": 0,
    //"linebreak-style": 0,
    "no-unreachable": 2, //不能有无法执行的代码
    "no-unused-expressions": 2, //禁止无用的表达式
    "no-unused-vars": [2, { vars: "all", args: "after-used" }], //不能有声明后未被使用的变量或参数
    "no-use-before-define": 2, //未定义前不能使用
    "no-useless-call": 2, //禁止不必要的call和apply
    //"extends": "eslint:recommended",
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
