const path = require('path');

module.exports = {
  // Your existing configuration
  resolve: {
    alias: {
      // Add aliases if needed
    },
    fallback: {
      "assert": require.resolve('assert'),
      "stream": require.resolve('stream-browserify'),
      "crypto": require.resolve('crypto-browserify')
    },
  },
};