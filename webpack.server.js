const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "development",

  entry: ["./server/index.js"],

  target: "node",

  externals: [webpackNodeExternals()],

  output: {
    path: path.resolve("build"),
    filename: "index.js",
  },

  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            {
              plugins: ["@babel/plugin-transform-runtime"],
            },
          ],
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
};
