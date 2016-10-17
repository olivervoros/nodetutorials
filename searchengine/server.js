var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var port = 8080;
var db = 'mongodb://localhost/searchengine';
mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));

app.use(express.static(path.join(__dirname,"public")));

app.listen(port, function() {
	console.log('App listening on port ' + port);
});