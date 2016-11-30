const express = require('express');
const app = express();

app.use(express.static('public'));

const name = 'Musta';

app.listen(process.env.PORT || 3000, function() {
  console.log(`Hello ${name}, Listening on Port 3000`);
});
