/* eslint no-console: 0 */
import path from 'path';
const webpack = require('webpack');
import bodyParser from 'body-parser';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
const express = require('express');
import fetch from 'node-fetch';

const app = express();
import config from './webpack.config.js';
const isDeveloping = process.env.NODE_ENV !== 'production';

app.use(bodyParser.json());

app.get('/api/timetable', (req, res) => {
  console.log('lolz');
  return res.json({lol: 'lolx'});
});

app.post('/timetable/create', async (req, res) => {
  fetch('https://studyfriend-timetable.herokuapp.com/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  }).then((response) => {
    return response.json();
  }).then((json) =>{
    console.log(json);
    return res.json(json);
  });
  // try {
  //   const response = await fetch('https://studyfriend-timetable.herokuapp.com/create', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(req.body)
  //   });
  //   console.log(await response.body);
  //   return await response.text();
  // } catch (e) {
  //   console.log(e);
  //   return res.json({fail: 'failed'});
  // }
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

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
