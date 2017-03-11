/* eslint no-console: 0 */
import path from 'path';
const webpack = require('webpack');
import bodyParser from 'body-parser';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
const express = require('express');
import fetch from 'node-fetch';
require('dotenv').config();
const app = express();
import config from './webpack.config.js';
const isDeveloping = process.env.NODE_ENV !== 'production';
const { API_URL } = process.env;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  return res.send('Welcome to StudyFriend!');
});

app.post('/timetable/create', async (req, res) => {
  fetch(`${API_URL}create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  }).then((response) => {
    return response.json();
  }).then((json) =>{
    return res.json(json);
  });
});

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

const server = app.listen(3000, (err) => {
  if (err) {
    console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});

module.exports = server;
