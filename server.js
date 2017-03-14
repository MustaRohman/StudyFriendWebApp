/* eslint no-console: 0 */
import path from 'path';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
const passport         = require( 'passport' ),
  util             = require( 'util' ),
  cookieParser     = require( 'cookie-parser' ),
  session          = require( 'express-session' ),
  RedisStore       = require( 'connect-redis' )( session ),
  GoogleStrategy   = require( 'passport-google-oauth2' ).Strategy;
import fetch from 'node-fetch';
import config from './webpack.config.js';

let GOOGLE_CLIENT_ID      = '375688671713-nlf5vnm3i77latudv441or2nfiu0n9ok.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET  = 'maGlAzgn92s15DnADRjIKgPh';

require('dotenv').config();
const app = express();
const isDeveloping = process.env.NODE_ENV !== 'production';
const { API_URL } = process.env;


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
    // NOTE :
    // Carefull ! and avoid usage of Private IP, otherwise you will get the device_id device_name issue for Private IP during authentication
    // The workaround is to set up thru the google cloud console a fully qualified domain name such as http://mydomain:3000/
    // then edit your /etc/hosts local file to point on your private IP.
    // Also both sign-in button + callbackURL has to be share the same url, otherwise two cookies will be created and lead to lost your session
    // if you use it.
  callbackURL: 'http://localhost:3000/auth/google/callback',
  passReqToCallback: true
},
  (request, accessToken, refreshToken, profile, done) =>{
    process.nextTick(function() {
      return done(null, profile);
    });
  }
));

app.use( cookieParser());
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({
  extended: true
}));
app.use( session({
  secret: 'cookie_secret',
  name: 'kaas',
  store: new RedisStore({
    host: '127.0.0.1',
    port: 6379
  }),
  proxy: true,
  resave: true,
  saveUninitialized: true
}));
app.use( passport.initialize());
app.use( passport.session());

app.get('/', (req, res) => {
  return res.send('Welcome to StudyFriend!');
});

app.get('/auth/google', passport.authenticate('google', { scope: [
  'https://www.googleapis.com/auth/plus.login',
  'https://www.googleapis.com/auth/plus.profile.emails.read']
}));

app.get( '/auth/google/callback',
    	passport.authenticate( 'google', {
    		successRedirect: '/create',
    		failureRedirect: '/login'
    }));

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

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
