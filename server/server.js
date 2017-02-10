const express = require('express');
const app = express();

app.use(express.static('public'));

// app.get('/', function(req, res) {
//   res.send('Hello World');
// });

const name = 'Musta';

app.listen(process.env.PORT || 3000, function() {
  console.log(`Hello ${name}, Listening on Port 3000`);
});
