'use strict';

var Note = require('../models/Note.model');
var User = require('../models/User.model');

var async = require('async');

exports.homePage = function(req, res) {
	async.parallel([
		function(cb) {
			var query = Note.find({});
			query.sort({ createdAt : 'desc' }).limit(12).exec(function(err, notes) {
				cb(err, notes);
			});
		},

		function(cb) {
			var query = User.find({});
			query.sort({ username : 1 }).exec(function(err, users) {
				cb(err, users);
			});
		}

		], function(err, results) {
			if(err) {
				console.log(err);
			} else {
				res.render('index', {
					notes: results[0],
					users: results[1]
				});
			}
		});
};