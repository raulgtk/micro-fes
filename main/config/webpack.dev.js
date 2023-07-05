const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const deps = require('../package.json').dependencies;
const basePath = require('../config.json').basePath
const path = require('path');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: "http://localhost:3000/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "main",
      filename: "remoteEntry.js",
      remotes: {
        core: "core@http://localhost:8080/remoteEntry.js",
        auth: "auth@http://localhost:8081/remoteEntry.js"
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
