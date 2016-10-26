var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './uploads'});
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

router.get('/add', function(req, res, next) {
	var categories = db.get('categories');

	categories.find({}, {}, function(err, categories) {
		res.render('addpost', { title: "Add post", categories: categories})
	})
});

router.post('/add', upload.single('mainimage'), function(req, res, next) {
	var title = req.body.title;
	var category = req.body.category;
	var body = req.body.body;
	var author = req.body.author;
	var date = new Date();

	if(req.file) {
		console.log('Uploading file...');
		console.log(req.file);
		var mainimage = req.file.filename;
	} else {
		console.log('No file uploaded...');
		var mainimage = 'noimage.jpg';
	}

	req.checkBody('title' , 'Title field is required').notEmpty();
	req.checkBody('body' , 'Body field is required').notEmpty();

	// check errors
	var errors = req.validationErrors();

	if(errors) {
		res.render('addpost', { errors: errors});
	} else {
		var posts = db.get('posts');
		posts.insert({
			"title": title,
			"body": body,
			"author": author,
			"category": category,
			"date": date,
			"mainimage" : mainimage
		}, function(err, post) {
			if(err) {
				res.send(err);
			} else {
				req.flash('success', 'Post added.');
				res.location('/');
				res.redirect('/');
			}

		});
	}
});

module.exports = router;
