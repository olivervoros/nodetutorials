var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var port = 8080;
var db = 'mongodb://localhost/meetingapp';

var routes = require('./routes/index');

mongoose.connect(db);

// Set up view engine
var swig = require('swig');
app.engine('html',swig.renderFile);

app.set('views', path.join(__dirname, "views"));
app.set('view engine','html');

app.use(express.static(path.join(__dirname,"public")));

app.use('/', routes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));

app.listen(port, function() {
	console.log('App listening on port ' + port);
});