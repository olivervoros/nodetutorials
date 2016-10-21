var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var path = require('path');

var port = 8080;
var db = 'mongodb://localhost/searchengine';
mongoose.connect(db);

var users = require('./routes/user');
var websites = require('./routes/website');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));

app.use(session({
	secret: "super duper secret",
	saveUninitialized: true,
	resave: true
}));

require('./config/passport')();

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', users);
app.use('/website', websites);

app.listen(port, function() {
	console.log('App listening on port ' + port);
});