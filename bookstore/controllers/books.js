"use strict";

module.exports = function(router) {
	router.get('/', function(req, res) {
		res.render('index');
	})
}

module.exports = function(router) {
	router.get('/details/:id', function(req, res) {
		res.render('books/details');
	})
}