module.exports = {
  entry: __dirname + '/public/src/index.jsx',
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        loader:
          'style-loader!css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]'
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public/dist'
  }
};
