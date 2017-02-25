const webpack = require('webpack');
const express = require('express');

const app = express();

const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  const config = require('./webpack.config');
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'app',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(express.static('public'));

app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
