/* eslint no-console: 0 */
import path from 'path';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import fetch from 'node-fetch';
import config from './webpack.config.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcrypt';
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID      = '375688671713-nlf5vnm3i77latudv441or2nfiu0n9ok.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET  = 'maGlAzgn92s15DnADRjIKgPh';

require('dotenv').config();
const app = express();
const isDeveloping = process.env.NODE_ENV !== 'production';
const { API_URL } = process.env;


app.use( cookieParser());
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: 'hello'
}));
app.use(function(req, res, next) {
  if (!req.session) {
    return next(new Error()); // handle error
  }
  next(); // otherwise continue
});
app.use( passport.initialize());
app.use( passport.session());


passport.serializeUser((user, done) => {
  bcrypt.hash(user.id, 10, function(err, hash) {
    done(null, hash);
  });
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
  function(token, tokenSecret, profile, done) {
    return done(null, profile);
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/create');
    });

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.post('/timetable/create', async (req, res) => {
  // console.log(JSON.stringify(req.body));
  console.log('User');
  console.log(req.user);
  fetch(`${API_URL}create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'UserId': req.user
    },
    body: JSON.stringify(req.body)
  }).then((response) => {
    return response.json();
  }).then((json) =>{
    return res.json(json);
  });
});

app.post('/timetable/list', async (req, res) => {
  // console.log(JSON.stringify(req.body));
  console.log('User');
  console.log(req.user);
  fetch(`${API_URL}list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'UserId': req.user
    }
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

const ensureAuthenticated = (req, res, next) => {
  console.log('Testing authentication');
  if (req.isAuthenticated()) {
    console.log('Is Authenticated');
    return next();
  }
  console.log('Is not Authenticated');
  return res.redirect('/login');
};

const server = app.listen(3000, (err) => {
  if (err) {
    console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});

module.exports = server;
