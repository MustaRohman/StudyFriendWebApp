const express = require('express');
const app = express();
const GoogleAuth = require('google-auth-library');
const auth = new GoogleAuth;
const CLIENT_ID = '375688671713-nlf5vnm3i77latudv441or2nfiu0n9ok.apps.googleusercontent.com';
const client = new auth.OAuth2(CLIENT_ID, '', '');

app.use(express.static('public'));

// app.get('/', function(req, res) {
//   res.send('Hello World');
// });

app.post('/auth:idtoken', function(req, res) {
  console.log('Requesting auth');
  const token = req.params.idtoken;
  console.log(token);
  client.verifyIdToken(
    token,
    CLIENT_ID,
    function(e, login) {
      const payload = login.getPayload();
      const userid = payload['sub'];
      console.log('Logged in!!!');
      res.status(200);
    });
});

const name = 'Musta';

app.listen(process.env.PORT || 3000, function() {
  console.log(`Hello ${name}, Listening on Port 3000`);
});
