const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
// const webpack = require('webpack');
const DotenvPlugin = require("webpack-dotenv-plugin");
// const dotenv = require('dotenv').config();

const basePath = __dirname;
const distPath = "./build";

const indextInput = "./src/index.html";
const indexOutput = "index.html";

module.exports = {
  entry: {
    app: ["./src/index.js"]
  },
  devServer: {
    host: "0.0.0.0",
    port: 4200,
    contentBase: "./build",
    inline: true,
    disableHostCheck: true,
    historyApiFallback: true
  },
  output: {
    path: path.resolve(basePath, distPath),
    filename: "index.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: ["ng-annotate-loader", "babel-loader"]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            query: {
              mozjpeg: {
                quality: "65-90",
                progressive: true
              },
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 7
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loaders: ["html-loader"]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      inject: false,
      filename: indexOutput,
      template: indextInput
    }),
    new DotenvPlugin({
      sample: "./.env.example",
      path: "./.env"
    })
    // new webpack.DefinePlugin({
    //     "process.env": dotenv.parsed
    // }),
  ]
};
