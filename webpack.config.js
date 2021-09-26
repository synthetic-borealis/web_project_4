// connect path, an OS agnostic filepath utility
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    main: "./src/index.js", // this is the default js entry point
  },
  output: {
    // describes path to output file main.js
    path: path.resolve(__dirname, "dist"), // creates path to dist/ directory
    filename: "main.js",
    publicPath: "",
  },
  mode: "development", // setup for dev mode follows
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    compress: true, // this will speed up file loading in development mode
    port: 8080, // will open your site at localhost:8080
    open: true, // site will open automatically in the browser
  },
  module: {
    rules: [
      {
        // all .js files, excluding those in node_modules,
        // should be processed by babel-loader
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        // add the rule for processing files
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
