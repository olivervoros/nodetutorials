"use strict";

var Book = require('../models/bookModel');
var Category = require('../models/categoryModel');

module.exports = function(router) {
	router.get('/', function(req, res) {
		var cart = req.session.cart;
		var displayCart = { items: [], total: 0 };
		var total = 0;

		for(var item in cart) {
			displayCart.items.push = cart[item];
			total += cart[item].qty * cart[item].price;
		}
		displayCart.total = total;

		res.render('/cart/index', {cart: displayCart});
	});
}