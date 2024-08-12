const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { Chunk } = require("webpack")

module.exports = {
  entry: "./src/modules/index.js",
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: "./dist",
    port: 3000,
    hot: false,
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
      {
        test: /\.(mp3|wav)$/i,
        type: "asset/resource",
        generator: {
          filename: "sounds/[name][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Yokizzy Battleship Game",
      template: "./src/index.html",
      inject: "body",
      favicon: "./src/asset/images/logo.png",
      meta: {
        viewport: "width=device-width, initial-scale=1.0",
        "og:title": "YoKizzy! Battleship Game",
        "og:description": "YoKizzy! Battleship Game",
        "og:image": "images/logo.png",
        "og:type": "website",
        "og:url": "",
        "twitter:card": "summary_large_image",
        "twitter:image": "images/logo.png",
        "twitter:title": "Yokizzy Battleship Game",
        "twitter:description": "Yokizzy Battleship Game",
      },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
}

console.log(
  "Favicon path: ",
  path.resolve(__dirname, "src/assets/images/logo.png")
)
