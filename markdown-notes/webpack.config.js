module.exports = {
  // ...other config
  node: {
    __dirname: false,
    __filename: false
  },
  externals: {
    fs: 'commonjs fs',
    path: 'commonjs path'
  }
};
