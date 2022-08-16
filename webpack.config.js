const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = {
  "crypto": require.resolve("crypto-browserify")
};
