const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/modules/index.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[name].[hash][ext][query]",
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
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name].[hash][ext][query]", // Output hashed filenames
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
      title: "Chukwuma Kizito Iheanacho's Homepage",
      template: "./src/index.html",
      inject: "body",
      favicon: "./src/asset/images/logo.png",
      meta: {
        viewport: "width=device-width, initial-scale=1.0",
        "og:title": "Chukwuma Kizito Iheanacho",
        "og:description": "Chukwuma's Homepage",
        "og:image": "images/logo.png",
        "og:type": "website",
        "og:url": "",
        "twitter:card": "summary_large_image",
        "twitter:image": "images/logo.png",
        "twitter:title": "Chukwuma Kizito Iheanacho",
        "twitter:description": "Chukwuma's Homepage",
      },
    }),
  ],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  },
}

console.log(
  "Favicon path: ",
  path.resolve(__dirname, "src/assets/images/logo.png")
)
