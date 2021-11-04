module.exports = {
  plugins: [
    require("autoprefixer")({}),
    require("postcss-px2rem")({
      remUnit: 74.16, // 50px = 1rem
      remPrecision: 4 // rem的小数点后位数
    })
  ]
};
