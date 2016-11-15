const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.send('Welcome to the Post-Trump Internet!');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Connected!');
});
