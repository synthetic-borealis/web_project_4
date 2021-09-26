// connect path, an OS agnostic filepath utility
const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js' // this is the default js entry point
  },
  output: {  // describes path to output file main.js
    path: path.resolve(__dirname, 'dist'), // creates path to dist/ directory
    filename: 'main.js',
    publicPath: ''
  },
  mode: 'development', // setup for dev mode follows
  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true, // this will speed up file loading in development mode
    port: 8080, // will open your site at localhost:8080
    open: true // site will open automatically in the browser
  },
  module: {
    rules: [
      {
        // all .js files, excluding those in node_modules,
        // should be processed by babel-loader
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/"
      },
    ]
  },
}
