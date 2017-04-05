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
import { Strategy as AmazonStrategy } from 'passport-amazon';

const AMAZON_CLIENT_ID = 'amzn1.application-oa2-client.635127825c9448259dcee2ab24efd9c8';
const AMAZON_CLIENT_SECRET = '897446d0b6e288127f89a84a5c40a90efcdf1128f778f79d48bef95e787420d3';


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
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new AmazonStrategy({
  clientID: AMAZON_CLIENT_ID,
  clientSecret: AMAZON_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/amazon/callback'
},
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      console.log('Access Token: ' + accessToken);
      return done(null, profile);
    });
  }
));


app.get('/auth/amazon',
    passport.authenticate('amazon', { scope: ['profile'] }),
    (req, res) => {
      // The request will be redirected to Amazon for authentication, so this
      // function will not be called.
    });

app.get('/auth/amazon/callback',
    passport.authenticate('amazon', { failureRedirect: '/login' }),
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

const ensureAuthenticated = (req, res) => {
  console.log('Testing authentication');
  if (req.isAuthenticated()) {
    console.log('Is Authenticated');
    return true;
  }
  console.log('Is not Authenticated');
  return false;
};

app.get('/user/authenticate', (req, res) => {
  console.log('authenticating user');
  return res.send(ensureAuthenticated(req, res));
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


const server = app.listen(3000, (err) => {
  if (err) {
    console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});

module.exports = server;
