/* eslint no-console: 0 */
import path from 'path';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import fetch from 'node-fetch';
import config from './webpack.config.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';

require('dotenv').config();
const app = express();
const isDeveloping = process.env.NODE_ENV !== 'production';
const API_URL = 'http://localhost:4567/';
const PORT = process.env.port || 3000;

app.use( cookieParser());
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: 'sssshhhshs',
  resave: false,
  saveUninitialized: true,
}));
app.use(function(req, res, next) {
  if (!req.session) {
    return next(new Error()); // handle error
  }
  next(); // otherwise continue
});

app.get('/code', (req, res) => {
  fetch(`${API_URL}login`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Code': req.headers.code
    }
  }).then((response) => {
    return response.text();
  }).then((text) => {
    console.log('Returning text');
    if (text !== 'Unable to get code') {
      app.locals.userId = text;
      return res.send(true);
    }
    console.log(text);
    return res.send(false);
  }).catch((err) => {
    console.log(err);
  });
});

app.post('/timetable/create', async (req, res) => {
  console.log('User');
  fetch(`${API_URL}create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'UserId': app.locals.userId
    },
    body: JSON.stringify(req.body)
  }).then((response) => {
    return response.json();
  }).then((json) =>{
    return res.json(json);
  });
});


app.get('/user/authenticate', (req, res) => {
  console.log('authenticating user');
  console.log(app.locals.userId);
  if (typeof app.locals.userId === 'undefined') {
    console.log('undef');
    return res.send(false);
  }
  return res.send(true);
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

const server = app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.error(err);
  }

  console.log('Listening at ' + PORT);
});

module.exports = server;
