var path = require('path')
module.exports = {
  entry: path.resolve(__dirname, 'src/WaterfallEasy/WaterfallEasy.js'),
  mode:'production',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'WaterfallEasy.js',
    libraryTarget: 'umd',
    library: 'WaterfallEasy',
    libraryExport: "default" // 不设置此项目，那么只能test.default中访问
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
    ]
  }
};