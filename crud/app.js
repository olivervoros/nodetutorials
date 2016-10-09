var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model');

var db = 'mongodb://localhost/crud';

mongoose.connect(db);

app.get("/",function(req, res) {
	res.send("Hello Oliver!");
});

app.get("/books",function(req, res) {
	console.log("getting all books");
	Book.find({}).exec(function(err, books) {
		if(err) {
			res.send("An error occured");
		} else {
			res.json(books);
		}

	});

});

app.get("/books/:id",function(req, res) {
	Book.findOne({
		_id : req.params.id
	}).exec(function(err,book) {
		if(err) {
			res.send("An error occured");
		} else {
			res.json(book);
		}
	});
});

var PORT = 8080;

app.listen(PORT, function() {
	console.log('App listening on port ' + PORT);
});