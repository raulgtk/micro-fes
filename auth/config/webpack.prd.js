const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const deps = require("../package.json").dependencies;
const path = require('path');

const proConfig = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: "/portal/auth/",
    // filename: "portal/auth/[name].js",
    clean: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./bootstrap": "./src/bootstrap",
      },
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

module.exports = merge(commonConfig, proConfig);