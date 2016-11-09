var express = require('express')
var app = express()

app.get('/', function (req, res) {
	res.send('Welcome to the Post-Trump Internet!')
})

app.listen(3000, function () {
	console.log("Connected!")
})