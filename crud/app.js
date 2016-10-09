var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model');

var db = 'mongodb://localhost/crud';

mongoose.connect(db);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));

app.get("/",function(req, res) {
	res.send("Hello Oliver!");
});

app.get("/books",function(req, res) {
	console.log("getting all books");
	Book.find({}).exec(function(err, books) {
		if(err) {
			res.send("An error occured.");
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
			res.send("An error occured.");
		} else {
			res.json(book);
		}
	});
});

app.post("/books",function(req, res) {
	var newBook = new Book();
	newBook.title = req.body.title;
	newBook.author = req.body.author;
	newBook.category = req.body.category;

	newBook.save(function(err,book) {
		if(err) {
			res.send("An error occured while tried to create.");
		} else {
			res.send(book);
		}
	}) 
});

app.put("/books/:id",function(req, res) {
	Book.findOneAndUpdate(
	{ _id : req.params.id }, { $set : { title : req.body.title }}, { upsert: true }, function(err, newBook) {
		if(err) {
			res.send("An error occured while tried to update.");
		} else {
			res.send(newBook);
		}
	});
});

app.delete("/books/:id",function(req, res) {
	Book.findOneAndRemove(
	{ _id : req.params.id }, function(err, deletedBook) {
		if(err) {
			res.send("An error occured while tried to delete.");
		} else {
			res.send(deletedBook);
		}
	});
});


var PORT = 8080;

app.listen(PORT, function() {
	console.log('App listening on port ' + PORT);
});