const path = require("path")
const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = merge(common, {
  entry: "./src/modules/index.js",
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    port: 3000,
    hot: false,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
})

console.log(
  "Favicon path: ",
  path.resolve(__dirname, "src/assets/images/logo.png")
)
