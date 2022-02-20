const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("../package.json").dependencies;
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: "http://localhost:8083/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  devServer: {
    port: 8083,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "rrhh",
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

module.exports = merge(commonConfig, devConfig);
