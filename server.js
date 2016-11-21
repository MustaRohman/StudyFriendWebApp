const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on Port 3000');
});
