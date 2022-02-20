const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("../package.json").dependencies;
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

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
        auth: "auth@http://localhost:8081/remoteEntry.js",
        ac: "ac@http://localhost:8082/remoteEntry.js",
        rrhh: "rrhh@http://localhost:8083/remoteEntry.js",
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
